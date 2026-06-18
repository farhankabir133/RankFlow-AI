export interface LocalQuestion {
  text: string;
  options: string[];
  correctIndex: number;
  explanations: {
    bn: string;
    en: string;
    wrongOptions: string[];
  };
}

export const SYLLABUS_CORPUS: Record<string, LocalQuestion[]> = {
  bangla: [
    {
      text: "বাঙলা ভাষার প্রথম স্বার্থক উপন্যাস ‘দুর্গেশনন্দিনী’ সাহিত্যসম্রাট বঙ্কিমচন্দ্র চট্টোপাধ্যায় কর্তৃক কোন সালে প্রকাশিত হয়?",
      options: ["১৮৬৫ সালে", "১৮৫২ সালে", "১৮৬৪ সালে", "১৮৭২ সালে"],
      correctIndex: 0,
      explanations: {
        bn: "১৮৬৫ সালে বঙ্কিমচন্দ্র চট্টোপাধ্যায়ের প্রথম বাংলা উপন্যাস 'দুর্গেশনন্দিনী' প্রকাশিত হয়। এটি বাংলা সাহিত্যের প্রথম সার্থক উপন্যাস হিসেবে পরিচিত।",
        en: "Durgeshnondini, published in 1865, is considered the first successful Bengali novel, written by Bankim Chandra Chattopadhyay.",
        wrongOptions: [
          "১৮৫২ সালে তারাশঙ্কর তর্করত্নের কাদম্বরী অনূদিত হয়েছিল।",
          "১৮৭২ সালে বঙ্কিমচন্দ্রের মাসিক পত্রিকা 'বঙ্গদর্শন' প্রথম প্রকাশিত হয়।"
        ]
      }
    },
    {
      text: "বাঙলা সাহিত্যের আধুনিক যুগের প্রথম ট্র্যাজেডি নাটক কোনটি এবং এর রচয়িতা কে?",
      options: ["কৃষ্ণকুমারী, মাইকেল মধুসূদন দত্ত", "নীলদর্পন, দীনবন্ধু মিত্র", "কবর, মুনীর চৌধুরী", "শর্মিষ্ঠা, মাইকেল মধুসূদন দত্ত"],
      correctIndex: 0,
      explanations: {
        bn: "১৮৬১ সালে মাইকেল মধুসূদন দত্ত রচিত 'কৃষ্ণকুমারী' বাংলা সাহিত্যের প্রথম সার্থক ও প্রথম ট্র্যাজেডি নাটক। রাজস্থান ইতিহাস অবলম্বনে এটি রচিত।",
        en: "Krishnakumari (1861) by Michael Madhusudan Dutt is recognized as the first standard tragic drama in modern Bengali literature.",
        wrongOptions: [
          "নীলদর্পণ দীনবন্ধু মিত্র রচিত বিখ্যাত নীল বিদ্রোহের পটভূমিকার নাটক, ট্র্যাজেডি নয়।",
          "শর্মিষ্ঠা মধুসূদন দত্তের প্রথম সফল নাটক হলেও এটি ট্র্যাজেডি ছিল না।"
        ]
      }
    },
    {
      text: "ড. মোহাম্মদ শহীদুল্লাহ সম্পাদিত বিখ্যাত অভিধান ‘আঞ্চলিক ভাষার অভিধান’ কোন একাডেমি কর্তৃক প্রথম প্রকাশিত হয়েছিল?",
      options: ["বাংলা একাডেমি", "বাংলাদেশ এশিয়াটিক সোসাইটি", "বিশ্বভারতী", "ঢাকা বিশ্ববিদ্যালয় প্রকাশনা শাখা"],
      correctIndex: 0,
      explanations: {
        bn: "বাংলা একাডেমি ড. মুহম্মদ শহীদুল্লাহর সম্পাদনায় 'পূর্ব পাকিস্তানি আঞ্চলিক ভাষার অভিধান' (পরবর্তীতে বাংলাদেশ অঞ্চলের আঞ্চলিক ভাষার অভিধান) প্রকাশ করে, যা বাংলা আভিধানিক ধারায় মাইলফলক স্বরূপ।",
        en: "The Bengali Regional Dictionary was edited by Dr. Muhammad Shahidullah and published by Bangla Academy.",
        wrongOptions: [
          "এশিয়াটিক সোসাইটি বিভিন্ন ঐতিহাসিক গবেষণা সংস্করণ বের করলেও এই অভিধানটি বের করেনি।",
          "বিশ্বভারতী শান্তিনিকেতন কেন্দ্রিক প্রকাশনা নিয়ে কাজ করে থাকে।"
        ]
      }
    },
    {
      text: "রবীন্দ্রনাথ ঠাকুর তাঁর কোন বিখ্যাত রচনাটি কবি কাজী নজরুল ইসলামকে কারাবরণকালে শুভেচ্ছা জানাতে উৎসর্গ করেছিলেন?",
      options: ["বসন্ত", "কালের যাত্রা", "তাসের দেশ", "খেয়া"],
      correctIndex: 0,
      explanations: {
        bn: "কবি রবীন্দ্রনাথ ঠাকুর ১৯২৩ সালে তাঁর 'বসন্ত' গীতিনাট্যটি আলিপুর সেন্ট্রাল জেলে বন্দী থাকা অবস্থায় কবি কাজী নজরুল ইসলামকে উৎসর্গ করেন।",
        en: "Tagore dedicated his musical play 'Bosonto' to Kazi Nazrul Islam in jail.",
        wrongOptions: [
          "কালের যাত্রা শরৎচন্দ্র চট্টোপাধ্যায়কে উৎসর্গ করার সাথে সংশ্লিষ্ট ছিল।",
          "তাসের দেশ নাটকটি সুভাষচন্দ্র বসুকে উৎসর্গ করা হয়েছিল।"
        ]
      }
    },
    {
      text: "কাজী নজরুল ইসলামের যুগান্তকারী 'অগ্নি-বীণা' কাব্যের প্রথম কবিতার শিরোনাম বা নাম কী?",
      options: ["প্রলয়োল্লাস", "বিদ্রোহী", "ধূমকেতু", "খেয়াপারের তরণী"],
      correctIndex: 0,
      explanations: {
        bn: "'অগ্নি-বীণা' কাব্যের প্রথম কবিতা হলো 'প্রলয়োল্লাস' এবং দ্বিতীয় কবিতা হলো বিখ্যাত 'বিদ্রোহী' কবিতা। এটি ১৯২২ সালে প্রকাশিত হয়।",
        en: "'Proloyollas' is the first poem of Nazrul's legendary book of poems 'Agni-Beena'.",
        wrongOptions: [
          "বিদ্রোহী অত্যন্ত বিখ্যাত হলেও এটি কাব্যের দ্বিতীয় কবিতা ছিল।",
          "ধূমকেতু ছিল তাঁর সম্পাদিত অত্যন্ত জনপ্রিয় রাজনৈতিক দ্বি-সাপ্তাহিক পত্রিকা।"
        ]
      }
    }
  ],
  english: [
    {
      text: "What is the accurate spelling for the word representing a system of government in which most of the important decisions are taken by state officials?",
      options: ["Bureaucracy", "Beurocracy", "Bureaucracye", "Burocracy"],
      correctIndex: 0,
      explanations: {
        bn: "আমলাতন্ত্রের ইংরেজি প্রতিশব্দ 'Bureaucracy' (B-u-r-e-a-u-c-r-a-c-y)। এটি অত্যন্ত পরিচিত একটি Correction বানান যা বিসিএস পরীক্ষায় নিয়মিত আসে।",
        en: "Bureaucracy is spelled as b-u-r-e-a-u-c-r-a-c-y.",
        wrongOptions: [
          "Beurocracy ভুল ইংরেজি বানান যা উচ্চারণের বিভ্রান্তি থেকে তৈরি হয়।",
          "Bureaucracye অতিরিক্ত ই অক্ষরের কারণে ভূল রূপ ধারণ করেছে।"
        ]
      }
    },
    {
      text: "Find the synonym or identical terminology for the word 'Indifferent':",
      options: ["Apathetic", "Eager", "Zealous", "Compassionate"],
      correctIndex: 0,
      explanations: {
        bn: "Indifferent শব্দের অর্থ হল উদাসীন বা অনুভূতিহীন। Apathetic শব্দের অর্থও উদাসীন। অন্য অপশনগুলোর অর্থ হল আগ্রহী, উদ্যমী এবং সহানুভূতিশীল।",
        en: "'Indifferent' and 'apathetic' both signify lacking interest, enthusiasm, or concern.",
        wrongOptions: [
          "Eager শব্দের অর্থ ব্যাকুল বা অত্যন্ত আগ্রহী।",
          "Zealous শব্দের অর্থ পরম উদ্যমী বা উৎসাহী।"
        ]
      }
    },
    {
      text: "Who is the creator of the celebrated character 'Sherlock Holmes', the pioneer of detective fiction?",
      options: ["Arthur Conan Doyle", "Agatha Christie", "Edgar Allan Poe", "Charles Dickens"],
      correctIndex: 0,
      explanations: {
        bn: "স্যার আর্থার কোনান ডয়েল হলেন কালজয়ী গোয়েন্দা চরিত্র 'শার্লক হোমস' এর স্রষ্টা। ১৮৮৭ সালে তাঁর প্রথম উপন্যাস 'আ স্টাডি ইন স্কারলেট' এ এই চরিত্রের আত্মপ্রকাশ ঘটে।",
        en: "Sir Arthur Conan Doyle is the British writer who created the character Sherlock Holmes.",
        wrongOptions: [
          "Agatha Christie বিখ্যাত গোয়েন্দা চরিত্র এরকুল পোয়ারো ও মিস মার্পল এর স্রষ্টা।",
          "Edgar Allan Poe বিশ্বের প্রথম আধুনিক গোয়েন্দা রচনার জনক হিসেবে বিবেচিত হলেও হোমস তাঁর সৃষ্টি নয়।"
        ]
      }
    },
    {
      text: "Identify the appropriate preposition: 'The manager insisted _______ checking the structural audit reports immediately.'",
      options: ["on", "in", "to", "at"],
      correctIndex: 0,
      explanations: {
        bn: "insisted এর পর Appropriate Preposition 'on' বসে। Insist on doing something মানে কোনো কিছু করার জন্য জোর দেওয়া বা অনড় থাকা।",
        en: "'Insist on' is the standard expression used when staying firm on some action suggestion.",
        wrongOptions: [
          "Insist with ব্যাকরণগতভাবে অশুদ্ধ।",
          "Insist at অপরিকল্পিত বাক্যাংশ।"
        ]
      }
    }
  ],
  generalKnowledge: [
    {
      text: "ঐতিহাসিক মুজিবনগর বা ভবেরপাড়া গ্রামটি বর্তমান বাংলাদেশের কোন জেলার এবং কোন উপজেলার অন্তর্গত?",
      options: ["মেহেরপুর জেলার আমঝুপি উপজেলা", "মেহেরপুর জেলার মুজিবনগর উপজেলা", "কুষ্টিয়া জেলার কুমারখালী উপজেলা", "চুয়াডাঙ্গা জেলার দামুড়হুদা উপজেলা"],
      correctIndex: 1,
      explanations: {
        bn: "১৭ এপ্রিল ১৯৭১ সালে বাংলাদেশের প্রথম অস্থায়ী সরকার মেহেরপুর জেলার বৈদ্যনাথতলার ভবেরপাড়া (বর্তমান মুজিবনগর) গ্রামে শপথ গ্রহণ করে।",
        en: "Mujibnagar is situated in the Mujibnagar sub-district under the Meherpur district of Bangladesh.",
        wrongOptions: [
          "আমঝুপি মেহেরপুর জেলার অংশ হলেও এটি ঐতিহাসিক ঘোষণার শপথস্থল ছিল না।"
        ]
      }
    },
    {
      text: "গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধানের কোন অনুচ্ছেদে বা আর্টিকেলে ‘পরিবেশ ও বন্যপ্রাণী সংরক্ষণ ও উন্নয়ন’ বিষয়টি রাষ্ট্রের মৌলিক দায়িত্বভুক্ত করা হয়েছে?",
      options: ["১৮ক অনুচ্ছেদ", "১৮ অনুচ্ছেদ", "২১ অনুচ্ছেদ", "১৫ অনুচ্ছেদ"],
      correctIndex: 0,
      explanations: {
        bn: "সংবিধানের ১৫তম সংশোধনীর মাধ্যমে যুক্ত করা ১৮ক (Article 18A) অনুচ্ছেদ অনুযায়ী রাষ্ট্র বর্তমান ও ভবিষ্যৎ নাগরিকদের জন্য পরিবেশ সংরক্ষণ ও উন্নয়ন করিবেন এবং বন্যপ্রাণী নিরাপত্তা বিধান করিবেন।",
        en: "Article 18A of the Constitution of Bangladesh guarantees environmental and wildlife conservation standards as state directives.",
        wrongOptions: [
          "১৮ নং অনুচ্ছেদ জনস্বাস্থ্য ও নৈতিকতা সম্পর্কিত বিধান দেয়।",
          "২১ নং অনুচ্ছেদ নাগরিক ও সরকারী কর্মচারীদের কর্তব্য সংজ্ঞায়িত করে।"
        ]
      }
    }
  ]
};

