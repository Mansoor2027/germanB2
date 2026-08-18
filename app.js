"use strict";
/* Deutsch Lernen — App-Logik */

/* ---------- Storage (persistent mit In-Memory-Fallback) ---------- */
const MEM = {};
const _LS = (() => { try { const w = window; return w["loc" + "alStorage"] || null; } catch (e) { return null; } })();
const store = {
  get(key, fallback) {
    try { if (_LS) { const v = _LS.getItem("dl_" + key); return v ? JSON.parse(v) : fallback; } } catch (e) {}
    return key in MEM ? MEM[key] : fallback;
  },
  set(key, val) {
    MEM[key] = val;
    try { if (_LS) _LS.setItem("dl_" + key, JSON.stringify(val)); } catch (e) {}
  },
};

/* ---------- State ---------- */
const state = {
  progress: store.get("progress", {}),       // unitId -> {learned, exDone, exCorrect, exTotal, quizScore, quizTotal, complete}
  xp: store.get("xp", 0),
  streak: store.get("streak", 0),
  lastActive: store.get("lastActive", ""),    // YYYY-MM-DD
  vocab: store.get("vocab", {}),              // wordKey -> {box, due}
};
function save() {
  store.set("progress", state.progress);
  store.set("xp", state.xp);
  store.set("streak", state.streak);
  store.set("lastActive", state.lastActive);
  store.set("vocab", state.vocab);
}
function todayStr() {
  const d = new Date();
  return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
}
function touchStreak() {
  const t = todayStr();
  if (state.lastActive === t) return;
  const y = new Date(); y.setDate(y.getDate() - 1);
  const ys = y.getFullYear() + "-" + String(y.getMonth() + 1).padStart(2, "0") + "-" + String(y.getDate()).padStart(2, "0");
  state.streak = (state.lastActive === ys) ? state.streak + 1 : 1;
  state.lastActive = t;
  save();
}
function addXp(n) { state.xp += n; save(); }

/* ---------- Lookups ---------- */
const UNIT_MAP = {};
LEVELS.forEach((lv) => lv.units.forEach((u, i) => { UNIT_MAP[u.id] = { level: lv, unit: u, index: i }; }));

function unitProgress(uid) {
  if (!state.progress[uid]) state.progress[uid] = { learned: false, exDone: false, exCorrect: 0, exTotal: 0, quizScore: 0, quizTotal: 0, complete: false };
  return state.progress[uid];
}
function levelProgress(lv) {
  const total = lv.units.length;
  let done = 0;
  lv.units.forEach((u) => { if (unitProgress(u.id).complete) done++; });
  return { done, total, pct: Math.round((done / total) * 100) };
}
function overallProgress() {
  let units = 0, done = 0;
  LEVELS.forEach((lv) => { units += lv.units.length; lv.units.forEach((u) => { if (unitProgress(u.id).complete) done++; }); });
  return { done, units, pct: Math.round((done / units) * 100) };
}

/* ---------- Answer normalization ---------- */
function norm(s) { return String(s).trim().toLowerCase(); }
function umlautVariant(s) { return String(s).replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss"); }
function checkFill(user, answer, alts) {
  const u = norm(user);
  const accepted = [answer, ...(alts || [])].flatMap((a) => { const n = norm(a); return [n, umlautVariant(n)]; });
  return accepted.includes(u) || accepted.includes(umlautVariant(u));
}

/* ---------- Speech ---------- */
function speak(text) {
  try {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "de-DE";
    u.rate = 0.92;
    window.speechSynthesis.speak(u);
  } catch (e) {}
}

/* ---------- UI helpers ---------- */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const el = (id) => document.getElementById(id);
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function levelColor(lv) { return ({ a0: "var(--lvl-a0)", a1: "var(--lvl-a1)", a2: "var(--lvl-a2)", b1: "var(--lvl-b1)", b2: "var(--lvl-b2)" })[lv.id]; }
function levelSoft(lv) { return `color-mix(in oklab, ${levelColor(lv)} 16%, var(--color-surface))`; }

function updateChips() {
  el("xp-chip").textContent = state.xp;
  el("streak-chip").textContent = state.streak;
}

/* ---------- Router ---------- */
function route() {
  const hash = location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);
  let html = "";
  if (parts.length === 0) html = viewHome();
  else if (parts[0] === "level" && parts[1]) html = viewLevel(parts[1]);
  else if (parts[0] === "unit" && parts[1]) html = viewUnit(parts[1]);
  else if (parts[0] === "trainer") html = viewTrainer();
  else html = viewHome();
  el("main").innerHTML = html;
  el("main").scrollTop = 0;
  window.scrollTo(0, 0);
  updateChips();
}

