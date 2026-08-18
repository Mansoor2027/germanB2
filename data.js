/* Learn German — content A0 to B2 (English instructions, German learning material)
   Structure: levels[] -> units[] -> { vocab, grammar, dialogue, exercises, quiz }
   Exercise types: 'mc' (multiple choice), 'fill' (fill-in-the-blank), 'match' (matching)
*/
"use strict";

const LEVELS = [
  {
    id: "a0", code: "A0", name: "Absolute Beginner",
    desc: "First words, greetings and the alphabet — no prior knowledge needed.",
    units: [
      {
        id: "begruessungen", title: "Greetings", topic: "Hallo & Tschüss",
        vocab: [
          { de: "Hallo", en: "Hello", ex: "Hallo! Wie heißt du? — Hello! What's your name?" },
          { de: "Guten Morgen", en: "Good morning", ex: "Guten Morgen, Herr Müller! — Good morning, Mr. Müller!" },
          { de: "Guten Tag", en: "Good day / Hello", ex: "Guten Tag! Was möchten Sie? — Good day! What would you like?" },
          { de: "Guten Abend", en: "Good evening", ex: "Guten Abend, wie war der Tag? — Good evening, how was the day?" },
          { de: "Tschüss", en: "Bye", ex: "Tschüss! Bis morgen. — Bye! See you tomorrow." },
          { de: "Auf Wiedersehen", en: "Goodbye (formal)", ex: "Auf Wiedersehen, Frau Schmidt. — Goodbye, Mrs. Schmidt." },
        ],
        grammar: {
          title: "du and Sie — forms of address",
          intro: "German distinguishes between a familiar and a polite form of address.",
          bullets: [
            "du = familiar. Used with friends, family, children and among students.",
            "Sie = polite. Used with strangers, adults, in shops and at work.",
            "The polite Sie is always capitalized.",
          ],
          note: "When in doubt, use Sie — it is always polite.",
        },
        dialogue: {
          title: "First day at language school",
          lines: [
            { s: "A", de: "Guten Morgen! Ich bin Anna.", en: "Good morning! I'm Anna." },
            { s: "B", de: "Hallo Anna! Ich heiße Tom.", en: "Hello Anna! My name is Tom." },
            { s: "A", de: "Woher kommst du?", en: "Where are you from?" },
            { s: "B", de: "Ich komme aus England. Und du?", en: "I'm from England. And you?" },
            { s: "A", de: "Aus Spanien. Tschüss, bis morgen!", en: "From Spain. Bye, see you tomorrow!" },
            { s: "B", de: "Auf Wiedersehen und viel Erfolg!", en: "Goodbye and good luck!" },
          ],
        },
        exercises: [
          { type: "mc", prompt: "You meet your friend in the morning. What do you say?", options: ["Gute Nacht", "Guten Morgen", "Auf Wiedersehen", "Guten Abend"], answer: 1, explain: "Use „Guten Morgen” in the morning (before noon)." },
          { type: "fill", prompt: "Fill in: _____ Tag, Herr Becker!", answer: "Guten", alts: ["guten"], explain: "„Guten Tag” is a polite daytime greeting." },
          { type: "fill", prompt: "You say goodbye to a friend (informal). Write: _____", answer: "Tschüss", alts: ["tschüss", "Tschuss", "Bye"], explain: "„Tschüss” is the informal goodbye." },
          { type: "match", prompt: "Match the greetings to their meanings.", pairs: [{ de: "Guten Morgen", en: "Good morning" }, { de: "Guten Abend", en: "Good evening" }, { de: "Tschüss", en: "Bye" }, { de: "Auf Wiedersehen", en: "Goodbye (formal)" }] },
        ],
        quiz: [
          { type: "mc", prompt: "When do you say „Guten Abend”?", options: ["morgens", "am Mittag", "abends", "nachts"], answer: 2, explain: "„Guten Abend” is used in the evening." },
          { type: "fill", prompt: "Greet someone in the morning: Guten _____", answer: "Morgen", alts: ["morgen"], explain: "Guten Morgen — in the morning." },
          { type: "mc", prompt: "You talk to your teacher, Mrs. Klein. Which form of address?", options: ["du", "Sie", "ihr", "sie"], answer: 1, explain: "With teachers you use the polite Sie." },
          { type: "fill", prompt: "Reply informally to „Bis morgen!”: _____", answer: "Tschüss", alts: ["tschüss", "Bis morgen", "Tschuss"], explain: "„Tschüss” fits informally with „Bis morgen”." },
        ],
      },
      {
        id: "alphabet", title: "Alphabet & Pronunciation", topic: "ä, ö, ü and ß",
        vocab: [
          { de: "das Alphabet", en: "the alphabet", ex: "Das deutsche Alphabet hat 26 Buchstaben. — The German alphabet has 26 letters." },
          { de: "der Umlaut", en: "the umlaut (ä, ö, ü)", ex: "ä, ö und ü sind Umlaute. — ä, ö and ü are umlauts." },
          { de: "das Eszett (ß)", en: "the sharp s (ß)", ex: "Straße hat ein ß. — Straße has an ß." },
          { de: "der Buchstabe", en: "the letter", ex: "„A” ist der erste Buchstabe. — „A” is the first letter." },
          { de: "das Wort", en: "the word", ex: "Das Wort „Schule” hat sechs Buchstaben. — The word „Schule” has six letters." },
          { de: "aussprechen", en: "to pronounce", ex: "Wie spricht man das aus? — How do you pronounce that?" },
        ],
        grammar: {
          title: "Pronunciation rules",
          intro: "Some letter combinations sound different in German than in English.",
          bullets: [
            "ei = „ai” sound (mein, drei)",
            "ie = long „i” (Liebe, sie)",
            "eu / äu = „oi” sound (Deutsch, Häuser)",
            "v = often like „f” (Vater, viel)",
            "z = „ts” (Zeit, Zoo)",
            "sch = „sh” (Schule, Schiff)",
          ],
          note: "ß comes after a long vowel or diphthong: Straße, groß, heißen.",
        },
        dialogue: {
          title: "Spelling a name",
          lines: [
            { s: "A", de: "Wie schreibt man deinen Namen?", en: "How do you spell your name?" },
            { s: "B", de: "M-ü-l-l-e-r. Mit Umlaut.", en: "M-ü-l-l-e-r. With an umlaut." },
            { s: "A", de: "Und der Vorname?", en: "And the first name?" },
            { s: "B", de: "J-ö-r-g. Mit Ö.", en: "J-ö-r-g. With an Ö." },
            { s: "A", de: "Danke! Jörg Müller.", en: "Thanks! Jörg Müller." },
          ],
        },
        exercises: [
          { type: "mc", prompt: "How does „ei” sound in „mein”?", options: ["ee", "ai", "ei (as in Eifer)", "i"], answer: 1, explain: "„ei” sounds like „ai”: mein, drei, klein." },
          { type: "mc", prompt: "Which sound fits „ie” (e.g. „Liebe”)?", options: ["short i", "long i", "ai", "e"], answer: 1, explain: "„ie” is a long i: Liebe, sie." },
          { type: "fill", prompt: "The word „Stra__e” needs an ß. Write the missing letter: ß", answer: "ß", alts: ["ss"], explain: "After a long „a” you use ß: Straße." },
          { type: "mc", prompt: "How is „v” pronounced in „Vater”?", options: ["w", "f", "v", "p"], answer: 1, explain: "The „v” in Vater sounds like „f”." },
        ],
        quiz: [
          { type: "mc", prompt: "„eu” in „Deutsch” sounds like…", options: ["eu", "oi", "äu", "au"], answer: 1, explain: "„eu/äu” = oi sound: Deutsch, Häuser." },
          { type: "fill", prompt: "Write the word: Br__der (needs ü)", answer: "ü", alts: ["ue"], explain: "Umlaut ü: Brüder." },
          { type: "mc", prompt: "Which letter is the „Eszett”?", options: ["ß", "ss", "B", "æ"], answer: 0, explain: "ß = Eszett, the sharp s." },
          { type: "fill", prompt: "„Zoo” begins with the sound: __ (ts)", answer: "z", alts: ["ts", "Z"], explain: "z = ts sound: Zoo, Zeit." },
        ],
      },
      {
        id: "zahlen", title: "Numbers 0–20", topic: "null to zwanzig",
        vocab: [
          { de: "null", en: "zero", ex: "Meine Nummer ist null. — My number is zero." },
          { de: "eins", en: "one", ex: "Ich habe eins. — I have one." },
          { de: "zehn", en: "ten", ex: "zehn Minuten — ten minutes" },
          { de: "elf", en: "eleven", ex: "elf Uhr — eleven o'clock" },
          { de: "zwölf", en: "twelve", ex: "zwölf Monate — twelve months" },
          { de: "zwanzig", en: "twenty", ex: "zwanzig Euro — twenty euros" },
        ],
        grammar: {
          title: "Numbers 0 to 20",
          intro: "Here are all the numbers from 0 to 20.",
          table: [["0", "null"], ["1", "eins"], ["2", "zwei"], ["3", "drei"], ["4", "vier"], ["5", "fünf"], ["6", "sechs"], ["7", "sieben"], ["8", "acht"], ["9", "neun"], ["10", "zehn"], ["11", "elf"], ["12", "zwölf"], ["13", "dreizehn"], ["14", "vierzehn"], ["15", "fünfzehn"], ["16", "sechzehn"], ["17", "siebzehn"], ["18", "achtzehn"], ["19", "neunzehn"], ["20", "zwanzig"]],
          note: "Before a noun, „eins” becomes „ein”: ein Mann, ein Buch.",
        },
        dialogue: {
          title: "Exchanging phone numbers",
          lines: [
            { s: "A", de: "Wie ist deine Handynummer?", en: "What's your mobile number?" },
            { s: "B", de: "Null eins fünf, dann zwölf drei vier.", en: "Zero one five, then twelve three four." },
            { s: "A", de: "Moment, das war fünf und zwölf?", en: "Wait, that was five and twelve?" },
            { s: "B", de: "Genau. Null eins fünf zwölf drei vier.", en: "Exactly. Zero one five twelve three four." },
            { s: "A", de: "Super, ich rufe dich an.", en: "Great, I'll call you." },
          ],
        },
        exercises: [
          { type: "mc", prompt: "How do you say 13?", options: ["dreizehn", "dreiundzwanzig", "drei", "dreißig"], answer: 0, explain: "13 = dreizehn (drei + zehn)." },
          { type: "mc", prompt: "Which number is „zwölf”?", options: ["20", "2", "12", "11"], answer: 2, explain: "zwölf = 12." },
          { type: "fill", prompt: "Write the number as a word: 7 = _____", answer: "sieben", alts: [], explain: "7 = sieben." },
          { type: "mc", prompt: "Why „ein Buch” and not „eins Buch”?", options: ["eins is wrong", "before a noun, eins becomes ein", "it should be eine Buch", "no rule"], answer: 1, explain: "Before a noun you use „ein”, not „eins”." },
        ],
        quiz: [
          { type: "fill", prompt: "Write as a word: 8 = _____", answer: "acht", alts: [], explain: "8 = acht." },
          { type: "mc", prompt: "Which number is „fünfzehn”?", options: ["5", "50", "15", "55"], answer: 2, explain: "fünfzehn = 15." },
          { type: "mc", prompt: "What is „null”?", options: ["1", "0", "10", "100"], answer: 1, explain: "null = 0." },
          { type: "fill", prompt: "The number 1 before a noun is written: _____", answer: "ein", alts: [], explain: "eins → ein before a noun." },
        ],
      },
    ],
  },

  {
    id: "a1", code: "A1", name: "Beginner",
    desc: "Introduce yourself, ask questions and conjugate your first verbs.",
    units: [
      {
        id: "ich-bin", title: "Ich bin …", topic: "sein & pronouns",
        vocab: [
          { de: "heißen", en: "to be called", ex: "Ich heiße Anna. — I'm called Anna." },
          { de: "wohnen", en: "to live", ex: "Ich wohne in Berlin. — I live in Berlin." },
          { de: "kommen aus", en: "to come from", ex: "Ich komme aus Spanien. — I come from Spain." },
          { de: "der Name", en: "the name", ex: "Mein Name ist Tom. — My name is Tom." },
          { de: "das Land", en: "the country", ex: "Welches Land magst du? — Which country do you like?" },
          { de: "der Student / die Studentin", en: "the student", ex: "Sie ist Studentin. — She is a student." },
        ],
        grammar: {
          title: "The verb sein (to be)",
          intro: "„sein” is irregular and very common.",
          table: [["ich", "bin"], ["du", "bist"], ["er/sie/es", "ist"], ["wir", "sind"], ["ihr", "seid"], ["sie/Sie", "sind"]],
          note: "German has no article before a profession: „Ich bin Student.” (I am a student).",
        },
        dialogue: {
          title: "Introducing yourself",
          lines: [
            { s: "A", de: "Hallo! Wie heißt du?", en: "Hi! What's your name?" },
            { s: "B", de: "Ich heiße Sara. Und du?", en: "I'm Sara. And you?" },
            { s: "A", de: "Ich bin David. Woher kommst du?", en: "I'm David. Where are you from?" },
            { s: "B", de: "Ich komme aus der Türkei. Wohnst du hier?", en: "I'm from Turkey. Do you live here?" },
            { s: "A", de: "Ja, ich wohne in München und bin Student.", en: "Yes, I live in Munich and am a student." },
          ],
        },
        exercises: [
          { type: "fill", prompt: "Conjugate sein: Ich _____ Anna.", answer: "bin", alts: [], explain: "ich → bin." },
          { type: "fill", prompt: "Conjugate sein: Du _____ sehr nett.", answer: "bist", alts: [], explain: "du → bist." },
          { type: "mc", prompt: "„Wir … Schüler.” Which verb form?", options: ["bin", "bist", "sind", "seid"], answer: 2, explain: "wir → sind." },
          { type: "mc", prompt: "Which sentence is correct?", options: ["Ich bin ein Student.", "Ich bin Student.", "Ich bin der Student.", "Ich bin eine Student."], answer: 1, explain: "No article before a profession: Ich bin Student." },
        ],
        quiz: [
          { type: "fill", prompt: "Conjugate sein: Er _____ Lehrer.", answer: "ist", alts: [], explain: "er/sie/es → ist." },
          { type: "mc", prompt: "„Ihr … müde.” Correct form?", options: ["bin", "bist", "sind", "seid"], answer: 3, explain: "ihr → seid." },
          { type: "mc", prompt: "How do you ask someone's name (informal)?", options: ["Wie heißen Sie?", "Wie heißt du?", "Was bist du?", "Wie du heißt?"], answer: 1, explain: "Informal: Wie heißt du?" },
          { type: "fill", prompt: "Fill the preposition: Ich komme _____ Deutschland.", answer: "aus", alts: [], explain: "kommen aus = to come from." },
        ],
      },
      {
        id: "artikel", title: "Articles & Question Words", topic: "der, die, das",
        vocab: [
          { de: "der Mann", en: "the man", ex: "Der Mann ist nett. — The man is nice." },
          { de: "die Frau", en: "the woman", ex: "Die Frau heißt Eva. — The woman is called Eva." },
          { de: "das Kind", en: "the child", ex: "Das Kind spielt. — The child plays." },
          { de: "der Tisch", en: "the table", ex: "Der Tisch ist rund. — The table is round." },
          { de: "das Buch", en: "the book", ex: "Das Buch ist neu. — The book is new." },
          { de: "die Frage", en: "the question", ex: "Das ist eine gute Frage. — That's a good question." },
        ],
        grammar: {
          title: "Definite articles & question words",
          intro: "Every German noun has a gender: masculine (der), feminine (die) or neuter (das).",
          table: [["der", "Mann (m)"], ["die", "Frau (f)"], ["das", "Kind (n)"], ["die", "Kinder (plural)"]],
          bullets: [
            "wer = who · was = what · wo = where",
            "woher = where from · wie = how",
            "Indefinite article: ein (m), eine (f), ein (n).",
          ],
          note: "Learn each noun with its article: not just „Tisch”, but „der Tisch”.",
        },
        dialogue: {
          title: "In the classroom",
          lines: [
            { s: "A", de: "Was ist das?", en: "What is that?" },
            { s: "B", de: "Das ist ein Buch.", en: "That is a book." },
            { s: "A", de: "Und wer ist das?", en: "And who is that?" },
            { s: "B", de: "Das ist die Frau Köhler, unsere Lehrerin.", en: "That's Mrs. Köhler, our teacher." },
            { s: "A", de: "Wo ist der Tisch?", en: "Where is the table?" },
            { s: "B", de: "Dort drüben, beim Fenster.", en: "Over there, by the window." },
          ],
        },
        exercises: [
          { type: "mc", prompt: "_____ Frau ist Lehrerin. Which article?", options: ["Der", "Die", "Das", "Ein"], answer: 1, explain: "Frau is feminine → die." },
          { type: "mc", prompt: "_____ Kind spielt. Which article?", options: ["Der", "Die", "Das", "Den"], answer: 2, explain: "Kind is neuter → das." },
          { type: "fill", prompt: "Choose the article: Ich habe ein Buch. Das ist ___ gutes Buch.", answer: "ein", alts: [], explain: "Buch (n) → ein." },
          { type: "match", prompt: "Match the articles to the nouns.", pairs: [{ de: "der", en: "Mann" }, { de: "die", en: "Frau" }, { de: "das", en: "Kind" }, { de: "die", en: "Bücher (pl.)" }] },
        ],
        quiz: [
          { type: "mc", prompt: "Which question word asks about a person?", options: ["was", "wer", "wo", "wie"], answer: 1, explain: "wer = who." },
          { type: "mc", prompt: "_____ Mann heißt Paul.", options: ["Die", "Das", "Der", "Den"], answer: 2, explain: "Mann (m) → der." },
          { type: "fill", prompt: "Conjugate kommen: Woher _____ du?", answer: "kommst", alts: [], explain: "du → kommst." },
          { type: "mc", prompt: "Why „ein Buch”?", options: ["Buch is feminine", "Buch is neuter", "Buch is masculine", "Buch is plural"], answer: 1, explain: "Buch (n) → ein." },
        ],
      },
      {
        id: "praesens", title: "Verbs in the Present Tense", topic: "regular verbs",
        vocab: [
          { de: "lernen", en: "to learn", ex: "Ich lerne Deutsch. — I learn German." },
          { de: "wohnen", en: "to live", ex: "Wir wohnen hier. — We live here." },
          { de: "kommen", en: "to come", ex: "Er kommt morgen. — He's coming tomorrow." },
          { de: "sprechen", en: "to speak", ex: "Du sprichst Deutsch. — You speak German." },
          { de: "arbeiten", en: "to work", ex: "Sie arbeitet viel. — She works a lot." },
          { de: "lesen", en: "to read", ex: "Ich lese ein Buch. — I read a book." },
        ],
        grammar: {
          title: "Conjugation in the present tense",
          intro: "Regular verbs end in -en. The stem stays the same; only the ending changes.",
          table: [["ich", "lerne"], ["du", "lernst"], ["er/sie/es", "lernt"], ["wir", "lernen"], ["ihr", "lernt"], ["sie/Sie", "lernen"]],
          bullets: [
            "Stem-vowel change: sprechen → du sprichst, er spricht.",
            "lesen → du liest, er liest.",
            "The 2nd and 3rd person singular change a→i or e→ie for some verbs.",
          ],
          note: "For „sprechen” and „lesen” the vowel changes in the 2nd and 3rd person singular.",
        },
        dialogue: {
          title: "Languages and daily life",
          lines: [
            { s: "A", de: "Sprichst du Deutsch?", en: "Do you speak German?" },
            { s: "B", de: "Ja, ich lerne Deutsch. Und du?", en: "Yes, I'm learning German. And you?" },
            { s: "A", de: "Ich spreche Englisch und ein bisschen Deutsch.", en: "I speak English and a little German." },
            { s: "B", de: "Was machst du beruflich?", en: "What do you do for work?" },
            { s: "A", de: "Ich arbeite als Krankenpfleger.", en: "I work as a nurse (male)." },
          ],
        },
        exercises: [
          { type: "fill", prompt: "Conjugate lernen: Ich _____ Deutsch.", answer: "lerne", alts: [], explain: "ich → lerne." },
          { type: "fill", prompt: "Conjugate sprechen: Du _____ gut Deutsch.", answer: "sprichst", alts: [], explain: "sprechen → du sprichst (a→i)." },
          { type: "mc", prompt: "„Er … ein Buch.” (lesen)", options: ["lesst", "lest", "liest", "lese"], answer: 2, explain: "lesen → er liest (e→ie)." },
          { type: "fill", prompt: "Conjugate wohnen: Wir _____ in Wien.", answer: "wohnen", alts: [], explain: "wir → wohnen." },
        ],
        quiz: [
          { type: "mc", prompt: "„Sie … viel.” (arbeiten) Which form for polite Sie?", options: ["arbeite", "arbeitest", "arbeiten", "arbeitet"], answer: 2, explain: "Sie (polite) → arbeiten." },
          { type: "fill", prompt: "Conjugate wohnen: Er _____ in Berlin.", answer: "wohnt", alts: [], explain: "er → wohnt." },
          { type: "mc", prompt: "Which verb has a stem-vowel change?", options: ["wohnen", "lernen", "sprechen", "kommen"], answer: 2, explain: "sprechen → du sprichst, er spricht." },
          { type: "fill", prompt: "Conjugate lesen: Du _____ eine Zeitung.", answer: "liest", alts: [], explain: "lesen → du liest." },
        ],
      },
    ],
  },

  {
    id: "a2", code: "A2", name: "Elementary",
    desc: "Modal verbs, cases and the past tense — talk about plans and experiences.",
    units: [
      {
        id: "modalverben", title: "Modal Verbs", topic: "können, müssen, wollen",
        vocab: [
          { de: "können", en: "can / to be able to", ex: "Ich kann schwimmen. — I can swim." },
          { de: "müssen", en: "must / to have to", ex: "Ich muss arbeiten. — I have to work." },
          { de: "wollen", en: "to want to", ex: "Wir wollen ins Kino. — We want to go to the cinema." },
          { de: "mögen", en: "to like", ex: "Ich mag Pizza. — I like pizza." },
          { de: "dürfen", en: "may / to be allowed to", ex: "Du darfst hier rauchen. — You may smoke here." },
          { de: "das Hobby", en: "the hobby", ex: "Mein Hobby ist Lesen. — My hobby is reading." },
        ],
        grammar: {
          title: "Modal verb + infinitive at the end",
          intro: "The modal verb goes in position 2; the main verb (infinitive) goes to the end of the sentence.",
          table: [["ich", "kann / muss / will"], ["du", "kannst / musst / willst"], ["er/sie/es", "kann / muss / will"], ["wir", "können / müssen / wollen"], ["ihr", "könnt / müsst / wollt"], ["sie/Sie", "können / müssen / wollen"]],
          note: "„Ich kann gut Deutsch sprechen.” — „sprechen” (infinitive) goes to the very end.",
        },
        dialogue: {
          title: "Weekend plans",
          lines: [
            { s: "A", de: "Was willst du am Wochenende machen?", en: "What do you want to do this weekend?" },
            { s: "B", de: "Ich muss am Samstag arbeiten.", en: "I have to work on Saturday." },
            { s: "A", de: "Schade. Können wir uns am Sonntag treffen?", en: "Too bad. Can we meet on Sunday?" },
            { s: "B", de: "Ja, das klingt gut! Ich will ins Museum gehen.", en: "Yes, that sounds good! I want to go to the museum." },
            { s: "A", de: "Super, ich mag Museen. Bis Sonntag!", en: "Great, I like museums. See you Sunday!" },
          ],
        },
        exercises: [
          { type: "fill", prompt: "Conjugate können: Ich _____ gut kochen.", answer: "kann", alts: [], explain: "ich → kann." },
          { type: "mc", prompt: "Which sentence is correct?", options: ["Ich kann sprechen Deutsch.", "Ich kann Deutsch sprechen.", "Ich Deutsch sprechen kann.", "Ich sprechen kann Deutsch."], answer: 1, explain: "Modal verb in pos. 2, infinitive at the end: Ich kann Deutsch sprechen." },
          { type: "fill", prompt: "Conjugate wollen: Wir _____ nach Hause gehen.", answer: "wollen", alts: [], explain: "wir → wollen." },
          { type: "fill", prompt: "Conjugate müssen: Du _____ leise sein.", answer: "musst", alts: [], explain: "du → musst." },
        ],
        quiz: [
          { type: "mc", prompt: "„Er … schwimmen.” (können)", options: ["kannst", "kann", "können", "könnt"], answer: 1, explain: "er → kann." },
          { type: "mc", prompt: "Where does the infinitive go with a modal verb?", options: ["at the start", "in position 2", "at the end", "in a subordinate clause"], answer: 2, explain: "The infinitive goes at the end of the sentence." },
          { type: "fill", prompt: "Conjugate müssen: Ihr _____ pünktlich sein.", answer: "müsst", alts: [], explain: "ihr → müsst." },
          { type: "mc", prompt: "Which modal verb means „to be allowed to”?", options: ["können", "wollen", "dürfen", "müssen"], answer: 2, explain: "dürfen = may / to be allowed to." },
        ],
      },
      {
        id: "akkusativ", title: "The Accusative Case", topic: "the direct object",
        vocab: [
          { de: "der Apfel", en: "the apple", ex: "Ich esse einen Apfel. — I eat an apple." },
          { de: "der Kaffee", en: "the coffee", ex: "Ich trinke einen Kaffee. — I drink a coffee." },
          { de: "die Milch", en: "the milk", ex: "Sie kauft Milch. — She buys milk." },
          { de: "der Tee", en: "the tea", ex: "Möchtest du einen Tee? — Would you like a tea?" },
          { de: "kaufen", en: "to buy", ex: "Wir kaufen Brot. — We buy bread." },
          { de: "essen", en: "to eat", ex: "Er isst eine Pizza. — He eats a pizza." },
        ],
        grammar: {
          title: "Accusative — the direct object",
          intro: "The accusative answers „Whom or what?”. Only the masculine article changes.",
          table: [["der (nom.)", "den (acc.)"], ["ein", "einen"], ["die / das", "stay the same"]],
          note: "Ich sehe den Mann. (der → den) · Ich sehe die Frau. (die → die)",
        },
        dialogue: {
          title: "At the café",
          lines: [
            { s: "A", de: "Möchtest du einen Kaffee?", en: "Would you like a coffee?" },
            { s: "B", de: "Nein danke, ich trinke lieber einen Tee.", en: "No thanks, I'd rather drink a tea." },
            { s: "A", de: "Und etwas zu essen? Einen Apfel?", en: "And something to eat? An apple?" },
            { s: "B", de: "Ja, ich nehme den Apfel und einen Tee.", en: "Yes, I'll take the apple and a tea." },
            { s: "A", de: "Alles klar, ich bestelle.", en: "All good, I'll order." },
          ],
        },
        exercises: [
          { type: "fill", prompt: "Accusative: Ich sehe _____ Mann. (der)", answer: "den", alts: [], explain: "Accusative masculine: der → den." },
          { type: "mc", prompt: "„Ich kaufe ein … Buch.” Correct?", options: ["ein Buch", "einen Buch", "eine Buch", "ein Buches"], answer: 0, explain: "Buch (n) → ein stays the same in the accusative." },
          { type: "fill", prompt: "Accusative: Sie isst _____ Apfel. (ein)", answer: "einen", alts: [], explain: "Apfel (m) → einen in the accusative." },
          { type: "mc", prompt: "„Whom or what?” asks for the…", options: ["nominative", "dative", "accusative", "genitive"], answer: 2, explain: "The accusative answers Whom or what?." },
        ],
        quiz: [
          { type: "fill", prompt: "Accusative: Wir besuchen _____ Lehrer. (der)", answer: "den", alts: [], explain: "der → den (acc. m)." },
          { type: "mc", prompt: "Which article stays the same in the accusative?", options: ["der (m)", "ein (m)", "die (f)", "den"], answer: 2, explain: "die (f) and das (n) don't change in the accusative." },
          { type: "fill", prompt: "Accusative: Ich trinke _____ Kaffee. (ein)", answer: "einen", alts: [], explain: "Kaffee (m) → einen." },
          { type: "mc", prompt: "„Ich esse den Apfel.” — why „den”?", options: ["accusative masculine", "nominative", "dative feminine", "plural"], answer: 0, explain: "der → den in the accusative masculine." },
        ],
      },
      {
        id: "perfekt", title: "The Perfect Tense", topic: "the spoken past",
        vocab: [
          { de: "machen", en: "to do / make", ex: "Ich habe Hausaufgaben gemacht. — I did my homework." },
          { de: "sehen", en: "to see", ex: "Wir haben einen Film gesehen. — We watched a film." },
          { de: "gehen", en: "to go", ex: "Ich bin ins Kino gegangen. — I went to the cinema." },
          { de: "schreiben", en: "to write", ex: "Sie hat eine Email geschrieben. — She wrote an email." },
          { de: "lesen", en: "to read", ex: "Er hat das Buch gelesen. — He read the book." },
          { de: "gestern", en: "yesterday", ex: "Gestern war ich müde. — Yesterday I was tired." },
        ],
        grammar: {
          title: "Perfect: haben/sein + Partizip II",
          intro: "The perfect tense is the spoken past. It needs an auxiliary verb and the past participle (Partizip II).",
          bullets: [
            "haben: most verbs (gemacht, gesehen, gelesen).",
            "sein: verbs of movement & change of state (gegangen, gekommen).",
            "Regular: ge + stem + t → gemacht, gespielt.",
            "Irregular: ge + stem + en → gesehen, geschrieben, gelesen.",
          ],
          note: "The past participle goes at the end: Ich habe die Hausaufgaben gemacht.",
        },
        dialogue: {
          title: "What did you do yesterday?",
          lines: [
            { s: "A", de: "Was hast du gestern Abend gemacht?", en: "What did you do last night?" },
            { s: "B", de: "Ich habe einen Film gesehen.", en: "I watched a film." },
            { s: "A", de: "Bist du danach noch weggegangen?", en: "Did you go out afterwards?" },
            { s: "B", de: "Nein, ich bin zu Hause geblieben.", en: "No, I stayed at home." },
            { s: "A", de: "Ich bin auch zu Hause geblieben und habe gelesen.", en: "I stayed home too and read." },
          ],
        },
        exercises: [
          { type: "fill", prompt: "Past participle: Ich habe das Buch _____. (lesen)", answer: "gelesen", alts: [], explain: "lesen → gelesen (irregular)." },
          { type: "fill", prompt: "Past participle: Wir haben Pizza _____. (essen)", answer: "gegessen", alts: [], explain: "essen → gegessen." },
          { type: "mc", prompt: "Which auxiliary does „gehen” need?", options: ["haben", "sein", "werden", "können"], answer: 1, explain: "gehen → sein: Ich bin gegangen." },
          { type: "fill", prompt: "Past participle: Sie ist nach Berlin _____. (fahren)", answer: "gefahren", alts: [], explain: "fahren → gefahren, with sein (movement)." },
        ],
        quiz: [
          { type: "fill", prompt: "Past participle: Er hat die Email _____. (schreiben)", answer: "geschrieben", alts: [], explain: "schreiben → geschrieben." },
          { type: "mc", prompt: "„Ich habe … gearbeitet.” The participle is…", options: ["gearbeitet", "gearbeiten", "gearbeit", "gearbeitet"], answer: 0, explain: "regular: ge + arbeit + et → gearbeitet." },
          { type: "mc", prompt: "Which verb takes „sein”?", options: ["machen", "sehen", "kommen", "lesen"], answer: 2, explain: "kommen (movement) → Ich bin gekommen." },
          { type: "fill", prompt: "Past participle: Wir haben den Film _____. (sehen)", answer: "gesehen", alts: [], explain: "sehen → gesehen." },
        ],
      },
    ],
  },

  {
    id: "b1", code: "B1", name: "Intermediate",
    desc: "Subordinate clauses, past tenses and adjective endings for fluent speaking.",
    units: [
      {
        id: "nebensaetze", title: "Subordinate Clauses", topic: "weil, dass, wenn",
        vocab: [
          { de: "weil", en: "because", ex: "Ich bleibe zu Hause, weil ich krank bin. — I'm staying home because I'm sick." },
          { de: "dass", en: "that (conjunction)", ex: "Ich glaube, dass er kommt. — I think that he's coming." },
          { de: "wenn", en: "if / when", ex: "Wenn es regnet, lese ich. — When it rains, I read." },
          { de: "obwohl", en: "although", ex: "Obwohl es spät ist, arbeite ich. — Although it's late, I'm working." },
          { de: "müde", en: "tired", ex: "Ich bin müde. — I'm tired." },
          { de: "glücklich", en: "happy", ex: "Sie ist glücklich. — She is happy." },
        ],
        grammar: {
          title: "Verb at the end in subordinate clauses",
          intro: "Conjunctions like weil, dass, wenn, obwohl introduce a subordinate clause — the verb moves to the end.",
          table: [["weil", "dass", "wenn", "obwohl", "sobald"], ["verb → end", "", "", "", ""]],
          note: "Ich bleibe zu Hause, weil ich krank bin. („bin” goes to the end)",
        },
        dialogue: {
          title: "Explaining reasons",
          lines: [
            { s: "A", de: "Warum kommst du nicht zur Party?", en: "Why aren't you coming to the party?" },
            { s: "B", de: "Weil ich morgen früh arbeiten muss.", en: "Because I have to work early tomorrow." },
            { s: "A", de: "Schade. Ich glaube, dass alle kommen.", en: "Too bad. I think everyone is coming." },
            { s: "B", de: "Wenn ich Zeit habe, komme ich später.", en: "If I have time, I'll come later." },
            { s: "A", de: "Obwohl du müde bist, hoffe ich das.", en: "Although you're tired, I hope so." },
          ],
        },
        exercises: [
          { type: "mc", prompt: "Which sentence is correct?", options: ["Weil ich bin krank.", "Weil ich krank bin.", "Weil ich krank.", "Ich krank bin weil."], answer: 1, explain: "Verb to the end: Weil ich krank bin." },
          { type: "fill", prompt: "Verb to the end: Ich denke, dass sie das _____. (wissen)", answer: "weiß", alts: [], explain: "Verb at the end: dass sie das weiß." },
          { type: "mc", prompt: "„obwohl” introduces a…", options: ["main clause", "subordinate clause", "question", "imperative"], answer: 1, explain: "obwohl → subordinate clause, verb at the end." },
          { type: "fill", prompt: "Verb at the end: Wenn es _____, bleibe ich zu Hause. (regnen)", answer: "regnet", alts: [], explain: "Wenn es regnet — verb at the end of the subordinate clause." },
        ],
        quiz: [
          { type: "mc", prompt: "Where does the verb go in a „weil” clause?", options: ["in position 2", "at the start", "at the end", "after the subject"], answer: 2, explain: "In a subordinate clause the verb goes to the end." },
          { type: "fill", prompt: "Verb to the end: Ich glaube, dass er die Wahrheit _____. (sagen)", answer: "sagt", alts: [], explain: "dass er die Wahrheit sagt." },
          { type: "mc", prompt: "Which conjunction means „although”?", options: ["weil", "wenn", "obwohl", "dass"], answer: 2, explain: "obwohl = although." },
          { type: "fill", prompt: "Verb to the end: Weil ich müde _____, gehe ich schlafen. (sein)", answer: "bin", alts: [], explain: "Weil ich müde bin — verb at the end." },
        ],
      },
      {
        id: "praeteritum", title: "Präteritum vs Perfekt", topic: "war, hatte, konnte",
        vocab: [
          { de: "war", en: "was", ex: "Ich war in Paris. — I was in Paris." },
          { de: "hatte", en: "had", ex: "Sie hatte einen Hund. — She had a dog." },
          { de: "konnte", en: "could", ex: "Er konnte gut kochen. — He could cook well." },
          { de: "wollte", en: "wanted", ex: "Wir wollten kommen. — We wanted to come." },
          { de: "ging", en: "went", ex: "Ich ging nach Hause. — I went home." },
          { de: "früher", en: "in the past / formerly", ex: "Früher wohnte ich hier. — I used to live here." },
        ],
        grammar: {
          title: "Präteritum — the narrative past",
          intro: "The Präteritum (simple past) is used mainly in texts, news and storytelling.",
          table: [["sein", "haben", "können"], ["ich war", "ich hatte", "ich konnte"], ["du warst", "du hattest", "du konntest"], ["er war", "er hatte", "er konnte"], ["wir waren", "wir hatten", "wir konnten"]],
          note: "In speech, the Perfekt is usually used. But for sein, haben and modal verbs, the Präteritum is common even in everyday speech.",
        },
        dialogue: {
          title: "A short story",
          lines: [
            { s: "A", de: "Gestern war ich im Museum.", en: "Yesterday I was at the museum." },
            { s: "B", de: "Was hast du dort gemacht?", en: "What did you do there?" },
            { s: "A", de: "Ich hatte eine Führung. Danach ging ich ins Café.", en: "I had a guided tour. Afterwards I went to the café." },
            { s: "B", de: "Konntest du alles verstehen?", en: "Could you understand everything?" },
            { s: "A", de: "Ja, die Führung war auf Deutsch und ich verstand fast alles.", en: "Yes, the tour was in German and I understood almost everything." },
          ],
        },
        exercises: [
          { type: "fill", prompt: "Präteritum: Früher _____ ich in Köln. (sein)", answer: "war", alts: [], explain: "sein → ich war." },
          { type: "fill", prompt: "Präteritum: Sie _____ keine Zeit. (haben)", answer: "hatte", alts: [], explain: "haben → hatte." },
          { type: "mc", prompt: "„Wir … gut kochen.” (können, Präteritum)", options: ["konnte", "konnten", "könnten", "kann"], answer: 1, explain: "wir → konnten." },
          { type: "mc", prompt: "When is the Präteritum often used?", options: ["in text messages", "in narratives & news", "always in dialogue", "never"], answer: 1, explain: "Präteritum = narrative past, used in texts and news." },
        ],
        quiz: [
          { type: "fill", prompt: "Präteritum: Du _____ als Kind in Berlin. (sein)", answer: "warst", alts: [], explain: "du → warst." },
          { type: "fill", prompt: "Präteritum: Ich _____ keinen Hunger. (haben)", answer: "hatte", alts: [], explain: "haben → hatte." },
          { type: "mc", prompt: "„Er … schwimmen.” (können, Präteritum)", options: ["kann", "konnte", "könnte", "kannst"], answer: 1, explain: "er → konnte." },
          { type: "mc", prompt: "Which is the spoken past?", options: ["Präteritum", "Perfekt", "Futur", "Präsens"], answer: 1, explain: "Perfekt = spoken past; Präteritum = narrative past." },
        ],
      },
      {
        id: "adjektivdeklination", title: "Adjective Endings", topic: "der gute Mann",
        vocab: [
          { de: "der gute Mann", en: "the good man", ex: "Der gute Mann hilft uns. — The good man helps us." },
          { de: "das kleine Kind", en: "the small child", ex: "Das kleine Kind lacht. — The small child laughs." },
          { de: "die neue Tasche", en: "the new bag", ex: "Die neue Tasche ist schön. — The new bag is nice." },
          { de: "jung", en: "young", ex: "Er ist jung. — He is young." },
          { de: "alt", en: "old", ex: "Das Haus ist alt. — The house is old." },
          { de: "teuer", en: "expensive", ex: "Das Auto ist teuer. — The car is expensive." },
        ],
        grammar: {
          title: "Attributive adjective endings",
          intro: "When an adjective comes before a noun, it gets an ending that depends on the article, gender and case.",
          table: [["", "m", "f", "n", "pl."], ["der", "gute", "gute", "gute", "guten"], ["ein", "guter", "gute", "gutes", "guten"]],
          note: "After „der”, all endings are -e: der gute Mann, das kleine Kind. After „ein”, they differ: ein guter Mann, ein gutes Kind.",
        },
        dialogue: {
          title: "Describing people and things",
          lines: [
            { s: "A", de: "Siehst du den jungen Mann dort?", en: "Do you see the young man over there?" },
            { s: "B", de: "Ja, und das kleine Mädchen neben ihm?", en: "Yes, and the small girl next to him?" },
            { s: "A", de: "Das ist seine Tochter. Sie hat eine neue Tasche.", en: "That's his daughter. She has a new bag." },
            { s: "B", de: "Schön! Ist die Tasche teuer gewesen?", en: "Nice! Was the bag expensive?" },
            { s: "A", de: "Nein, der alte Laden war im Ausverkauf.", en: "No, the old shop was having a sale." },
          ],
        },
        exercises: [
          { type: "fill", prompt: "Ending: der gut__ Mann", answer: "e", alts: [], explain: "After „der”: der gute Mann." },
          { type: "fill", prompt: "Ending: ein gut__ Mann", answer: "er", alts: [], explain: "After „ein” masculine: ein guter Mann." },
          { type: "fill", prompt: "Ending: das klein__ Kind", answer: "e", alts: [], explain: "After „das”: das kleine Kind." },
          { type: "fill", prompt: "Ending: ein klein__ Kind", answer: "es", alts: [], explain: "After „ein” neuter: ein kleines Kind." },
        ],
        quiz: [
          { type: "fill", prompt: "Ending: die neu__ Tasche", answer: "e", alts: [], explain: "After „die”: die neue Tasche." },
          { type: "fill", prompt: "Ending: ein jung__ Mann", answer: "er", alts: [], explain: "ein junger Mann (m)." },
          { type: "mc", prompt: "Which ending after „der” (masculine)?", options: ["-er", "-e", "-es", "-en"], answer: 1, explain: "der gute Mann → -e." },
          { type: "fill", prompt: "Ending: das alt__ Haus", answer: "e", alts: [], explain: "After „das”: das alte Haus." },
        ],
      },
    ],
  },

  {
    id: "b2", code: "B2", name: "Upper Intermediate",
    desc: "Connectors, passive voice and Konjunktiv II — argue and express nuance.",
    units: [
      {
        id: "konnektoren", title: "Connectors & Word Order", topic: "obwohl, deshalb, bevor",
        vocab: [
          { de: "obwohl", en: "although", ex: "Obwohl es regnete, kam sie. — Although it rained, she came." },
          { de: "trotzdem", en: "nevertheless", ex: "Es regnete, trotzdem kam sie. — It rained; nevertheless, she came." },
          { de: "deshalb", en: "therefore", ex: "Ich war müde, deshalb ging ich. — I was tired, so I left." },
          { de: "während", en: "while", ex: "Während ich arbeitete, las er. — While I worked, he read." },
          { de: "bevor", en: "before", ex: "Bevor du gehst, ruf an. — Before you go, call." },
          { de: "nachdem", en: "after", ex: "Nachdem ich aß, ging ich spazieren. — After I ate, I went for a walk." },
        ],
        grammar: {
          title: "Conjunctions and conjunctive adverbs",
          intro: "Some conjunctions send the verb to the end; others keep the normal word order.",
          table: [["verb to the end", "normal word order"], ["weil, dass, obwohl, bevor, nachdem, sobald, während", "aber, und, sondern, denn"], ["", "deshalb, trotzdem, jedoch (position 0)"]],
          note: "„Es regnete, deshalb blieb ich zu Hause.” — „deshalb” takes position 0, so the verb follows in position 2.",
        },
        dialogue: {
          title: "A discussion",
          lines: [
            { s: "A", de: "Obwohl die Aufgaben schwer waren, habe ich sie gelöst.", en: "Although the tasks were hard, I solved them." },
            { s: "B", de: "Das ist toll. Ich war krank, deshalb konnte ich nicht üben.", en: "That's great. I was sick, so I couldn't practice." },
            { s: "A", de: "Bevor du die Prüfung machst, solltest du pauken.", en: "Before you take the exam, you should cram." },
            { s: "B", de: "Nachdem ich mich ausgeruht habe, werde ich das tun.", en: "After I've rested, I'll do that." },
            { s: "A", de: "Während du lernst, bereite ich etwas zu essen vor.", en: "While you study, I'll prepare something to eat." },
          ],
        },
        exercises: [
          { type: "mc", prompt: "Which word sends the verb to the end?", options: ["deshalb", "obwohl", "und", "aber"], answer: 1, explain: "obwohl → verb to the end." },
          { type: "mc", prompt: "Which sentence is correct?", options: ["Es regnete, deshalb ich blieb zu Hause.", "Es regnete, deshalb blieb ich zu Hause.", "Es regnete deshalb, ich blieb zu Hause.", "Deshalb es regnete, blieb ich zu Hause."], answer: 1, explain: "deshalb = position 0, verb in position 2." },
          { type: "fill", prompt: "Verb to the end: Bevor du _____, schließe die Tür. (gehen)", answer: "gehst", alts: [], explain: "bevor → verb to the end: gehst." },
          { type: "mc", prompt: "„während” sends the verb…", options: ["to position 2", "to the end", "to the start", "away"], answer: 1, explain: "während → subordinate clause, verb to the end." },
        ],
        quiz: [
          { type: "mc", prompt: "Which conjunction keeps the normal word order?", options: ["weil", "obwohl", "denn", "bevor"], answer: 2, explain: "denn, aber, und, sondern → normal word order." },
          { type: "fill", prompt: "Verb to the end: Nachdem er _____, ging er schlafen. (essen)", answer: "gegessen hatte", alts: ["gegessen hat", "aß"], explain: "Nachdem → pluperfect: nachdem er gegessen hatte." },
          { type: "mc", prompt: "„Ich war müde, … ging ich schlafen.” Which word?", options: ["dass", "weil", "deshalb", "obwohl"], answer: 2, explain: "deshalb = therefore." },
          { type: "fill", prompt: "Verb to the end: Obwohl es spät _____, arbeitete sie weiter. (sein)", answer: "war", alts: [], explain: "obwohl → verb to the end: war." },
        ],
      },
      {
        id: "passiv", title: "The Passive Voice", topic: "wird + Partizip II",
        vocab: [
          { de: "werden", en: "to become / will", ex: "Das Haus wird gebaut. — The house is being built." },
          { de: "gebaut", en: "built", ex: "Das Haus wird gebaut. — The house is being built." },
          { de: "verkauft", en: "sold", ex: "Die Ware wird verkauft. — The goods are sold." },
          { de: "die Firma", en: "the company", ex: "Die Firma stellt Autos her. — The company produces cars." },
          { de: "das Produkt", en: "the product", ex: "Das Produkt wird hergestellt. — The product is produced." },
          { de: "herstellen", en: "to produce", ex: "Sie stellt Tablets her. — She produces tablets." },
        ],
        grammar: {
          title: "Passive — werden + Partizip II",
          intro: "In the passive voice, the action is the focus, not the doer.",
          table: [["tense", "passive"], ["present", "wird + Partizip II (wird gebaut)"], ["past", "wurde + Partizip II (wurde gebaut)"], ["perfect", "ist … geworden (ist gebaut worden)"]],
          note: "Active: Die Firma baut das Auto. → Passive: Das Auto wird (von der Firma) gebaut.",
        },
        dialogue: {
          title: "A news report",
          lines: [
            { s: "A", de: "Die neue Brücke wird nächste Woche eröffnet.", en: "The new bridge is being opened next week." },
            { s: "B", de: "Wurde sie rechtzeitig fertiggestellt?", en: "Was it finished on time?" },
            { s: "A", de: "Ja, aber sie wurde teuer. Millionen wurden investiert.", en: "Yes, but it was expensive. Millions were invested." },
            { s: "B", de: "Werden die Kosten noch geprüft?", en: "Will the costs still be reviewed?" },
            { s: "A", de: "Ja, ein Bericht wird vorbereitet.", en: "Yes, a report is being prepared." },
          ],
        },
        exercises: [
          { type: "fill", prompt: "Passive (present): Das Haus _____ gebaut. (werden)", answer: "wird", alts: [], explain: "Present passive: wird + participle." },
          { type: "fill", prompt: "Passive (past): Das Haus _____ gestern gebaut. (werden)", answer: "wurde", alts: [], explain: "Past passive: wurde." },
          { type: "mc", prompt: "Which form is passive?", options: ["Die Firma baut Autos.", "Autos werden gebaut.", "Die Firma baute Autos.", "Autos bauen."], answer: 1, explain: "werden + Partizip II = passive." },
          { type: "fill", prompt: "Passive (present): Der Brief _____ geschrieben. (werden)", answer: "wird", alts: [], explain: "wird geschrieben = passive." },
        ],
        quiz: [
          { type: "mc", prompt: "Active: „Sie verkauft das Buch.” — passive?", options: ["Das Buch wird verkauft.", "Das Buch verkauft wird.", "Das Buch wird verkauft werden.", "Das Buch verkauft."], answer: 0, explain: "Das Buch wird verkauft." },
          { type: "fill", prompt: "Passive (past): Die Tasche _____ gestern verkauft. (werden)", answer: "wurde", alts: [], explain: "wurde verkauft (past passive)." },
          { type: "mc", prompt: "What does the present passive need?", options: ["haben + participle", "sein + infinitive", "werden + Partizip II", "werden + infinitive"], answer: 2, explain: "werden + Partizip II." },
          { type: "fill", prompt: "Passive (present): Das Auto _____ repariert. (werden)", answer: "wird", alts: [], explain: "wird repariert." },
        ],
      },
      {
        id: "konjunktiv2", title: "Konjunktiv II", topic: "würde, könnte, hätte, wäre",
        vocab: [
          { de: "würde", en: "would", ex: "Ich würde kommen. — I would come." },
          { de: "könnte", en: "could", ex: "Ich könnte helfen. — I could help." },
          { de: "hätte", en: "would have", ex: "Ich hätte Zeit. — I would have time." },
          { de: "wäre", en: "would be", ex: "Ich wäre froh. — I would be glad." },
          { de: "sollte", en: "should", ex: "Du solltest üben. — You should practice." },
          { de: "der Rat", en: "the advice", ex: "Ein guter Rat. — A good piece of advice." },
        ],
        grammar: {
          title: "Konjunktiv II — politeness & unreal conditions",
          intro: "The Konjunktiv II expresses wishes, politeness and unreal (hypothetical) situations.",
          table: [["infinitive", "Konjunktiv II"], ["sein", "wäre"], ["haben", "hätte"], ["können", "könnte"], ["werden", "würde"]],
          note: "Polite request: „Könnten Sie mir helfen?” — hypothetical: „Wenn ich reich wäre, würde ich reisen.”",
        },
        dialogue: {
          title: "Giving advice",
          lines: [
            { s: "A", de: "Ich bin gestresst. Was sollte ich tun?", en: "I'm stressed. What should I do?" },
            { s: "B", de: "Du solltest mehr Pausen machen.", en: "You should take more breaks." },
            { s: "A", de: "Wenn ich Zeit hätte, würde ich das tun.", en: "If I had time, I would do that." },
            { s: "B", de: "Könntest du nicht früher anfangen?", en: "Couldn't you start earlier?" },
            { s: "A", de: "Das wäre eine gute Idee. Danke für den Rat!", en: "That would be a good idea. Thanks for the advice!" },
          ],
        },
        exercises: [
          { type: "fill", prompt: "Konjunktiv II: Wenn ich reich _____, würde ich reisen. (sein)", answer: "wäre", alts: [], explain: "sein → wäre." },
          { type: "fill", prompt: "Konjunktiv II: Ich _____ gern kommen. (werden)", answer: "würde", alts: [], explain: "werden → würde." },
          { type: "mc", prompt: "Polite request: „… Sie mir helfen?”", options: ["Können", "Konnten", "Könnten", "Werden"], answer: 2, explain: "Könnten Sie = polite." },
          { type: "fill", prompt: "Konjunktiv II: Ich _____ mehr Zeit. (haben)", answer: "hätte", alts: [], explain: "haben → hätte." },
        ],
        quiz: [
          { type: "fill", prompt: "Konjunktiv II: Du _____ öfter üben. (sollen)", answer: "solltest", alts: [], explain: "sollen → sollte; du solltest." },
          { type: "mc", prompt: "Which is Konjunktiv II of „können”?", options: ["kann", "konnte", "könnte", "könnten"], answer: 2, explain: "können → könnte (ich)." },
          { type: "fill", prompt: "Konjunktiv II: Wenn ich Zeit _____, würde ich kommen. (haben)", answer: "hätte", alts: [], explain: "haben → hätte." },
          { type: "mc", prompt: "What does Konjunktiv II express?", options: ["the past", "politeness & unreal conditions", "a command", "the future"], answer: 1, explain: "Konjunktiv II = politeness and unreal conditions." },
        ],
      },
    ],
  },
];
