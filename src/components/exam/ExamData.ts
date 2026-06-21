import { Question } from "../../types";

export interface ExamMode {
  type: 'BCS' | 'Bank' | 'Custom';
  role?: string;
}

export const bcsSyllabus = [
  {
    name: "১. বাংলা ভাষা ও সাহিত্য",
    marks: 35,
    color: "from-cyan-500 to-blue-500",
    topics: [
      { name: "প্রয়োগ-অপপ্রয়োগ, বানান ও বাক্য শুদ্ধি", bcsNo: "ভাষা (১৫ নম্বর): প্রয়োগ-অপপ্রয়োগ, বানান ও বাক্য শুদ্ধি", mastery: 82, trend: "+4%" },
      { name: "পরিভাষা, সমার্থক ও বিপরীতার্থক শব্দ", bcsNo: "ভাষা (১৫ নম্বর): পরিভাষা, সমার্থক ও বিপরীতার্থক শব্দ", mastery: 75, trend: "+2%" },
      { name: "ধ্বনি, বর্ণ ও শব্দ", bcsNo: "ভাষা (১৫ নম্বর): ধ্বনি, বর্ণ, শব্দ", mastery: 80, trend: "+3%" },
      { name: "পদ ও বাক্য", bcsNo: "ভাষা (১৫ নম্বর): পদ, বাক্য", mastery: 78, trend: "+5%" },
      { name: "প্রত্যয়, সন্ধি ও সমাস", bcsNo: "ভাষা (১৫ নম্বর): প্রত্যয়, সন্ধি, সমাস", mastery: 85, trend: "+1%" },
      { name: "ক. প্রাচীন ও মধ্যযুগ (সাহিত্য)", bcsNo: "সাহিত্য (২০ নম্বর): চর্যাপদ, মঙ্গলকাব্য, মধ্যযুগের ধারা", mastery: 64, trend: "-2%" },
      { name: "খ. আধুনিক যুগ (১৮০০-বর্তমান পর্যন্ত) (সাহিত্য)", bcsNo: "সাহিত্য (২০ নম্বর): ফোর্ট উইলিয়াম কলেজ, রবীন্দ্র-নজরুল যুগ ও আধুনিকতা", mastery: 72, trend: "+3%" }
    ]
  },
  {
    name: "২. English Language & Literature",
    marks: 35,
    color: "from-indigo-600 to-cyan-500",
    topics: [
      { name: "A. Parts of Speech: Noun & Pronoun", bcsNo: "Language (20 Marks): Nouns, Pronouns, Adjectives", mastery: 79, trend: "+2%" },
      { name: "A. Parts of Speech: The Verb & Modals", bcsNo: "Language (20 Marks): Verbs, Gerund, Participle, Modals", mastery: 71, trend: "+6%" },
      { name: "A. Parts of Speech: Adjective, Adverb, Preposition & Conjunction", bcsNo: "Language (20 Marks): Adverbs, Prepositions, Conjunctions", mastery: 83, trend: "+4%" },
      { name: "B. Idioms & Phrases", bcsNo: "Language (20 Marks): Idiomatic expressions, phrases and clauses", mastery: 65, trend: "-1%" },
      { name: "C. Clauses", bcsNo: "Language (20 Marks): Kinds of Clauses, structure and identifiers", mastery: 55, trend: "+5%" },
      { name: "D. Corrections", bcsNo: "Language (20 Marks): Subject-Verb Agreement, Pronoun references, consistency", mastery: 48, trend: "-3%" },
      { name: "E. Sentences & Transformations", bcsNo: "Language (20 Marks): Voice change, Simple/Complex/Compound transformations", mastery: 60, trend: "+2%" },
      { name: "F. Words: Meanings, Synonyms & Antonyms", bcsNo: "Language (20 Marks): Synonyms, Antonyms, analogical reasoning", mastery: 40, trend: "-6%" },
      { name: "F. Words: Spellings & Formations", bcsNo: "Language (20 Marks): Spelling corrections, prefix, suffix formations", mastery: 72, trend: "+3%" },
      { name: "G. Composition", bcsNo: "Language (20 Marks): Paragraphs, letter writing structures and formats", mastery: 90, trend: "+1%" },
      { name: "H. English Literature", bcsNo: "Literature (15 Marks): Elizabethan, Romantic, Victorian, Modern periods and quotes", mastery: 52, trend: "+2%" }
    ]
  },
  {
    name: "৩. বাংলাদেশ বিষয়াবলি",
    marks: 30,
    color: "from-emerald-600 to-teal-500",
    topics: [
      { name: "১. বাংলাদেশের জাতীয় বিষয়াবলি", bcsNo: "প্রাচীন বাংলার ইতিহাস, ভাষা আন্দোলন, ১৯৭১ সালের স্বাধীনতা যুদ্ধ", mastery: 88, trend: "+2%" },
      { name: "২. বাংলাদেশের কৃষিজ সম্পদ", bcsNo: "শস্য উৎপাদন, মৎস্য, গবাদিপশু, বনায়ন ও খনিজ সম্পদ", mastery: 70, trend: "+1%" },
      { name: "৩. বাংলাদেশের জনসংখ্যা, আদমশুমারি, जाति, গোষ্ঠী ও উপজাতি", bcsNo: "জনসংখ্যা বৈশিষ্ট্য, জাতিগোষ্ঠী ও আদিবাসীদের সংস্কৃতি", mastery: 75, trend: "+0%" },
      { name: "৪. বাংলাদেশের অর্থনীতি", bcsNo: "উন্নয়ন পরিকল্পনা, বাজেট, জিডিপি ও প্রবৃদ্ধি", mastery: 63, trend: "+4%" },
      { name: "৫. বাংলাদেশের শিল্প ও বাণিজ্য", bcsNo: "রপ্তানি বাণিজ্য, আমদানি খাত, ব্যাংক ও বীমা শিল্প", mastery: 68, trend: "+2%" },
      { name: "৬. বাংলাদেশের সংবিধান", bcsNo: "সংবিধানের ইতিহাস, অনুচ্ছেদ, সংশোধন ও মূল নীতিসমূহ", mastery: 80, trend: "+3%" },
      { name: "৭. বাংলাদেশের রাজনৈতিক ব্যবস্থা", bcsNo: "রাজনৈতিক দলসমূহ, নির্বাচন ব্যবস্থা ও সুশীল সমাজ", mastery: 72, trend: "+0%" },
      { name: "৮. বাংলাদেশের সরকার ব্যবস্থা", bcsNo: "আইনসভা, বিচার বিভাগ ও শাসন ব্যবস্থার কাঠামো", mastery: 76, trend: "+1%" },
      { name: "৯. বাংলাদেশের জাতীয় অর্জন, বিশিষ্ট ব্যক্তিত্ব ও গুরুত্বপূর্ণ প্রতিষ্ঠান", bcsNo: "জাতীয় সম্মাননা, বিশিষ্ট ব্যক্তিত্বদের অবদান ও প্রতিষ্ঠানসমূহ", mastery: 82, trend: "+5%" }
    ]
  },
  {
    name: "৪. আন্তর্জাতিক বিষয়াবলি",
    marks: 20,
    color: "from-blue-600 to-sky-500",
    topics: [
      { name: "১. বৈশ্বিক ইতিহাস, আঞ্চলিক ও আন্তর্জাতিক ব্যবস্থা, ভূ-রাজনীতি", bcsNo: "বিশ্বের ইতিহাস, ভূ-রাজনীতি, বিভিন্ন দেশের মধ্যকার সীমান্ত ও রাজনৈতিক প্রভাব", mastery: 65, trend: "+4%" },
      { name: "২. আন্তর্জাতিক নিরাপত্তা ও আন্তরাষ্ট্রীয় ক্ষমতা সম্পর্ক", bcsNo: "সামরিক জোট, প্রতিরক্ষা চুক্তি ও আন্তর্জাতিক নিরাপত্তা সূচক", mastery: 58, trend: "-2%" },
      { name: "৩. বিশ্বের সাম্প্রতিক ও চলমান ঘটনাপ্রবাহ", bcsNo: "সাম্প্রতিক সংঘাত, বৈশ্বিক আলোচনা ও চলমান উন্নয়ন সূচক", mastery: 72, trend: "+8%" },
      { name: "৪. আন্তর্জাতিক পরিবেশগত ইস্যু ও কূটনীতি", bcsNo: "জলবায়ু চুক্তি, পরিবেশ সম্মেলন ও কার্বন নির্গমন নীতি", mastery: 81, trend: "+3%" },
      { name: "৫. আন্তর্জাতিক संगठनসমূহ এবং বৈশ্বিক অর্থনৈতিক প্রতিষ্ঠানাদি", bcsNo: "জাতিসংঘ, বিশ্বব্যাংক, আইএমএফ, ডব্লিউটিও ও আঞ্চলিক জোট", mastery: 78, trend: "+2%" }
    ]
  },
  {
    name: "৫. ভূগোল, পরিবেশ ও দুর্যোগ ব্যবস্থাপনা",
    marks: 10,
    color: "from-amber-600 to-yellow-500",
    topics: [
      { name: "বাংলাদেশ ও অঞ্চলের ভৌগোলিক অবস্থান", bcsNo: "ভৌগোলিক সীমারেখা, ভূপ্রকৃতি ও জলবায়ুগত বৈশিষ্ট্য", mastery: 85, trend: "+1%" },
      { name: "পরিবেশ বিপর্যয় ও জলবায়ু পরিবর্তন", bcsNo: "পরিবেশ দূষণ, বৈশ্বিক উষ্ণতা ও গ্রিনহাউস প্রভাব", mastery: 79, trend: "+5%" },
      { name: "প্রাকৃতিক দুর্যোগ ও দুর্যোগ ব্যবস্থাপনা", bcsNo: "ঝড়, বন্যা, সুনামি, ভূমিকম্প ও সরকারের দুর্যোগ ব্যবস্থাপনা রোডম্যাপ", mastery: 70, trend: "+2%" }
    ]
  },
  {
    name: "৬. সাধারণ বিজ্ঞান",
    marks: 15,
    color: "from-purple-650 to-indigo-500",
    topics: [
      { name: "ভৌত বিজ্ঞান", bcsNo: "পদার্থের অবস্থা, পরমাণু, বল, আলো ও শব্দ বিজ্ঞান", mastery: 78, trend: "+4%" },
      { name: "জীব বিজ্ঞান", bcsNo: "কোষবিদ্যা, জেনেটিক্স, মানবদেহ কাঠামো ও পুষ্টিবিজ্ঞান", mastery: 84, trend: "+2%" },
      { name: "আধুনিক বিজ্ঞান", bcsNo: "মহাবিশ্ব সৃষ্টি, ব্ল্যাক হোল, বিগ ব্যাং ও কসমিক রশ্মি", mastery: 62, trend: "-3%" }
    ]
  },
  {
    name: "৭. কম্পিউটার ও তথ্যপ্রযুক্তি",
    marks: 15,
    color: "from-pink-500 to-rose-500",
    topics: [
      { name: "কম্পিউটার (অঙ্গসংগঠন ও পেরিফেরালস)", bcsNo: "হার্ডওয়্যার, মেমোরি, প্রসেসর ও মাদারবোর্ড কাঠামো", mastery: 74, trend: "+5%" },
      { name: "তথ্যপ্রযুক্তি (নেটওয়ার্ক ও যোগাযোগ)", bcsNo: "LAN/WAN নেটওয়ার্ক, ইন্টারনেট প্রটোকল ও ডাটা কমিউনিকেশন", mastery: 80, trend: "+7%" },
      { name: "তথ্যপ্রযুক্তি (আধুনিক সেবা ও সাইবারক্রাইম)", bcsNo: "ক্লাউড কম্পিউটিং, কৃত্রিম বুদ্ধিমত্তা, সাইবার অপরাধ ও নিরাপত্তা ব্যবস্থা", mastery: 68, trend: "+3%" }
    ]
  },
  {
    name: "৮. গাণিতিক যুক্তি",
    marks: 15,
    color: "from-orange-500 to-amber-500",
    topics: [
      { name: "১. পাটিগণিত", bcsNo: "বাস্তব সংখ্যা, লসাগু-গসাগু, শতকরা, লাভ-ক্ষতি, সরল ও যৌগিক মুনাফা", mastery: 92, trend: "+9%" },
      { name: "২. বীজগণিত", bcsNo: "বীজগাণিতিক সূত্রাবলি, বহুপদী উৎপাদক, সমীকরণ ও অসমতা", mastery: 85, trend: "+4%" },
      { name: "৩. সূচক, লগারিদম ও ধারা", bcsNo: "সূচক, লগারিদম, সমান্তর ও গুণোত্তর ধারা", mastery: 76, trend: "+2%" },
      { name: "৪. জ্যামিতি ও পিথাগোরাস", bcsNo: "রেখা, কোণ, ত্রিভুজ, পিথাগোরাসের উপপাদ্য ও পরিমিতি", mastery: 64, trend: "-1%" },
      { name: "৫. সেট, বিন্যাস ও সমাবেশ", bcsNo: "সেট তত্ত্ব, বিন্যাস, সমাবেশ, পরিসংখ্যান ও সম্ভাব্যতা", mastery: 70, trend: "+5%" }
    ]
  },
  {
    name: "৯. মানসিক দক্ষতা",
    marks: 15,
    color: "from-violet-500 to-purple-550",
    topics: [
      { name: "১. ভাষাগত যৌক্তিক বিচার (Verbal)", bcsNo: "ভাষাগত সম্পর্ক, কোডিং ও রক্তের সম্পর্ক", mastery: 80, trend: "+3%" },
      { name: "২. সমস্যা সমাধান (Problem Solving)", bcsNo: "দিক নির্ণয়, দিন-তারিখ হিসাব ও গাণিতিক ধাঁধা", mastery: 75, trend: "+1%" },
      { name: "৩. বানান ও ভাষা (Spelling)", bcsNo: "বানান শুদ্ধি ও বিপরীতার্থক জোড়ের সামঞ্জস্য", mastery: 86, trend: "+4%" },
      { name: "৪. যান্ত্রিক দক্ষতা (Mechanical)", bcsNo: "গিয়ার, কপি ও যান্ত্রিক চালিকাশক্তি নিয়ম", mastery: 60, trend: "-2%" },
      { name: "৫. স্থানাঙ্ক সম্পর্ক (Space Relation)", bcsNo: "আয়নার প্রতিফলন, জ্যামিতিক রূপান্তর ও প্যাটার্ন", mastery: 68, trend: "+2%" },
      { name: "৬. সংখ্যাগত ক্ষমতা (Numerical)", bcsNo: "গাণিতিক সিরিজ ও সংখ্যার ধারা পূরণ", mastery: 82, trend: "+5%" }
    ]
  },
  {
    name: "১০. নৈতিকতা, মূল্যবোধ ও সুশাসন",
    marks: 10,
    color: "from-teal-500 to-emerald-500",
    topics: [
      { name: "মূল্যবোধ ও সুশাসনের সংজ্ঞায়ন ও সম্পর্ক", bcsNo: "Definition, elements, relation between Values and Good Governance", mastery: 72, trend: "+1%" },
      { name: "মূল্যবোধের গুরুত্ব ও সুশাসন প্রতিষ্ঠা", bcsNo: "Importance of Values and Good Governance in the life of an individual as a citizen as well as in the making of society and national ideals; How the element of Good Governance and Values can be established in society", mastery: 88, trend: "+0%" },
      { name: "জাতীয় উন্নয়ন ও অনুপস্থিতির মাশুল", bcsNo: "Impact of Values and Good Governance in national development; The benefit of Values and Good Governance and the cost society pays adversely in their absence", mastery: 83, trend: "+3%" }
    ]
  }
];