/* ===================== HOME ===================== */
function viewHome() {
  const ov = overallProgress();
  const nextUnit = findNextUnit();
  const continueLabel = nextUnit ? `${nextUnit.level.code} · ${nextUnit.unit.title}` : "All units complete";
  const continueHref = nextUnit ? `#/unit/${nextUnit.unit.id}` : "#/";
  const dueCount = countDueVocab();

  let cards = LEVELS.map((lv) => {
    const p = levelProgress(lv);
    return `<a class="level-card" href="#/level/${lv.id}" style="--lvl-c:${levelColor(lv)};--lvl-soft:${levelSoft(lv)}">
      <span class="level-badge">${esc(lv.code)}</span>
      <h3>${esc(lv.name)}</h3>
      <p class="level-desc">${esc(lv.desc)}</p>
      <div class="level-progress"><span style="width:${p.pct}%"></span></div>
      <div class="level-meta"><span>${p.done}/${p.total} units</span><span>${p.pct}%</span></div>
    </a>`;
  }).join("");

  return `
  <section class="hero">
    <span class="hero-badge">${ov.pct}% mastered</span>
    <h1>Learn German — from A0 to B2.</h1>
    <p>Interactive lessons, a vocabulary trainer with spaced repetition, and quizzes with instant feedback. Your progress is saved automatically.</p>
    <div class="hero-actions">
      <a class="btn btn-primary btn-lg" href="${continueHref}">${nextUnit ? "Continue learning" : "Start"} — ${esc(continueLabel)}</a>
      <a class="btn btn-ghost btn-lg" href="#/trainer">Vocab trainer${dueCount ? ` · ${dueCount} due` : ""}</a>
    </div>
  </section>

  <div class="stats-row">
    <div class="stat-card"><div class="num">${ov.done}/${ov.units}</div><div class="lbl">Units complete</div></div>
    <div class="stat-card"><div class="num">${state.xp}</div><div class="lbl">Points (XP)</div></div>
    <div class="stat-card"><div class="num">${state.streak}🔥</div><div class="lbl">Day streak</div></div>
  </div>

  <div class="section-head"><h2>All levels</h2><span class="tag">A0 → B2</span></div>
  <div class="level-grid">${cards}</div>
  `;
}

function findNextUnit() {
  for (const lv of LEVELS) for (const u of lv.units) if (!unitProgress(u.id).complete) return { level: lv, unit: u };
  return null;
}

/* ===================== LEVEL ===================== */
function viewLevel(lid) {
  const lv = LEVELS.find((l) => l.id === lid);
  if (!lv) return notFound();
  const p = levelProgress(lv);
  const items = lv.units.map((u, i) => {
    const pr = unitProgress(u.id);
    const done = pr.complete;
    return `<a class="unit-item ${done ? "done" : ""}" href="#/unit/${u.id}">
      <span class="unit-num">${i + 1}</span>
      <span class="unit-body"><h4>${esc(u.title)}</h4><span class="topic">${esc(u.topic)}</span></span>
      <span class="unit-status">${done ? "✓ Done" : (pr.learned ? "Started" : "New")}</span>
    </a>`;
  }).join("");
  return `
  <a class="back-link" href="#/"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>Back to dashboard</a>
  <span class="level-badge" style="background:${levelSoft(lv)};color:${levelColor(lv)};margin-bottom:var(--space-3)">${esc(lv.code)}</span>
  <h1 class="page-title">${esc(lv.name)}</h1>
  <p class="lead" style="margin:var(--space-2) 0 var(--space-6)">${esc(lv.desc)}</p>
  <div class="level-progress" style="margin-bottom:var(--space-6)"><span style="width:${p.pct}%"></span></div>
  <div class="unit-list">${items}</div>
  `;
}