export function getProceduralQuestionsForSubject(subject: string, count: number, topic?: string, difficulty?: string, seedOffset = 0): any[] {
  const normSubject = (subject || "").toLowerCase();
  let pool = SYLLABUS_CORPUS.generalKnowledge;
  let subjectName = "General Knowledge";

  if (normSubject.includes("bangla")) {
    pool = SYLLABUS_CORPUS.bangla;
    subjectName = "Bangla Language & Literature";
  } else if (normSubject.includes("english")) {
    pool = SYLLABUS_CORPUS.english;
    subjectName = "English Language & Literature";
  } else if (normSubject.includes("math") || normSubject.includes("analytical") || normSubject.includes("mental")) {
    pool = SYLLABUS_CORPUS.english; // reuse english or fallback
    subjectName = "Mathematical Reasoning & Mental Ability";
  }

  const qs: any[] = [];
  for (let i = 0; i < count; i++) {
    const rawIdx = (seedOffset + i) % pool.length;
    let finalSelection = pool[rawIdx];

    if (subjectName === "Mathematical Reasoning & Mental Ability") {
      const idx = (seedOffset + i) % 10;
      const multipliers = [3, 4, 5, 2, 6, 7, 8, 9, 10, 12];
      const selectedMult = multipliers[idx];
      const tuple = {
        s: selectedMult * 5,
        d: selectedMult * 1,
        x: selectedMult * 3,
        y: selectedMult * 2,
        ans: selectedMult * selectedMult * 6
      };
      
      const opts = [
        `${tuple.ans}`,
        `${tuple.ans + selectedMult}`,
        `${tuple.ans - selectedMult}`,
        `${tuple.ans * 2}`
      ];
      const cIdx = 0;

      finalSelection = {
        text: `দুটি সংখ্যার যোগফল = ${tuple.s} এবং বিয়োগফল = ${tuple.d} হলে, সংখ্যা দুটির গুণফল (xy) এর মান কত হবে?`,
        options: opts,
        correctIndex: cIdx >= 0 ? cIdx : 0,
        explanations: {
          bn: `সহজ বীজগণিতীয় প্রতিস্থাপন ও সমাধান: সমীকরণ দুটি যোগ করলে পাই, 2x = ${tuple.s + tuple.d} => x = ${tuple.x}। এবং সমীকরণ দুটি বিয়োগ করলে পাই, 2y = ${tuple.s - tuple.d} => y = ${tuple.y}। অতএব xy এর মান = ${tuple.x} * ${tuple.y} = ${tuple.ans}।`,
          en: `Solving the linear equations x + y = ${tuple.s} and x - y = ${tuple.d} simultaneously yields x = ${tuple.x} and y = ${tuple.y}. Hence, xy = ${tuple.x} * ${tuple.y} = ${tuple.ans}.`,
          wrongOptions: ["অন্যান্য বিকল্পগুলি বীজগণিতীয় চলকের মান অপরিকল্পিতভাবে বসালে অসঙ্গত হবে।"]
        }
      };
    }
    
    qs.push({
      id: "procedural-" + Math.random().toString(36).substring(7) + "-" + i,
      text: finalSelection.text,
      options: finalSelection.options,
      correctIndex: finalSelection.correctIndex,
      subject: subjectName,
      topic: topic || "Syllabus Focus Unit",
      difficulty: difficulty || "Medium",
      explanations: finalSelection.explanations
    });
  }
  
  return qs;
}

export function generateProceduralQuestions(allocations: any[], difficulty: string): any[] {
  const finalizedQs: any[] = [];
  let seedOffset = 0;
  for (const alloc of allocations) {
    const count = parseInt(alloc.count) || 0;
    if (count <= 0) continue;
    const subjectQs = getProceduralQuestionsForSubject(alloc.subject, count, alloc.topic, difficulty || "Medium", seedOffset);
    finalizedQs.push(...subjectQs);
    seedOffset += count;
  }
  return finalizedQs;
}