export const bankSyllabus = [
  {
    name: "১. Bangla Language & Literature",
    weight: 20,
    color: "from-emerald-500 to-teal-500",
    topics: [
      { name: "Bangla Grammar (ব্যাকরণ)", match: "প্রয়োগ-অপপ্রয়োগ, শুদ্ধিশোধন, সন্ধি, সমাস, কারক", mastery: 75, trend: "+5%" },
      { name: "Bangla Literature History", match: "প্রাচীন, মধ্য ও আধুনিক যুগ, কবি ও রচয়িতারা", mastery: 55, trend: "+2%" }
    ]
  },
  {
    name: "২. English Language & Literature",
    weight: 25,
    color: "from-indigo-600 to-cyan-500",
    topics: [
      { name: "Quantitative Grammar & Idioms", match: "Tenses, Voice change, Preposition, Parts of speech", mastery: 68, trend: "+8%" },
      { name: "Vocabulary & Analogy", match: "Synonyms, Antonyms, Analogies, Sentence completions", mastery: 42, trend: "-4%" },
      { name: "English Literature", match: "Famous writers, periods, quotes and literary devices", mastery: 50, trend: "+1%" }
    ]
  },
  {
    name: "৩. Mathematics & Quantitative Aptitude",
    weight: 30,
    color: "from-amber-500 to-orange-500",
    topics: [
      { name: "Arithmetic Numerical Abilities", match: "Simple & compound interest, percentage, profit-loss, average", mastery: 45, trend: "-5%" },
      { name: "Algebraic & Word Problems", match: "Equations, ratio-proportion, work-time, speed-distance-trains, pipes", mastery: 38, trend: "+10%" },
      { name: "Geometry & Coordinate Maths", match: "Triangles, circles, quadrilaterals, coordinate geometry & lines", mastery: 30, trend: "-2%" },
      { name: "Data Interpretation (DI)", match: "Tables, pie charts, bar charts, line graphs and caselets", mastery: 52, trend: "+3%" },
      { name: "Set Theory & Probability", match: "Venn diagram, sets, combinations, permutations and basic probability", mastery: 48, trend: "+4%" },
      { name: "Mensuration & Numbers", match: "Area, volume, LCM, HCF, fractions, indices, log and number series", mastery: 55, trend: "+12%" }
    ]
  },
  {
    name: "৪. General Knowledge (GK)",
    weight: 15,
    color: "from-blue-600 to-sky-500",
    topics: [
      { name: "Bangladesh Affairs (বাংলাদেশ বিষয়)", match: "History, Central Bank, Currency, 5-year plans & state structure", mastery: 84, trend: "+2%" },
      { name: "International Banking & Trade", match: "IMF, WB, global trade, geopolitics, current headlines & agreements", mastery: 60, trend: "+7%" },
      { name: "Monetary Policy & FinTech", match: "Regulator acts, green banking, monetary instruments and mobile banking", mastery: 72, trend: "+6%" },
      { name: "Global Geopolitics & Organizations", match: "United Nations, treaties, regional groupings, summits and international awards", mastery: 63, trend: "+5%" },
      { name: "Environmental Issues & Sports", match: "Climate change, global summits, sports events and international history", mastery: 77, trend: "+2%" }
    ]
  },
  {
    name: "৫. Computer & ICT",
    weight: 10,
    color: "from-purple-600 to-indigo-500",
    topics: [
      { name: "Computer Hardware & OS Architecture", match: "Memory, Peripherals, Registers, Processing speeds, Bus structure", mastery: 70, trend: "+4%" },
      { name: "Banking Technology & Networking", match: "LAN, WAN, SWIFT, cyber security & threat detection", mastery: 82, trend: "+11%" },
      { name: "Database & Information Systems", match: "SQL querying, DBMS structures, computer languages and soft engineering", mastery: 64, trend: "+5%" },
      { name: "Internet, Cyber Security & E-Commerce", match: "Email protocols, routing, firewalls, cyber crimes and secure transactions", mastery: 79, trend: "+8%" }
    ]
  }
];