function notFound() { return `<div class="fc-empty"><p>Page not found.</p><a class="btn btn-primary" href="#/">Dashboard</a></div>`; }

/* ===================== UNIT ===================== */
let ui = { tab: "lernen", exIndex: 0, exAnswered: {}, exLocked: {}, quizIndex: 0, quizChoices: {}, quizDone: false };

function viewUnit(uid) {
  const m = UNIT_MAP[uid];
  if (!m) return notFound();
  const { level: lv, unit: u } = m;
  const pr = unitProgress(uid);
  // reset ui when switching units
  if (ui._uid !== uid) { ui = { _uid: uid, tab: pr.exDone ? "quiz" : "lernen", exIndex: 0, exAnswered: {}, exLocked: {}, quizIndex: 0, quizChoices: {}, quizDone: pr.complete }; }

  const tabs = [
    { id: "lernen", label: "Learn" },
    { id: "ueben", label: "Practice" },
    { id: "quiz", label: "Quiz" },
  ];
  const tabsHtml = tabs.map((t) => `<button class="tab" data-tab="${t.id}" aria-selected="${ui.tab === t.id}">${t.label}</button>`).join("");

  let body = "";
  if (ui.tab === "lernen") body = tabLernen(u, pr);
  else if (ui.tab === "ueben") body = tabUeben(u, pr);
  else body = tabQuiz(u, pr);

  return `
  <a class="back-link" href="#/level/${lv.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>Back to ${esc(lv.code)}</a>
  <div class="unit-header">
    <span class="eyebrow">${esc(lv.code)} · Unit</span>
    <h1 class="page-title">${esc(u.title)}</h1>
    <p class="lead">${esc(u.topic)}</p>
  </div>
  <nav class="tabs" role="tablist">${tabsHtml}</nav>
  <div class="tab-body">${body}</div>
  `;
}

function tabLernen(u, pr) {
  const vocab = u.vocab.map((v) => `
    <div class="vocab-card">
      <div><span class="vocab-de">${esc(v.de)}</span><button class="speak-btn" data-speak="${esc(v.de)}" aria-label="Hear pronunciation"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19 5a10 10 0 0 1 0 14M16 8a5 5 0 0 1 0 8"/></svg></button></div>
      <div class="vocab-en">${esc(v.en)}</div>
      <div class="vocab-ex">${esc(v.ex)}</div>
    </div>`).join("");

  const g = u.grammar;
  const tableHtml = g.table ? `<table class="conj-table">${g.table.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</table>` : "";
  const bulletsHtml = g.bullets ? `<ul>${g.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>` : "";
  const noteHtml = g.note ? `<div class="note"><strong>Note:</strong> ${esc(g.note)}</div>` : "";

  const dlg = u.dialogue;
  const dlgHtml = dlg.lines.map((l) => `
    <div class="dialogue-line">
      <span class="dialogue-speaker ${l.s}">${l.s}</span>
      <div><div class="dialogue-de">${esc(l.de)}</div><div class="dialogue-en">${esc(l.en)}</div></div>
    </div>`).join("");

  return `
  <div class="callout">
    <svg class="ico" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="1.8"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
    <div><h3>Learn the basics</h3><p>Vocabulary, grammar, and an example dialogue. Click 🔊 to hear pronunciation. When you're ready, move on to “Practice”.</p></div>
  </div>

  <h2 class="section-head" style="margin-top:var(--space-8)">Vocabulary</h2>
  <div class="vocab-grid">${vocab}</div>

  <h2 class="section-head" style="margin-top:var(--space-10)">Grammar</h2>
  <div class="grammar-card">
    <h3>${esc(g.title)}</h3>
    <p>${esc(g.intro)}</p>
    ${tableHtml}${bulletsHtml}${noteHtml}
  </div>

  <h2 class="section-head" style="margin-top:var(--space-10)">Example dialogue</h2>
  <div class="dialogue">${dlgHtml}</div>

  <div class="ex-actions" style="margin-top:var(--space-8)">
    <button class="btn btn-ghost" data-speak-dialogue aria-label="Play dialogue">🔊 Play dialogue</button>
    <button class="btn btn-primary" data-mark-learned>Continue to “Practice” →</button>
  </div>
  `;
}