export function mapToCorpusKey(topicName: string): string {
  const norm = (topicName || "").toLowerCase();
  if (norm.includes("bangla") || norm.includes("বাংলা")) return "bangla";
  if (norm.includes("english") || norm.includes("ইংরেজি")) return "english";
  if (norm.includes("bangladesh") || norm.includes("বাংলাদেশ")) return "bangladesh";
  if (norm.includes("international") || norm.includes("আন্তর্জাতিক")) return "international";
  if (norm.includes("science") || norm.includes("বিজ্ঞান")) return "science";
  if (norm.includes("computer") || norm.includes("কম্পিউটার")) return "computer";
  if (norm.includes("mathematics") || norm.includes("গাণিতিক")) return "math";
  if (norm.includes("mental") || norm.includes("মানসিক")) return "mental";
  return "bangladesh";
}

export function generateProceduralQuestions(allocations: { subject: string; topic: string; count: number }[], difficulty: string = "Medium"): any[] {
  const results: any[] = [];
  let seedOffset = 0;
  
  for (const alloc of allocations) {
    const count = parseInt(String(alloc.count), 10) || 0;
    if (count <= 0) continue;
    
    const corpusKey = mapToCorpusKey(alloc.subject);
    const poolKey = mapToCorpusKey(alloc.subject);
    const pools: Record<string, any[]> = {
      bangla: [...questionPool.filter(q => q.subject.includes("১."))],
      english: [...questionPool.filter(q => q.subject.includes("২."))],
      bangladesh: [...questionPool.filter(q => q.subject.includes("৩.") || q.subject.includes("BPSC"))],
      international: [...questionPool.filter(q => q.subject.includes("৪.") || q.subject.includes("International"))],
      science: [...questionPool.filter(q => q.subject.includes("৫.") || q.subject.includes("Science"))],
      computer: [...questionPool.filter(q => q.subject.includes("৭.") || q.subject.includes("Computer"))],
      math: [...questionPool.filter(q => q.subject.includes("৮.") || q.subject.includes("Math"))],
      mental: [...questionPool.filter(q => q.subject.includes("৯.") || q.subject.includes("Mental"))],
    };
    
    const pool = pools[poolKey] || questionPool;
    
    for (let i = 0; i < count; i++) {
      const orig = pool[(i + seedOffset) % pool.length] || questionPool[(i + seedOffset) % questionPool.length];
      const opt = [...orig.options];
      const correctVal = opt[orig.correctIndex];
      
      const shuffleSeed = (i + seedOffset * 3) % opt.length;
      for (let j = opt.length - 1; j > 0; j--) {
        const k = (shuffleSeed * 7 + j * 13) % opt.length;
        [opt[j], opt[k]] = [opt[k], opt[j]];
      }
      
      results.push({
        id: `procedural-${Math.random().toString(36).substring(7)}-${i}`,
        text: orig.text,
        options: opt,
        correctIndex: opt.indexOf(correctVal),
        subject: alloc.subject,
        topic: alloc.topic || "Syllabus Focus",
        difficulty: difficulty,
        explanations: orig.explanations
      });
    }
    seedOffset += count;
  }
  
  return results;
}
export function getSubtopicsForTopic(topicName: string): string[] {
  const mapping: { [key: string]: string[] } = {
    // Bangla
    "প্রয়োগ-অপপ্রয়োগ, বানান ও বাক্য শুদ্ধি": ["বানান শুদ্ধি (Spellings)", "বাক্য শুদ্ধি (Syntax)", "প্রয়োগ-অপপ্রয়োগ (Usage)"],
    "পরিভাষা, সমার্থক ও বিপরীতার্থক শব্দ": ["পরিভাষা (Terminology)", "সমার্থক শব্দ (Synonyms)", "বিপরীতার্থক শব্দ (Antonyms)"],
    "ধ্বনি, বর্ণ ও শব্দ": ["ধ্বনি ও বর্ণ (Phonetics)", "শব্দের প্রকারভেদ", "ধ্বনি পরিবর্তন (Sound Change)"],
    "পদ ও বাক্য": ["পদের শ্রেণিবিভাগ", "বাক্যের গঠন", "কারক ও বিভক্তি (Cases)"],
    "প্রত্যয়, সন্ধি ও সমাস": ["সন্ধি (Sandhi)", "সমাস (Compound Words)", "প্রত্যয় (Prefix/Suffix)"],
    "ক. প্রাচীন ও মধ্যযুগ (সাহিত্য)": ["চর্যাপদ (Charyapada)", "মঙ্গলকাব্য (Mangalkavya)", "বৈষ্ণব পদাবলি", "মোর্শিয়া সাহিত্য"],
    "খ. আধুনিক যুগ (১৮০০-বর্তমান পর্যন্ত) (সাহিত্য)": ["রবীন্দ্র-নজরুল সাহিত্য", "ভাষা আন্দোলন ভিত্তিক সাহিত্য", "মুক্তিযুদ্ধ ভিত্তিক সাহিত্য", "সার্থক ইতিহাস ও উপন্যাস"],

    // English
    "A. Parts of Speech: Noun & Pronoun": ["Noun & Determiners", "Pronoun Classifications", "Gender & Number"],
    "A. Parts of Speech: The Verb & Modals": ["Finite & Non-finite", "Linking & Phrasal Verbs", "Modals & Auxiliaries"],
    "A. Parts of Speech: Adjective, Adverb, Preposition & Conjunction": ["Adjective Degrees", "Adverbs of Frequency", "Appropriate Prepositions"],
    "B. Idioms & Phrases": ["Idiomatic Expressions", "Kinds of Phrases", "Verbal Phrases"],
    "C. Clauses": ["Principal Clause", "Subordinate Noun Clause", "Adjective and Adverbial Clauses"],
    "D. Corrections": ["Subject-Verb Agreement", "Tense Consistency", "Pronoun Reference Error"],
    "E. Sentences & Transformations": ["Simple, Compound, Complex", "Active & Passive Voice", "Degree Transformations"],
    "F. Words: Meanings, Synonyms & Antonyms": ["Synonyms & Contextual Meaning", "Antonyms", "Analogical Words"],
    "F. Words: Spellings & Formations": ["Spelling Corrections", "Prefixes & Suffixes", "Inflections"],
    "G. Composition": ["Letter Writing formats", "Paragraph Composition structures"],
    "H. English Literature": ["Elizabethan Period", "Romantic Period", "Victorian & Modernist Writers", "Famous Quotations"],

    // Bangladesh affairs
    "১. বাংলাদেশের জাতীয় বিষয়াবলি": ["প্রাচীন বাংলার ইতিহাস", "ভাষা আন্দোলন ১৯৫২", "মুক্তিযুদ্ধ ১৯৭১ ও পটভূমি"],
    "২. বাংলাদেশের কৃষিজ সম্পদ": ["শস্য বহুমুখীকরণ", "মৎস্য ও গবাদিপশু পালন", "বনজ ও খনিজ সম্পদ"],
    "৩. বাংলাদেশের জনসংখ্যা, আদমশুমারি, জাতি, গোষ্ঠী ও উপজাতি": ["জনসংখ্যা কাঠামো", "আদমশুমারি ও গৃহগণনা", "উপজাতিদের ভৌগোলিক অবস্থান"],
    "৪. বাংলাদেশের অর্থনীতি": ["পঞ্চবার্ষিকী পরিকল্পনা", "জাতীয় বাজেট ও জিডিপি", "দারিদ্র্য বিমোচন ও রেমিট্যান্স"],
    "৫. বাংলাদেশের শিল্প ও বাণিজ্য": ["পোশাক খাত (RMG)", "আমদানি ও রপ্তানি পণ্য", "ব্যাংক ও বীমা সেক্টর"],
    "৬. বাংলাদেশের সংবিধান": ["প্রস্তাবনা ও মূলনীতি", "মৌলিক অধিকারসমূহ", "গুরুত্বপূর্ণ সংবিধান সংশোধনী"],
    "৭. বাংলাদেশের রাজনৈতিক ব্যবস্থা": ["political parties role", "civil society pressure groups"],
    "৮. বাংলাদেশের সরকার ব্যবস্থা": ["আইন, शासन ও বিচার বিভাগ", "জাতীয় ও স্থানীয় প্রশাসনিক কাঠামো"],
    "৯. বাংলাদেশের জাতীয় অর্জন, বিশিষ্ট ব্যক্তিত্ব ও গুরুত্বপূর্ণ প্রতিষ্ঠান": ["জাতীয় অর্জন ও দিবস", "বিশিষ্ট ব্যক্তিত্ব", "খেলাধুলা ও ল্যান্ডমার্ক"],

    // International affairs
    "১. বৈশ্বিক ইতিহাস, আঞ্চলিক ও আন্তর্জাতিক ব্যবস্থা, ভূ-রাজনীতি": ["বৈশ্বিক ইতিহাস ও যুদ্ধ", "আঞ্চলিক ফোরাম", "ভূ-রাজনীতি ও সমীকরণ"],
    "২. আন্তর্জাতিক নিরাপত্তা ও আন্তরাষ্ট্রীয় ক্ষমতা সম্পর্ক": ["আন্তরাষ্ট্রীয় চুক্তি ও নিরাপত্তা", "সামরিক জোট ও সক্ষমতা"],
    "৩. বিশ্বের সাম্প্রতিক ও চলমান ঘটনাপ্রবাহ": ["চলমান বৈশ্বিক সংঘাত", "সাম্প্রতিক ভূ-রাজনৈতিক সম্মেলন"],
    "৪. আন্তর্জাতিক পরিবেশগত ইস্যু ও কূটনীতি": ["COP ও পরিবেশ চুক্তি", "গ্রিনহাউস গ্যাস ও তাপমাত্রা"],
    "৫. আন্তর্জাতিক সংগঠনসমূহ এবং বৈশ্বিক অর্থনৈতিক প্রতিষ্ঠানাদি": ["জাতিসংঘ ও সাব-সংস্থা (UN)", "বিশ্বব্যাংক ও আইএমএফ (WB/IMF)", "ডব্লিউটিও (WTO)"],

    // Science
    "ভৌত বিজ্ঞান": ["পদার্থের অবস্থা ও এটম", "কার্বন ও পলিমার", "এসিড, ক্ষার ও লবণ"],
    "জীব বিজ্ঞান": ["উদ্ভিদ ও প্রাণী টিস্যু", "জেনেটিক্স ও ডিএনএ", "জীববৈচিত্র্য ও ভাইরাস"],
    "আধুনিক বিজ্ঞান": ["পৃথিবী ও মহাবিশ্ব সৃষ্টি", "ব্লাক হোল ও কসমিক রে", "হিগস বোসন কণা"],

    // ICT
    "কম্পিউটার (অঙ্গসংগঠন ও পেরিফেরালস)": ["কম্পিউটার হার্ডওয়্যার", "মেমোরি ও বাস কাঠামো", "সিস্টেম ও ডাটাবেজ"],
    "তথ্যপ্রযুক্তি (নেটওয়ার্ক ও যোগাযোগ)": ["LAN/WAN নেটওয়ার্ক প্রটোকল", "মোবাইল ডাটা প্রযুক্তি", "ই-কমার্সের ভিত্তি"],
    "তথ্যপ্রযুক্তি (আধুনিক সেবা ও সাইবারক্রাইম)": ["ক্লাউড কম্পিউটিং", "রোবটিক্স ও এআই", "সাইবার ক্রাইম ও সাইবার নিরাপত্তা"],

    // Math
    "১. পাটিগণিত": ["বাস্তব সংখ্যা, লসাগু-গসাগু", "শতকরা ও লাভ-ক্ষতি", "সরল ও যৌগিক মুনাফা"],
    "২. বীজগণিত": ["বীজগাণিতিক সূত্রাবলি", "বহুপদী উৎপাদক", "সমীকরণ ও অসমতা"],
    "৩. সূচক, লগারিদম ও ধারা": ["সূচক ও লগারিদম", "সমান্তর ও গুণোত্তর ধারা"],
    "৪. জ্যামিতি ও পিথাগোরাস": ["কোণ ও ত্রিভুজ সংক্রান্ত", "পিথাগোরাসের উপপাদ্য", "ক্ষেত্রফল ও পরিমিতি"],
    "৫. সেট, বিন্যাস ও সমাবেশ": ["সেট ও ভেনচিত্র", "বিন্যাস ও সমাবেশ", "পরিসংখ্যান ও সম্ভাব্যতা"],

    // Mental
    "১. মানসিক দক্ষতা": ["মানসিক ক্ষমতা গাণিতিক ধাঁধা"],
    "১. ভাষাগত যৌক্তিক বিচার (Verbal)": ["ভাষাগত যৌক্তিক কোডিং", "রক্তের সম্পর্কীয় সমস্যা"],
    "২. समस्या সমাধান (Problem Solving)": ["সমস্যা সমাধান সমাধান", "দিক ও দূরত্ব সমস্যা"],
    "৩. বানান ও ভাষা (Spelling)": ["বানান শুদ্ধি যাচাই", "ভাষাগত সামঞ্জস্যপূর্ণ জোড়"],
    "৪. যান্ত্রিক দক্ষতা (Mechanical)": ["যান্ত্রিক পার্টস ও গিয়ার", "পদার্থের সাধারণ যান্ত্রিক নিয়ম"],
    "৫. স্থানাঙ্ক সম্পর্ক (Space Relation)": ["স্থানাঙ্ক জ্যামিতি বেসিক", "আয়নায় প্রতিবিম্ব প্রতিচ্ছবি"],
    "৬. সংখ্যাগত ক্ষমতা (Numerical)": ["সিরিজ ও ধারা পূরণ", "সংখ্যার গণনামূলক ধাঁধা"],

    // Ethics
    "মূল্যবোধ ও সুশাসনের সংজ্ঞায়ন ও সম্পর্ক": ["মূল্যবোধ ও সুশাসন সংজ্ঞা", "মূল্যবোধের উপাদান"],
    "মূল্যবোধের গুরুত্ব ও সুশাসন প্রতিষ্ঠা": ["নাগরিক মূল্যবোধ", "সুশাসনের স্তম্ভসমূহ প্রতিষ্ঠা"],
    "জাতীয় উন্নয়ন ও অনুপস্থিতির মাশুল": ["জাতীয় উন্নয়নে সুশাসন প্রভাব", "দুর্নীতি ও অব্যবস্থাপনার মূল্য"],
  };
  
  return mapping[topicName] || ["সাধারণ প্রশ্ন (General Concepts)", "ব্যাখ্যাসূত্র বিশ্লেষণ (Analytical Concepts)"];
}