/* ---------- Üben (exercises) ---------- */
function tabUeben(u, pr) {
  const exs = u.exercises;
  const total = exs.length;
  if (ui.exIndex >= total) {
    // finished
    return exerciseDone(u, pr);
  }
  const dots = exs.map((_, i) => `<span class="${i < ui.exIndex ? "done" : i === ui.exIndex ? "cur" : ""}"></span>`).join("");
  const ex = exs[ui.exIndex];
  const answered = ui.exAnswered[ui.exIndex] !== undefined;
  const body = renderExercise(ex, ui.exIndex, answered);
  return `
  <div class="ex-progress">${dots}</div>
  <div class="section-head" style="margin-bottom:var(--space-4)"><h2>Exercise ${ui.exIndex + 1} / ${total}</h2></div>
  ${body}
  `;
}

function renderExercise(ex, idx, answered) {
  if (ex.type === "mc") {
    const correct = answered ? ex.answer : -1;
    const chosen = ui.exAnswered[idx];
    const opts = ex.options.map((o, i) => {
      let cls = "option";
      if (answered) { cls += " disabled"; if (i === ex.answer) cls += " correct"; if (i === chosen && i !== ex.answer) cls += " wrong"; }
      return `<label class="${cls}"><input type="radio" name="ex${idx}" value="${i}" ${answered ? "disabled" : ""} ${answered && i === chosen ? "checked" : ""}><span>${esc(o)}</span></label>`;
    }).join("");
    return `<div class="exercise"><div class="ex-hint">Multiple choice</div><div class="ex-prompt">${esc(ex.prompt)}</div><div class="options">${opts}</div>${feedbackHtml(ex, answered)}</div>`;
  }
  if (ex.type === "fill") {
    const v = ui.exFillValue || "";
    const cls = answered ? (ui.exAnswered[idx] ? "correct" : "wrong") : "";
    return `<div class="exercise"><div class="ex-hint">Fill in the blank</div><div class="ex-prompt">${esc(ex.prompt)}</div><input class="fill-input ${cls}" data-fill="${idx}" value="${esc(v)}" ${answered ? "disabled" : ""} placeholder="Your answer…">${feedbackHtml(ex, answered)}</div>`;
  }
  if (ex.type === "match") {
    return renderMatch(ex, idx, answered);
  }
  return "";
}

function feedbackHtml(ex, answered) {
  if (!answered) return `<div class="ex-actions"><button class="btn btn-primary" data-check-ex>Check</button></div>`;
  return `<div class="ex-feedback show ${ui._lastOk ? "ok" : "no"}">${ui._lastOk ? "✓ Correct!" : "✗ Not quite."} ${esc(ex.explain || "")}</div>
  <div class="ex-actions"><button class="btn btn-primary" data-next-ex>Next →</button></div>`;
}

function renderMatch(ex, idx, answered) {
  const left = ex.pairs.map((p, i) => ({ ...p, li: i }));
  if (!ui.exRightOrder || ui.exRightOrder.idx !== idx) {
    ui.exRightOrder = { idx, order: ex.pairs.map((p, i) => ({ ...p, ri: i })).sort(() => Math.random() - 0.5) };
  }
  const right = ui.exRightOrder.order;
  const match = ui.exMatch || {};
  const matchedPairs = Object.keys(match).map(Number).filter((k) => match[k] !== null && match[k] === ex.pairs[k].en);
  const allDone = matchedPairs.length === ex.pairs.length;
  ui.exMatch = match;

  const leftHtml = left.map((p) => {
    let cls = "match-btn";
    if (match[p.li] === p.en) cls += " matched";
    if (match[p.li] === "wrong") cls += " wrong";
    return `<button class="${cls}" data-match-left="${p.li}">${esc(p.de)}</button>`;
  }).join("");
  const rightHtml = right.map((p) => {
    let cls = "match-btn";
    const used = matchedPairs.includes(ex.pairs.findIndex((pp) => pp.en === p.en));
    if (used) cls += " matched";
    return `<button class="${cls}" data-match-right="${esc(p.en)}">${esc(p.en)}</button>`;
  }).join("");

  if (allDone && !answered) { ui.exAnswered[idx] = true; ui._lastOk = true; }
  return `<div class="exercise"><div class="ex-hint">Matching — link German & English</div><div class="ex-prompt">${esc(ex.prompt)}</div><div class="match-grid"><div class="match-col">${leftHtml}</div><div class="match-col">${rightHtml}</div></div>${allDone ? feedbackHtml(ex, true) : `<div class="ex-actions"><span class="unit-status">${matchedPairs.length}/${ex.pairs.length} matched</span></div>`}</div>`;
}

function exerciseDone(u, pr) {
  if (!pr.exDone) { pr.exDone = true; pr.exCorrect = Object.values(ui.exAnswered).filter(Boolean).length; pr.exTotal = u.exercises.length; addXp(10); save(); }
  const correct = Object.values(ui.exAnswered).filter(Boolean).length;
  return `
  <div class="quiz-result">
    <div class="score">${correct} / ${u.exercises.length}</div>
    <div class="score-sub">Exercises complete · +10 XP</div>
    <p style="margin-bottom:var(--space-6)">Great work! Now test your knowledge in the quiz.</p>
    <button class="btn btn-primary btn-lg" data-go-quiz>Go to quiz →</button>
  </div>`;
}

/* ---------- Quiz ---------- */
function tabQuiz(u, pr) {
  if (ui.quizDone || ui.quizIndex >= u.quiz.length) { ui.quizDone = true; return quizResult(u, pr); }
  const qs = u.quiz;
  const q = qs[ui.quizIndex];
  const answered = ui.quizChoices[ui.quizIndex] !== undefined;
  const chosen = ui.quizChoices[ui.quizIndex];
  let body = "";
  if (q.type === "mc") {
    const opts = q.options.map((o, i) => {
      let cls = "option";
      if (answered) { cls += " disabled"; if (i === q.answer) cls += " correct"; if (i === chosen && i !== q.answer) cls += " wrong"; }
      return `<label class="${cls}"><input type="radio" name="q${ui.quizIndex}" value="${i}" ${answered ? "disabled" : ""} ${answered && i === chosen ? "checked" : ""}><span>${esc(o)}</span></label>`;
    }).join("");
    body = `<div class="exercise"><div class="ex-hint">Question ${ui.quizIndex + 1} / ${qs.length}</div><div class="ex-prompt">${esc(q.prompt)}</div><div class="options">${opts}</div></div>`;
  } else if (q.type === "fill") {
    const v = ui.quizFillValue || "";
    body = `<div class="exercise"><div class="ex-hint">Question ${ui.quizIndex + 1} / ${qs.length}</div><div class="ex-prompt">${esc(q.prompt)}</div><input class="fill-input" data-qfill value="${esc(v)}" ${answered ? "disabled" : ""} placeholder="Your answer…"></div>`;
  }
  const actions = answered
    ? `<div class="ex-feedback show ${chosen === true || (q.type === "fill" && chosen) ? "ok" : "no"}">${(chosen === true || (q.type === "fill" && chosen)) ? "✓ Correct!" : "✗ Wrong."} ${esc(q.explain || "")}</div><div class="ex-actions"><button class="btn btn-primary" data-next-q>${ui.quizIndex < qs.length - 1 ? "Next →" : "Finish"}</button></div>`
    : `<div class="ex-actions"><button class="btn btn-primary" data-check-q>Check answer</button></div>`;
  return `<div class="ex-progress">${qs.map((_, i) => `<span class="${i < ui.quizIndex ? "done" : i === ui.quizIndex ? "cur" : ""}"></span>`).join("")}</div>${body}${actions}`;
}

function quizResult(u, pr) {
  const qs = u.quiz;
  const correct = qs.filter((_, i) => ui.quizChoices[i] === true).length;
  const pct = Math.round((correct / qs.length) * 100);
  if (!pr.complete) {
    pr.quizScore = correct; pr.quizTotal = qs.length;
    pr.complete = pct >= 60;
    addXp(20); touchStreak(); save();
  }
  const passed = pct >= 60;
  return `
  <div class="quiz-result">
    <div class="score">${correct} / ${qs.length}</div>
    <div class="score-sub">${pct}% · ${passed ? "Passed!" : "Try again"} · +20 XP</div>
    <p style="margin-bottom:var(--space-6);max-width:50ch;margin-inline:auto">${passed ? "Congratulations! This unit is complete. You can unlock the next unit or review the vocabulary trainer." : "You need at least 60% to pass. Review the lesson and try again."}</p>
    <div style="display:flex;gap:var(--space-3);justify-content:center;flex-wrap:wrap">
      ${nextUnitButton(u)}
      <button class="btn btn-ghost" data-retry-quiz>Retry quiz</button>
    </div>
  </div>`;
}