export const questionPool: Question[] = [
  {
    id: "bcs-bn-1",
    text: "কোনটি বাংলা ভাষায় রচিত প্রথম প্রামাণ্য ব্যাকরণ গ্রন্থ এবং এটি কত সালে প্রকাশিত হয়েছিল?",
    options: [
      "A Grammar of the Bengali Language, ১৭৭৮",
      "Bengali Grammar, ১৮০১",
      "ব্যাকরণ কৌমুদী, ১৮৫৩",
      "গৌড়ীয় ব্যাকরণ, ১৮৩৩"
    ],
    correctIndex: 0,
    subject: "১. বাংলা ভাষা ও সাহিত্য",
    topic: "প্রয়োগ-অপপ্রয়োগ ও বানান শুদ্ধি",
    difficulty: "Medium",
    explanations: {
      bn: "নাথানিয়েল ব্রাসি হালেদের রচিত 'A Grammar of the Bengali Language' বাংলা ভাষার প্রথম প্রামাণ্য ব্যাকরণ গ্রন্থ, যা ১৭৭৮ সালে ভারতের হুগলি থেকে প্রকাশিত হয়েছিল।",
      en: "Nathaniel Brassey Halhed's 'A Grammar of the Bengali Language' (1778) is the first standard grammar book on Bengali language.",
      wrongOptions: [
        "গৌড়ীয় ব্যাকরণ রামমোহন রায় কর্তৃক ১৮৩৩ সালে প্রকাশিত প্রথম বাংলা ভাষায় রচিত ব্যাকরণ গ্রন্থ।",
        "ব্যাকরণ কৌমুদী ঈশ্বরচন্দ্র বিদ্যাসাগর প্রণীত অত্যন্ত সমাদৃত ব্যাকরণ।"
      ]
    }
  },
  {
    id: "bcs-bn-2",
    text: "বাঙলা সাহিত্যের আদি নিদর্শন 'চর্যাপদ' নেপালের রাজদরবার থেকে হরপ্রসাদ শাস্ত্রী কর্তৃক কোন সালে আবিষ্কৃত হয়?",
    options: [
      "১৯০৭",
      "১৯১৬",
      "১৮৯৭",
      "১৯২১"
    ],
    correctIndex: 0,
    subject: "১. বাংলা ভাষা ও সাহিত্য",
    topic: "প্রাচীন ও মধ্যযুগ (সাহিত্য)",
    difficulty: "Easy",
    explanations: {
      bn: "চর্যাপদ নেপালের রাজদরবারের রয়েল লাইব্রেরি থেকে ১৯০৭ সালে মহামহোপাধ্যায় হরপ্রসাদ শাস্ত্রী কর্তৃক আবিষ্কৃত হয় এবং ১৯১৬ সালে বঙ্গীয় সাহিত্য পরিষদ থেকে প্রথম প্রকাশিত হয়।",
      en: "Charyapada was discovered from the Royal Palace library of Nepal by Haraprasad Shastri in 1907.",
      wrongOptions: [
        "১৯১৬ সালে চর্যাপদ প্রথম পুস্তক আকারে প্রকাশিত হয়।",
        "১৯২১ সালে ঢাকা বিশ্ববিদ্যালয় প্রতিষ্ঠিত হয়েছিল।"
      ]
    }
  },
  {
    id: "bcs-en-1",
    text: "Identify the correct clause in the brackets: The student [who completed the assignment first] received a special grade of recommendation from the faculty.",
    options: [
      "Adjective Clause",
      "Noun Clause",
      "Adverbial Clause",
      "Co-ordinate Clause"
    ],
    correctIndex: 0,
    subject: "২. English Language & Literature",
    topic: "Parts of Speech & Clauses",
    difficulty: "Medium",
    explanations: {
      bn: "যেহেতু 'who completed the assignment first' অংশটি তার পূর্বে অবস্থিত Noun 'The student' কে মডিফাই করছে বা তথ্য প্রদান করছে, তাই এটি একটি Adjective Clause।",
      en: "Since the bracketed clause describes the preceding noun 'The student', it functions as an Adjective Clause (or relative clause).",
      wrongOptions: [
        "Noun Clause বাক্যের Subject, Object বা Preposition এর Object হিসেবে বসে, মডিফায়ার নয়।",
        "Adverbial Clause সময়, স্থান, কারণ বা অনুমিতি নির্দেশ করে।"
      ]
    }
  },
  {
    id: "bcs-en-2",
    text: "Which of the following Elizabethan plays is celebrated as William Shakespeare's shortest tragedy?",
    options: [
      "Macbeth",
      "Hamlet",
      "Othello",
      "King Lear"
    ],
    correctIndex: 0,
    subject: "২. English Language & Literature",
    topic: "English Literature History",
    difficulty: "Medium",
    explanations: {
      bn: "উইলিয়াম শেক্সপিয়রের রচিত ট্র্যাজেডিগুলোর মধ্যে 'ম্যাকবেথ' (Macbeth) সবচেয়ে ছোট। পক্ষান্তরে 'হ্যামলেট' (Hamlet) সবচেয়ে দীর্ঘ ও জটিল ট্র্যাজেডি।",
      en: "Macbeth is the shortest tragedy of William Shakespeare, while Hamlet is the longest.",
      wrongOptions: [
        "হ্যামলেট হল শেক্সপিয়রের দীর্ঘতম নাটক ও ট্র্যাজেডি।",
        "কিং লিআর এবং ওথেলো অন্যান্য দীর্ঘ গুরুত্বপূর্ণ ট্র্যাজেডির উদাহরণ।"
      ]
    }
  },
  {
    id: "bcs-bd-1",
    text: "বাংলাদেশ পাবলিক সার্ভিস কমিশন (BPSC) সংবিধানের কত অনুচ্ছেদ অনুযায়ী রাষ্ট্রপতির আদেশক্রমে গঠিত একটি সংবিধিবদ্ধ প্রতিষ্ঠান?",
    options: [
      "অনুচ্ছেদ ১৩৭",
      "অনুচ্ছেদ ১৪০",
      "অনুচ্ছেদ ১৩৫",
      "অনুচ্ছেদ ১৪২"
    ],
    correctIndex: 0,
    subject: "৩. বাংলাদেশ বিষয়াবলি",
    topic: "বাংলাদেশের সংবিধান ও সংশোধন",
    difficulty: "Medium",
    explanations: {
      bn: "সংবিধানের ১৩৭ নং অনুচ্ছেদ অনুযায়ী রাষ্ট্রপতি আদেশক্রমে 'বাংলাদেশ সরকারি কর্ম কমিশন' প্রতিষ্ঠা করার ক্ষমতা লাভ করেন। BPSC নির্বাহী বিভাগের আধীনে একটি সংবিধিবদ্ধ স্বাধীন কমিশন।",
      en: "BPSC is established under Article 137 of the Constitution of the Peoples Republic of Bangladesh.",
      wrongOptions: [
        "১৪০ অনুচ্ছেদে সরকারি কর্ম কমিশনের বার্ষিক কাজের রিপোর্টের উল্লেখ রয়েছে।",
        "১৪২ অনুচ্ছেদে সংবিধান সংশোধন পরিবর্তনের আইনি পদ্ধতি ব্যাখ্যা করা হয়েছে।"
      ]
    }
  },
  {
    id: "bcs-bd-2",
    text: "বাংলাদেশ সংবিধানের কোন সংশোধনীকে 'প্রথম সংশোধনী' বা ফার্স্ট এমেন্ডমেন্ট হিসেবে বিবেচনা করা হয় এবং এটি কি সংশোধন করেছিল?",
    options: [
      "যুদ্ধাপরাধীদের বিচার নিশ্চিতকরণ, ১৯৭৩",
      "রাষ্ট্রধর্ম ঘোষণা, ১৯৮৮",
      "তত্ত্বাবধায়ক সরকার বাতিলকরণ, ২০১১",
      "ধর্মনিরপেক্ষতা পুনর্বহাল, ১৯৭৫"
    ],
    correctIndex: 0,
    subject: "৩. বাংলাদেশ বিষয়াবলি",
    topic: "বাংলাদেশের সংবিধান ও সংশোধন",
    difficulty: "Hard",
    explanations: {
      bn: "১৯৭৩ সালের জুলাই মাসে গৃহীত প্রথম সংশোধনীর মাধ্যমে যুদ্ধাপরাধীদের বিচারের আইনী গ্যারান্টি এবং তাদের বিচারের জন্য সামরিক ট্রাইব্যুনাল গঠনের পথ সুগম হয়।",
      en: "The First Amendment of Bangladesh Constitution was passed in 1973 to enable the prosecution and trial of war criminals for genocide and crimes against humanity.",
      wrongOptions: [
        "১৯৮৮ সালে ৮ম সংশোধনীর মাধ্যমে ইসলামকে রাষ্ট্রধর্ম ঘোষণা করা হয়েছিল।",
        "২০১১ সালে ১৫তম সংশোধনীর মাধ্যমে তত্ত্বাবধায়ক সরকার ব্যবস্থা বাতিল করা হয়।"
      ]
    }
  },
  {
    id: "bcs-it-1",
    text: "কম্পিউটারের প্রধান মেমোরির গতি পরিমাপের মূল একক বা ফ্রিকোয়েন্সি মেমোরি ইন্টারফেসটিকে কী বলা হয়?",
    options: [
      "System Clock Speed (MHz/GHz)",
      "Hard drive seek time",
      "RAM capacity size in GB",
      "ALU calculation cycle speed"
    ],
    correctIndex: 0,
    subject: "৭. কম্পিউটার ও তথ্যপ্রযুক্তি",
    topic: "কম্পিউটারের অঙ্গসংগঠন ও পেরিফেরালস",
    difficulty: "Medium",
    explanations: {
      bn: "মেমোরি বাস কিংবা মেমোরি কন্ট্রোল ইন্টারফেসের গতি সিস্টেম ক্লক স্পিড (MHz/GHz) দিয়ে পরিমাপ করা হয়, যা নির্ধারণ করে মেমোরি প্রতি সেকেন্ডে কত বার ডাটা স্থানান্তর করতে পারে।",
      en: "Clock cycles/frequency measured in megahertz (MHz) represent the primary speed metric of system memory busses.",
      wrongOptions: [
        "RAM capacity মূলত ডাটা ধারণক্ষমতা নির্দেশ করে, গতি নয়।",
        "ALU কম্পিউটারের লজিক ইউনিট যা হিসাব-নিকাশ পরিচালনা করে।"
      ]
    }
  },
  {
    id: "bcs-math-1",
    text: "১০% সরল মুনাফায় কোন আসল ৮ বছরে সুদ-আসলে দ্বিগুণ হলে, সুদের হার ২০% এ কত বছরে তা সুদ-আসলে তিনগুণ হবে?",
    options: [
      "১০ বছর",
      "৮ বছর",
      "১২ বছর",
      "৫ বছর"
    ],
    correctIndex: 0,
    subject: "৮. গাণিতিক যুক্তি",
    topic: "১. পাটিগণিত",
    difficulty: "Hard",
    explanations: {
      bn: "সুদ-আসলে ৩ গুণ হওয়া মানে সুদ হতে হবে আসলের ২ গুণ (I = 2P)। সূত্রানুসারে, n = I / (P * r) = 2P / (P * 0.20) = ২ / ০.২ = ১০ বছর।",
      en: "For simple interest to triple the principal, the interest must be twice the principal (I = 2P). Time t = I / (P * r) = 2P / (P * 0.20) = 10 years.",
      wrongOptions: [
        "৫ বছর হলো সরল সুদের হার দ্বিগুণ হওয়ার দ্বিগুণ গতি সম্পন্ন বিভ্রান্তিকর হিসাব।",
        "৮ বছর আসল দ্বিগুণ হওয়ার হারের সাথে অপ্রাসঙ্গিক সম্পর্ক।"
      ]
    }
  },
  {
    id: "bcs-ethics-1",
    text: "নাগরিক শুদ্ধাচার ও সমাজ গঠনের জন্য প্রণীত বাংলাদেশের ক্যাবিনেট অনুমোদিত অন্যতম জাতীয় দলিলের নাম কী?",
    options: [
      "National Integrity Strategy (জাতীয় শুদ্ধাচার কৌশল), ২০১২",
      "সুশাসন বাস্তবায়ন পরিকল্পনা, ২০১৫",
      "দুর্নীতি দমন কমিশন অ্যাক্ট, ২০০৪",
      "জাতীয় নৈতিক শিক্ষা পলিসি, ২০১০"
    ],
    correctIndex: 0,
    subject: "১০. নৈতিকতা, মূল্যবোধ ও সুশাসন",
    topic: "মূল্যবোধের গুরুত্ব ও সুশাসন প্রতিষ্ঠা",
    difficulty: "Medium",
    explanations: {
      bn: "বাংলাদেশ সরকার ২০১২ সালের অক্টোবর মাসে মন্ত্রিসভার বৈঠকে 'জাতীয় শুদ্ধাচার কৌশল' (NIS) অনুমোদন করে, যা দেশের দুর্নীতি প্রতিরোধ ও সুশাসন নিশ্চিত করার একটি মূল কাঠামো।",
      en: "The National Integrity Strategy (NIS) was approved in October 2012 to implement good governance in administrative offices.",
      wrongOptions: [
        "দুর্নীতি দমন কমিশন অ্যাক্ট একটি আইনগত দলিল যা সুনির্দিষ্ট আইনি বিচারের কাঠামো নির্ধারণ করে, নীতিগত কৌশল নয়।",
        "সুশাসন বাস্তবায়ন রোডম্যাপ কোনো ক্যাবিনেট দলিলের সরাসরি অংশ নয়।"
      ]
    }
  },
  {
    id: "bank-gk-1",
    text: "Which of the following global financial organizations coordinates the SWIFT financial communication network globally?",
    options: [
      "Society for Worldwide Interbank Financial Telecommunication",
      "International Monetary Fund (IMF)",
      "World Bank Group",
      "Federal Reserve System"
    ],
    correctIndex: 0,
    subject: "৪. General Knowledge (GK)",
    topic: "International Banking & Trade",
    difficulty: "Medium",
    explanations: {
      bn: "SWIFT হলো বেলজিয়ামে সদর দপ্তর বিশিষ্ট একটি সমবায় সমিতি যা বৈশ্বিক আন্তঃব্যাংক লেনদেনের বার্তা আদান-প্রদান ব্যবস্থা নিয়ন্ত্রণ করে। এটি অন্য ব্যাংকগুলির সমন্বিত একটি নেটওয়ার্ক মাত্র।",
      en: "SWIFT stands for Society for Worldwide Interbank Financial Telecommunication and coordinates global interbank transactions.",
      wrongOptions: [
        "IMF মূলত সদস্য দেশগুলির ভারসাম্য ও ঋণ ব্যবস্থা তদারকি করে।",
        "বিশ্বব্যাংক উন্নয়নশীল দেশসমূহের অবকাঠামোগত মূলধন সরবরাহকারী প্রতিষ্ঠান।"
      ]
    }
  }
];