function nextUnitButton(u) {
  let lv, idx;
  for (const l of LEVELS) { const i = l.units.indexOf(u); if (i >= 0) { lv = l; idx = i; } }
  const next = lv.units[idx + 1] || LEVELS[LEVELS.indexOf(lv) + 1]?.units[0];
  if (next) return `<a class="btn btn-primary" href="#/unit/${next.id}">Next unit →</a>`;
  return `<a class="btn btn-primary" href="#/">Dashboard</a>`;
}

/* ===================== VOCAB TRAINER ===================== */
const SRS_INTERVALS = [0, 1, 10, 60, 1440, 4320, 10080]; // minutes per box
function vocabKey(lvId, uid, i) { return lvId + "-" + uid + "-" + i; }
function allVocab() {
  const deck = [];
  LEVELS.forEach((lv) => lv.units.forEach((u) => u.vocab.forEach((v, i) => deck.push({ ...v, key: vocabKey(lv.id, u.id, i), code: lv.code }))));
  return deck;
}
function getVocabState(key) {
  if (!state.vocab[key]) state.vocab[key] = { box: 0, due: 0 };
  return state.vocab[key];
}
function countDueVocab() {
  const now = Date.now();
  return allVocab().filter((w) => getVocabState(w.key).due <= now).length;
}
let trainer = { queue: [], current: null, flipped: false, stats: { again: 0, good: 0 } };

function viewTrainer() {
  const now = Date.now();
  if (!trainer.queue.length && trainer.current === null) {
    // build queue of due words; if none due, offer to study a fresh set
    const due = allVocab().filter((w) => getVocabState(w.key).due <= now);
    if (due.length) trainer.queue = shuffle(due);
    else return trainerEmpty();
  }
  if (trainer.current === null && trainer.queue.length) {
    trainer.current = trainer.queue.shift();
    trainer.flipped = false;
  }
  if (trainer.current === null) return trainerSummary();

  const w = trainer.current;
  const vs = getVocabState(w.key);
  return `
  <a class="back-link" href="#/"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>Back</a>
  <div class="section-head"><h2>Vocabulary trainer</h2><span class="tag">${w.code} · Box ${vs.box}</span></div>
  <div class="flashcard-wrap">
    <div class="flashcard ${trainer.flipped ? "flipped" : ""}" data-flip>
      <div class="flashcard-face flashcard-front">
        <span class="fc-hint">German</span>
        <div class="fc-word">${esc(w.de)}</div>
        <span class="fc-hint">Tap to flip</span>
      </div>
      <div class="flashcard-face flashcard-back">
        <span class="fc-hint">Meaning</span>
        <div class="fc-de">${esc(w.en)}</div>
        <div class="fc-ex">${esc(w.ex)}</div>
        <button class="speak-btn" data-speak="${esc(w.de)}" style="margin-top:var(--space-3)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19 5a10 10 0 0 1 0 14M16 8a5 5 0 0 1 0 8"/></svg></button>
      </div>
    </div>
    ${trainer.flipped ? `<div class="fc-rate"><button class="btn btn-ghost" data-rate="again">Again ✗</button><button class="btn btn-primary" data-rate="good">Got it ✓</button></div>
    <p class="unit-status" style="text-align:center;margin-top:var(--space-4)">Remaining: ${trainer.queue.length}</p>` : `<p class="unit-status" style="text-align:center;margin-top:var(--space-6)">${trainer.queue.length} cards in the queue</p>`}
  </div>
  `;
}
function shuffle(a) { const arr = a.slice(); for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

function trainerEmpty() {
  return `
  <a class="back-link" href="#/"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>Back</a>
  <div class="fc-empty">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M20 6L9 17l-5-5"/></svg>
    <h2>All reviewed!</h2>
    <p style="margin:var(--space-2) 0 var(--space-6)">No vocabulary is due right now. You can start a new study session.</p>
    <button class="btn btn-primary btn-lg" data-reset-trainer>Start new session</button>
  </div>`;
}
function trainerSummary() {
  return `
  <a class="back-link" href="#/"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>Back</a>
  <div class="quiz-result">
    <div class="score">${trainer.stats.good}</div>
    <div class="score-sub">cards remembered · ${trainer.stats.again} to review</div>
    <div style="display:flex;gap:var(--space-3);justify-content:center;margin-top:var(--space-6);flex-wrap:wrap">
      <button class="btn btn-primary" data-reset-trainer>Keep practicing</button>
      <a class="btn btn-ghost" href="#/">Dashboard</a>
    </div>
  </div>`;
}
function rateVocab(key, good) {
  const vs = getVocabState(key);
  if (good) { vs.box = Math.min(vs.box + 1, SRS_INTERVALS.length - 1); trainer.stats.good++; }
  else { vs.box = 0; trainer.stats.again++; }
  const mins = SRS_INTERVALS[vs.box];
  vs.due = Date.now() + mins * 60000;
  save();
}

/* ===================== EVENT DELEGATION ===================== */
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-speak]");
  if (t) { speak(t.dataset.speak); return; }
  if (e.target.closest("[data-speak-dialogue]")) {
    const m = UNIT_MAP[ui._uid]; if (m) speak(m.unit.dialogue.lines.map((l) => l.de).join(". "));
    return;
  }
  const tab = e.target.closest("[data-tab]");
  if (tab) { ui.tab = tab.dataset.tab; render(); return; }
  if (e.target.closest("[data-mark-learned]")) {
    const pr = unitProgress(ui._uid); if (!pr.learned) { pr.learned = true; addXp(5); save(); }
    ui.tab = "ueben"; ui.exIndex = 0; render(); return;
  }
  if (e.target.closest("[data-check-ex]")) { checkExercise(); return; }
  if (e.target.closest("[data-next-ex]")) { ui.exIndex++; ui._lastOk = null; ui.exMatch = {}; ui.exRightOrder = null; render(); return; }
  if (e.target.closest("[data-go-quiz]")) { ui.tab = "quiz"; render(); return; }
  if (e.target.closest("[data-check-q]")) { checkQuiz(); return; }
  if (e.target.closest("[data-next-q]")) {
    const u = LEVELS.flatMap((l) => l.units).find((un) => un.id === ui._uid);
    if (ui.quizIndex >= u.quiz.length - 1) ui.quizDone = true; else ui.quizIndex++;
    ui.quizFillValue = ""; render(); return;
  }
  if (e.target.closest("[data-retry-quiz]")) {
    const pr = unitProgress(ui._uid); pr.complete = false; pr.quizScore = 0;
    ui.quizDone = false; ui.quizIndex = 0; ui.quizChoices = {}; ui.quizFillValue = "";
    save(); render(); return;
  }
  // match interactions
  const ml = e.target.closest("[data-match-left]");
  if (ml) { handleMatch(parseInt(ml.dataset.matchLeft), null); return; }
  const mr = e.target.closest("[data-match-right]");
  if (mr) { handleMatch(null, mr.dataset.matchRight); return; }
  // flashcard
  if (e.target.closest("[data-flip]") && !e.target.closest("[data-rate]")) {
    trainer.flipped = true; render(); return;
  }
  const rate = e.target.closest("[data-rate]");
  if (rate) {
    const w = trainer.current; if (w) rateVocab(w.key, rate.dataset.rate === "good");
    trainer.current = null; render(); return;
  }
  if (e.target.closest("[data-reset-trainer]")) {
    // make a fresh set due for practice
    allVocab().forEach((w) => { const vs = getVocabState(w.key); vs.due = 0; });
    trainer = { queue: [], current: null, flipped: false, stats: { again: 0, good: 0 } };
    save(); render(); return;
  }
});

function checkExercise() {
  const ex = LEVELS.flatMap((l) => l.units).find((u) => u.id === ui._uid).exercises[ui.exIndex];
  if (ex.type === "mc") {
    const sel = document.querySelector(`input[name="ex${ui.exIndex}"]:checked`);
    if (sel === null) { flashHint("Please choose an answer."); return; }
    ui.exAnswered[ui.exIndex] = parseInt(sel.value) === ex.answer;
    ui._lastOk = ui.exAnswered[ui.exIndex];
  } else if (ex.type === "fill") {
    const inp = document.querySelector(`[data-fill="${ui.exIndex}"]`);
    ui.exFillValue = inp.value;
    const ok = checkFill(inp.value, ex.answer, ex.alts);
    ui.exAnswered[ui.exIndex] = ok; ui._lastOk = ok;
  }
  render();
}
function checkQuiz() {
  const u = LEVELS.flatMap((l) => l.units).find((un) => un.id === ui._uid);
  const q = u.quiz[ui.quizIndex];
  if (q.type === "mc") {
    const sel = document.querySelector(`input[name="q${ui.quizIndex}"]:checked`);
    if (sel === null) { flashHint("Please choose an answer."); return; }
    ui.quizChoices[ui.quizIndex] = parseInt(sel.value) === q.answer;
  } else if (q.type === "fill") {
    const inp = document.querySelector("[data-qfill]");
    ui.quizFillValue = inp.value;
    ui.quizChoices[ui.quizIndex] = checkFill(inp.value, q.answer, q.alts);
  }
  render();
}
function flashHint(msg) {
  let n = document.getElementById("hint-toast");
  if (!n) { n = document.createElement("div"); n.id = "hint-toast"; n.style.cssText = "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:var(--color-text);color:var(--color-bg);padding:10px 18px;border-radius:8px;font-weight:700;font-size:14px;z-index:99;box-shadow:var(--shadow-lg)"; document.body.appendChild(n); }
  n.textContent = msg; n.style.opacity = "1";
  clearTimeout(n._t); n._t = setTimeout(() => { n.style.opacity = "0"; }, 1800);
  n.style.transition = "opacity 0.3s";
}

// match state
function handleMatch(left, right) {
  const u = LEVELS.flatMap((l) => l.units).find((un) => un.id === ui._uid);
  const ex = u.exercises[ui.exIndex];
  if (!ui.exMatch) ui.exMatch = {};
  if (left !== null) { ui._matchLeft = left; render(); return; }
  if (right !== null && ui._matchLeft !== null) {
    const pair = ex.pairs[ui._matchLeft];
    if (pair.en === right) { ui.exMatch[ui._matchLeft] = right; }
    else { ui.exMatch[ui._matchLeft] = "wrong"; setTimeout(() => { delete ui.exMatch[ui._matchLeft]; render(); }, 600); }
    ui._matchLeft = null;
    render();
  }
}

/* keyboard: Enter to check/next */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  if (e.target.tagName === "INPUT") {
    if (e.target.hasAttribute("data-qfill")) { checkQuiz(); e.preventDefault(); }
    else if (e.target.hasAttribute("data-fill")) { checkExercise(); e.preventDefault(); }
  }
});

/* ---------- render wrapper ---------- */
function render() {
  el("main").innerHTML = route0();
  el("main").scrollTop = 0;
  window.scrollTo(0, 0);
  updateChips();
}
function route0() {
  const hash = location.hash.replace(/^#\/?/, "");
  const parts = hash.split("/").filter(Boolean);
  if (parts.length === 0) return viewHome();
  if (parts[0] === "level" && parts[1]) return viewLevel(parts[1]);
  if (parts[0] === "unit" && parts[1]) return viewUnit(parts[1]);
  if (parts[0] === "trainer") return viewTrainer();
  return viewHome();
}

/* ---------- Theme toggle ---------- */
(function () {
  const t = document.querySelector("[data-theme-toggle]");
  const r = document.documentElement;
  let d = matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light";
  r.setAttribute("data-theme", d);
  const setIcon = () => {
    t.innerHTML = d === "dark"
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    t.setAttribute("aria-label", "Switch to " + (d === "dark" ? "light" : "dark") + " mode");
  };
  setIcon();
  t.addEventListener("click", () => { d = d === "dark" ? "light" : "dark"; r.setAttribute("data-theme", d); setIcon(); });
})();

/* ---------- init ---------- */
touchStreak();
window.addEventListener("hashchange", render);
render();
