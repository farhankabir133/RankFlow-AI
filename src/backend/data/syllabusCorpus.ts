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
        en: "To 'insist on' something or doing something means to demand or stand firm on a decision.",
        wrongOptions: [
          "insisted in সচরাচর ব্যবহৃত হয় না এবং এটি ব্যাকরণগতভাবে অশুদ্ধ।",
          "insisted to ও insisted at এই বাক্যের ভাবার্থের সাথে সামঞ্জস্যপূর্ণ নয়।"
        ]
      }
    }
  ],
  bangladesh: [
    {
      text: "বাংলাদেশের সংবিধানের কত নম্বর অনুচ্ছেদ অনুযায়ী ‘বাংলাদেশ সরকারি কর্ম কমিশন’ (BPSC) গঠিত হয়?",
      options: ["১৩৭ নং অনুচ্ছেদ", "১৩৫ নং অনুচ্ছেদ", "১৪২ নং অনুচ্ছেদ", "১২৭ নং অনুচ্ছেদ"],
      correctIndex: 0,
      explanations: {
        bn: "বাংলাদেশ সংবিধানের নবম ভাগের দ্বিতীয় পরিচ্ছেদের ১৩৭ নং অনুচ্ছেদ অনুযায়ী বাংলাদেশ সরকারি কর্ম কমিশন (BPSC) গঠিত হয়।",
        en: "The Bangladesh Public Service Commission (BPSC) is established under Article 137 of the Constitution of Bangladesh.",
        wrongOptions: [
          "১৩৫ নং অনুচ্ছেদ প্রজাতন্ত্রের কর্মে নিয়োজিত কর্মচারীদের অধিকার সংক্রান্ত বিষয় আলোচনা করে।",
          "১৪২ নং অনুচ্ছেদ অনুযায়ী জাতীয় সংসদে সংবিধান সংশোধন করা সম্ভব।"
        ]
      }
    },
    {
      text: "বাংলাদেশে মহান স্বাধীনতা যুদ্ধের সময় সর্বপ্রথম কোন অঞ্চলকে শত্রুমুক্ত ঘোষণা করা হয়?",
      options: ["যশোর", "সিলেট", "চট্টগ্রাম", "মেহেরপুর"],
      correctIndex: 0,
      explanations: {
        bn: "১৯৭১ সালের ৬ ডিসেম্বর প্রথম জেলা হিসেবে যশোর শত্রুমুক্ত ও স্বাধীন অঞ্চল হিসেবে ঘোষিত হয়।",
        en: "Jessore was declared the first liberated district of Bangladesh on December 6, 1971.",
        wrongOptions: [
          "সিলেট ও চট্টগ্রাম পরবর্তীতে স্বাধীন হয়েছে, যশোরই প্রথম শত্রুমুক্ত ও গৌরবময় জেলা ছিল।"
        ]
      }
    }
  ],
  international: [
    {
      text: "ভার্সাই চুক্তি (Treaty of Versailles) কত সালে স্বাক্ষরিত হয়েছিল এবং এটি কোন বিশ্বযুদ্ধের অবসান ঘটায়?",
      options: ["১৯১৯ সালে, প্রথম বিশ্বযুদ্ধ", "১৯৪৫ সালে, দ্বিতীয় বিশ্বযুদ্ধ", "১৮১৫ সালে, নেপোলিয়নীয় যুদ্ধ", "১৯৯১ সালে, স্নায়ুযুদ্ধ"],
      correctIndex: 0,
      explanations: {
        bn: "২৮ জুন ১৯১৯ সালে ফ্রান্সের ভার্সাই প্রাসাদে ঐতিহাসিক ভার্সাই চুক্তি স্বাক্ষরিত হয়, যার মাধ্যমে আনুষ্ঠানিকভাবে প্রথম বিশ্বযুদ্ধের অবসান ঘটে।",
        en: "The Treaty of Versailles was signed in 1919, officially ending World War I.",
        wrongOptions: [
          "১৯৪৫ সালে স্বাক্ষরিত চুক্তিটি প্রথম বিশ্বযুদ্ধের নয়, এটি জাতিসংঘের চার্টারের সাথে সম্পৃক্ত।",
          "১৮১৫ সালে ওয়াটারলু যুদ্ধের পর ভিয়েনা কংগ্রেস অনুষ্ঠিত হয়েছিল।"
        ]
      }
    },
    {
      text: "জাতিসংঘের সমুদ্র আইন সংক্রান্ত কনвенশন UNCLOS কত সালে স্বাক্ষরিত হয়েছিল?",
      options: ["১৯৮২ সালে", "১৯৭২ সালে", "১৯৯২ সালে", "১৯৯৬ সালে"],
      correctIndex: 0,
      explanations: {
        bn: "UNCLOS (United Nations Convention on the Law of the Sea) ১৯৮২ সালের ১০ই ডিসেম্বর জ্যামাইকার মন্টেগো বে-তে স্বাক্ষরিত হয় এবং ১৯৯৪ সাল থেকে কার্যকর হয়।",
        en: "UNCLOS was adopted in 1982 to govern deep ocean and sea territorial disputes.",
        wrongOptions: [
          "১৯৭২ সালে মানব পরিবেশ বিষয়ক বিখ্যাত স্টকহোম কনফারেন্স অনুষ্ঠিত হয়েছিল।",
          "১৯৯২ সালে ব্রাজিলের রিও ডি জেনিরোতে প্রথম বিশ্ব ধরিত্রী সম্মেলন হয়।"
        ]
      }
    },
    {
      text: "পৃথিবীর সর্বাপেক্ষা দীর্ঘতম পর্বতমালা আন্দিজ পর্বতমালা (Andes Mountains) কোন মহাদেশে অবস্থিত?",
      options: ["দক্ষিণ আমেরিকা", "উত্তর আমেরিকা", "এশিয়া", "আফ্রিকা"],
      correctIndex: 0,
      explanations: {
        bn: "আন্দিজ পর্বতমালা হলো পৃথিবীর দীর্ঘতম এবং দক্ষিণ আমেরিকার পশ্চিম উপকূল বরাবর বিস্তৃত একটি পর্বতমালা।",
        en: "The Andes is the longest continental mountain range in the world, located in South America.",
        wrongOptions: [
          "উত্তর আমেরিকা রকি পর্বতমালার বিখ্যাত আবাসের জায়গা।"
        ]
      }
    }
  ],
  science: [
    {
      text: "মহাকাশ বিদ্যানুসারে সূর্য থেকে সরাসরি পৃথিবীতে আলো এসে পৌঁছাতে আনুমানিক কত সময় লাগে?",
      options: ["৮ মিনিট ২০ সেকেন্ড", "৬ মিনিট ১০ সেকেন্ড", "১০ মিনিট ১৫ সেকেন্ড", "১২ মিনিট ৩০ সেকেন্ড"],
      correctIndex: 0,
      explanations: {
        bn: "সূর্য থেকে পৃথিবীর গড় দূরত্ব প্রায় ১৫ কোটি কিলোমিটার। আলো প্রতি সেকেন্ডে প্রায় ৩ লক্ষ কিমি বেগে ভ্রমণ করে পৃথিবীর পৃষ্ঠে আসতে প্রায় ৫০০ সেকেন্ড বা ৮ মিনিট ২০ সেকেন্ড সময় নেয়।",
        en: "Sunlight takes approximately 8 minutes and 20 seconds to reach Earth.",
        wrongOptions: [
          "৬ মিনিট ১০ সেকেন্ড অনেক কম দূরত্ব নির্দেশ করে যা আলোর গতির পরিপন্থী।",
          "১০ মিনিট বা ১২ মিনিট ৩০ সেকেন্ডের হিসাবগুলো বাস্তব দূরত্বের অতি মূল্যায়িত রূপ।"
        ]
      }
    },
    {
      text: "মানবদেহের স্বাভাবিক তাপমাত্রা কত ফারেনহাইট হয়ে থাকে?",
      options: ["৯৮.৪° ফারেনহাইট", "৯৭.২° ফারেনহাইট", "৯৯.১° ফারেনহাইট", "৯৬.৬° ফারেনহাইট"],
      correctIndex: 0,
      explanations: {
        bn: "মানবদেহের স্বাভাবিক গড় তাপমাত্রা হলো ৯৮.৪° ফারেনহাইট বা ৩৭° সেলসিয়াস। হাইপোথ্যালামাস অংশ শরীরকে তাপ নিয়ন্ত্রণে থার্মোস্ট্যাটের ন্যায় সাহায্য করে।",
        en: "Normal body temp baseline is 98.4 Degrees Fahrenheit.",
        wrongOptions: [
          "৯৭.২° স্বাভাবিকের চেয়ে কিছুটা শীতল মানুষের তাপমাত্রা নির্দেশ করে।",
          "৯৯.১° সামান্য জরাক্রান্ত বা অতিউষ্ণ শরীরের পরিমাপ।"
        ]
      }
    }
  ],
  computer_it: [
    {
      text: "কম্পিউটারের প্রধান অস্থায়ী মেমোরি RAM এর পূর্ণরূপ কী এবং এটি তথ্য কীভাবে অক্ষুণ্ণ রাখে?",
      options: ["Random Access Memory, বিদ্যুৎ প্রবাহ বন্ধ হলে ডাটা মুছে যায়", "Read Access Memory, ডাটা স্থায়ী থাকে", "Run Active Memory, এটি সেকেন্ডারি মেমরি", "Real Allocation Model, বাফার তৈরিতে ব্যবহৃত হয়"],
      correctIndex: 0,
      explanations: {
        bn: "RAM মানে হলো Random Access Memory। এটি একটি উদ্বায়ী বা Volatile মেমোরি, যার অর্থ বিদ্যুৎ সংযোগ বিচ্ছিন্ন হওয়ার সাথে সাথে এর সংরক্ষিত ডেটা চিরতরে মুছে যায়।",
        en: "RAM is Random Access Memory, a volatile hardware component.",
        wrongOptions: [
          "Read Access Memory নামগতভাবে ভুল এবং ডাটা স্থায়ী রাখার বিষয়টি ROM এর ক্ষেত্রে প্রযোজ্য।",
          "Run Active Memory সেকেন্ডারি সিস্টেম রিডিং এর কোনো স্বীকৃত পরিভাষা নয়।"
        ]
      }
    },
    {
      text: "ইন্টারনেটে বিশ্বব্যাপী পরিচিত আইপি অ্যাড্রেসের অন্যতম প্রমিত সংস্করণ IPv6 এর অ্যাড্রেস সাইজ বা ধারণক্ষমতা কত বিটের?",
      options: ["১২৮ বিটের", "৩২ বিটের", "৬৪ বিটের", "২৫৬ বিটের"],
      correctIndex: 0,
      explanations: {
        bn: "IPv6 (Internet Protocol Version 6) ১২৮ বিটের অ্যাড্রেস ব্যবহার করে, যা অত্যন্ত বিশাল সংখ্যক ডিভাইসকে স্বতন্ত্র ঠিকানা দিতে সক্ষম। অন্যদিকে IPv4 মূলত ৩২ বিটের হয়ে থাকে।",
        en: "IPv6 holds a 128-bit address size compared to 32-bit of IPv4 standard.",
        wrongOptions: [
          "৩২ বিট হলো IPv4 এর প্রমিত সাইজ যা বর্তমানে ডিভাইস স্বল্পতার কারণে সীমিত করা হচ্ছে।",
          "৬৪ বিট সাধারণত কম্পিউটার প্রসেসরের আর্কিটেকচার রেজিস্টারে ব্যবহৃত হয়।"
        ]
      }
    },
    {
      text: "কোন নেটওয়ার্ক টপোলজিতে সমস্ত কম্পিউটার সরাসরি একটি কেন্দ্রীয় সুইচ বা হাব (Hub/Switch) এর সাথে যুক্ত হয়ে স্টার আকৃতির মতো কাজ করে?",
      options: ["স্টার টপোলজি", "বাস টপোলজি", "রিং টপোলজি", "মেশ টপোলজি"],
      correctIndex: 0,
      explanations: {
        bn: "স্টার টপোলজিতে (Star Topology) একটি সেন্ট্রাল হাব বা সুইচ দিয়ে প্রতিটি কম্পিউটারের ক্যাবল কানেকশন নিশ্চিত করা হয়। সেন্ট্রাল ডিভাইসটি অকেজো হলে পুরো নেটওয়ার্ক ডাউন হয়ে যায়।",
        en: "In Star Topology, all computers connect directly to a central hub or host switch.",
        wrongOptions: [
          "বাস টপোলজি একটি কমন ব্যাকবোন বা ক্যাবলের ওপর ভিত্তি করে লিনিয়ারলি গড়ে ওঠে।",
          "রিং টপোলজি চক্রাকারে একটির সাথে অপর কম্পিউটার ডাটা রোটেশনে যুক্ত থাকে।"
        ]
      }
    },
    {
      text: "নিচের কোনটি অপটিক্যাল ফাইবার ক্যাবলের মধ্য দিয়ে আলোর গতিতে অত্যন্ত দ্রুত ডাটা স্থানান্তরের মূল মেকানিজম বা প্রিন্সিপাল?",
      options: ["Total Internal Reflection (পূর্ণ অভ্যন্তরীণ প্রতিফলন)", "আলোর প্রতিসরণ", "আলোর সমবর্তন", "আলোর বিচ্ছুরণ"],
      correctIndex: 0,
      explanations: {
        bn: "অপটিক্যাল ফাইবার গ্লাস কোর বা ডাই-ইলেকট্রিক উপাদানের তৈরি ক্যাবল যা আলোর 'পূর্ণ অভ্যন্তরীণ প্রতিফলন' (Total Internal Reflection) নীতি খাটিয়ে ডেটা নিয়ে যায়।",
        en: "Optical Fibers operate based on the physics principle of Total Internal Reflection.",
        wrongOptions: [
          "আলোর প্রতিসরণ শুধু মাধ্যম পরিবর্তনের সময় আলোর দিক পরিবর্তনের ঘটনা নির্দেশ করে।",
          "আলোর বিচ্ছুরণ সাদা আলোর সাতটি রঙে বিভক্ত হওয়ার পদার্থবিদ্যা বিষয়।"
        ]
      }
    },
    {
      text: "RDBMS সিস্টেমে তথ্য অনুসন্ধান ও কোয়েরি করার জন্য বা প্রধান ভাষার নাম কী?",
      options: ["SQL (Structured Query Language)", "HTML", "C++ System", "Fortran Development Code"],
      correctIndex: 0,
      explanations: {
        bn: "SQL বা Structured Query Language হলো ডাটাবেজ তৈরি, রিলেশন তৈরি, এন্ট্রি করা এবং কুয়েরি ফিল্টারিং করার বিশ্বজনীন মানসম্মত একমাত্র প্রমিত আমেরিকান ইনস্টিটিউট নির্ধারিত ভাষা।",
        en: "SQL syntax is the absolute core language for querying RDBMS stacks.",
        wrongOptions: [
          "HTML একটি মার্কআপ ভাষা যা মূলত ওয়েবপৃষ্ঠার কঙ্কাল তৈরিতে ব্যবহৃত হয়।",
          "C++ হলো অবজেক্ট ওরিয়েন্টেড সফটওয়্যার কম্পাইল্ড প্রোগ্রামিং ভাষা।"
        ]
      }
    }
  ],
  geography: [
    {
      text: "কর্কটক্রান্তি রেখা (Tropic of Cancer) বাংলাদেশের ওপর দিয়ে কোন অবস্থানে অতিক্রম করেছে?",
      options: ["প্রায় ঠিক মাঝখান দিয়ে", "উত্তর সীমান্ত বরাবর", "উপকূল তথা দক্ষিণ সীমান্ত বরাবর", "পূর্ব দিকের পাহাড়ী অঞ্চল দিয়ে"],
      correctIndex: 0,
      explanations: {
        bn: "কর্কটক্রান্তি রেখা (Tropic of Cancer - ২৩.৫° উত্তর অক্ষাংশ) বাংলাদেশের প্রায় মাঝখান দিয়ে পূর্ব-পশ্চিমে অতিক্রম করেছে। এটি ফরিদপুর, মেহেরপুর, ঢাকা, চুয়াডাঙ্গাসহ কুমিল্লা হয়ে গেছে।",
        en: "The Tropic of Cancer passes approximately through the center of Bangladesh.",
        wrongOptions: [
          "উত্তর সীমান্ত দিয়ে কোনো ক্রান্তিরেখা বা কর্কটের অংশ স্পর্শ করেনি।",
          "দক্ষিণ সীমান্ত বরাবর বঙ্গোপসাগরের জল এবং উপকূল অঞ্চল স্পর্শ করেছে।"
        ]
      }
    },
    {
      text: "ভয়াবহ সুনামি (Tsunami) সমুদ্র উপকূলে আছড়ে পড়ার মূল প্রাকৃতিক কারণ মূলত কোনটি?",
      options: ["সমুদ্রগর্ভে প্রবল ভূমিকম্পের সৃষ্টি", "ভয়াবহ ঘুর্ণিঝড় ও বাতাসের সাইক্লোরিক ঘূর্ণি", "বায়ুচাপের রাতারাতি অস্বাভাবিক হ্রাস", "চাঁদের আকর্ষণ জোয়ারের তীব্রতা"],
      correctIndex: 0,
      explanations: {
        bn: "সুনামি হলো জাপানি শব্দ যার অর্থ পোতাশ্রয়ের ঢেউ। এটি প্রধানত পানির নিচে সমুদ্রের তলদেশে টেকটোনিক প্লেটের স্থানচ্যুতি ও ভূমিকম্প বা আগ্নেয়গিরির অগ্নি-উত্পাত জনিত কারণে হয়।",
        en: "Tsunamis are catastrophic sea waves triggered majorly by submarine tectonic earthquakes.",
        wrongOptions: [
          "ঘূর্ণিঝড় সামুদ্রিক জলোচ্ছ্বাস ঘটালেও তাকে সুনামি বলা হয় না। সুনামির তরঙ্গ সম্পূর্ণ ভিন্ন প্রকৃতির।"
        ]
      }
    },
    {
      text: "গ্রিনহাউস গ্যাসের নির্গমন কমানোর উদ্দেশ্যে ১৯৯৭ সালে স্বাক্ষরিত জলবায়ু চুক্তির নাম কী?",
      options: ["কিয়োটো প্রোটোকল (Kyoto Protocol)", "প্যারিস জলবায়ু চুক্তি", "মন্ট্রিল প্রোটোকল", "বেসেল কনভেনশন"],
      correctIndex: 0,
      explanations: {
        bn: "১৯৯৭ সালে জাপানের কিয়োটো শহরে স্বাক্ষরিত কিয়োটো প্রোটোকল হলো গ্রিনহাউস গ্যাসের মাত্রা কমানোর বাধ্যবাধকতামূলক চুক্তি।",
        en: "Kyoto Protocol signed in 1997 aims directly to decline worldwide greenhouse gas emission levels.",
        wrongOptions: [
          "মন্ট্রিল প্রোটোকল ওজোন স্তর রক্ষায় ও ক্লোরোফ্লোরোকার্বন সংকুচিত করার উদ্দেশ্যে গৃহীত।"
        ]
      }
    },
    {
      text: "নিচের কোনটি বাংলাদেশের ভৌগোলিক সীমায় অবস্থিত একমাত্র প্রবাল দ্বীপ (Coral Island)?",
      options: ["সেন্ট মার্টিন (Saint Martin's)", "কুতুবদিয়া দ্বীপ", "স้องกันদ্বীপ", "মহেশখালী দ্বীপ"],
      correctIndex: 0,
      explanations: {
        bn: "টেকনাফ হতে প্রায় ৯ কিলোমিটার দক্ষিণে নাফ নদীর মোহনায় বঙ্গোপসাগরে অবস্থিত সেন্ট মার্টিন হলো বাংলাদেশের একমাত্র সামুদ্রিক প্রবাল দ্বীপ।",
        en: "Saint Martin's is the sole marine coral island located in southeastern Bangladesh.",
        wrongOptions: [
          "কুতুবদিয়া বাতিঘরের জন্য সুপরিচিত একটি উপকূলীয় দ্বীপ।"
        ]
      }
    },
    {
      text: "পৃথিবীর বায়ুমণ্ডলের কোন সর্বনিম্ন স্তরে মেঘ, বৃষ্টি, কুয়াশা, তুষারপাত ইত্যাদি আবহাওয়াগত প্রক্রিয়া সংঘটিত হয়?",
      options: ["ট্রপোমণ্ডল (Troposphere)", "স্ট্র্যাটোমণ্ডল (Stratosphere)", "মেসোমণ্ডল (Mesosphere)", "থার্মোমণ্ডল (Thermosphere)"],
      correctIndex: 0,
      explanations: {
        bn: "ট্রপোমণ্ডল (Troposphere) বায়ুমণ্ডলের সবচেয়ে নিচের স্তর। এই স্তরেই আবহাওয়া ও জলবায়ুর যাবতীয় উপাদান যেমন মেঘ, বৃষ্টিপাত, কুয়াশা ও তুষারপাত সংঘটিত হয়।",
        en: "The troposphere is the lowest atmosphere layer where nearly all weather activities like clouds, rain, fog, and snow occur.",
        wrongOptions: [
          "স্ট্র্যাটোমণ্ডল মূলত ওজোন স্তরের জন্য পরিচিত এবং এখানে মেঘ সৃষ্টি হয় না।"
        ]
      }
    }
  ],
  ethics: [
    {
      text: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার কত সালে 'জাতীয় শুদ্ধাচার কৌশল' (National Integrity Strategy) অনুমোদন করে?",
      options: ["২০১২ সালে", "২০১০ সালে", "২০১৫ সালে", "২০০৯ সালে"],
      correctIndex: 0,
      explanations: {
        bn: "'জাতীয় শুদ্ধাচার কৌশল' (National Integrity Strategy) ২০১২ সালে ক্যাবিনেট অনুমোদন করে।",
        en: "The National Integrity Strategy (NIS) was ratified in 2012 by the cabinet team.",
        wrongOptions: [
          "শুদ্ধাচার সুশাসন রোডম্যাপ আলাদা কোনো স্বতন্ত্র ক্যাবিনেট দলিল নয়।"
        ]
      }
    },
    {
      text: "একজন শিশুর মূল্যবোধ ও নৈতিক শিক্ষা অর্জনের প্রথম এবং সবচেয়ে গুরুত্বপূর্ণ সামাজিক শিক্ষালয় বা ভিত্তিপ্রস্তর কোনটি?",
      options: ["পরিবার (Family)", "প্রাথমিক বিদ্যালয়", "সামাজিক ক্লাব", "ধর্মীয় প্রতিষ্ঠান"],
      correctIndex: 0,
      explanations: {
        bn: "পরিবার হলো মানুষের সামাজিকীকরণ এবং মূল্যবোধের প্রাচীনতম সুতিকাগার ও প্রাথমিক ক্ষেত্র। পরিবারের সদস্যদের নৈতিক আচরণে দেখেই শিশুর আদি চরিত্র গঠিত হয়।",
        en: "The family acts as the primary social and ethical educational incubator for value building.",
        wrongOptions: [
          "প্রাথমিক বিদ্যালয় আনুষ্ঠানিক শিক্ষার জায়গা কিন্তু মূল্যবোধ তার পূর্বেই বিকশিত হয়।"
        ]
      }
    }
  ],
  math_reasoning: [
    {
      text: "বার্ষিক ১০% সরল সুদে কত বছরে আসল সুদে-আসলে দ্বিগুণ হবে?",
      options: ["১০ বছর", "৫ বছর", "৮ বছর", "১২ বছর"],
      correctIndex: 0,
      explanations: {
        bn: "সরল সুদের ক্ষেত্রে আসল দ্বিগুণ হলে সুদের পরিমাণ আসলের সমান হয়। সময় = ১০০ / সুদের হার = ১০০ / ১০ = ১০ বছর।",
        en: "Simple interest doubling time = 100 / Rate = 100 / 10 = 10 years.",
        wrongOptions: ["৫ বছর অপশনটি ২০% হরের ক্ষেত্রে প্রযোজ্য।"]
      }
    },
    {
      text: "যদি x + y = 12 এবং x - y = 2 হয়, তবে xy এর মান কত?",
      options: ["৩৫", "২৪", "৪৮", "৩০"],
      correctIndex: 0,
      explanations: {
        bn: "যোগ করে পাই 2x = 14 => x = 7, বিয়োগ করে পাই 2y = 10 => y = 5। অতএব xy = 7 * 5 = ৩৫।",
        en: "Solving equations x+y=12, x-y=2 gives x=7, y=5. So xy = 35.",
        wrongOptions: ["অন্যান্য বিকল্পগুলো হিসাবের ভুলের জন্য ভুল ফলাফল নির্দেশ করে।"]
      }
    }
  ],
  mental_ability: [
    {
      text: "একটি দেয়াল ঘড়িতে যখন ৪টা বাজে তখন ঘন্টার কাঁটা ও মিনিটের কাঁটার মধ্যবর্তী কোণ কত ডিগ্রি থাকে?",
      options: ["১২০°", "১১০°", "১৩০°", "৯০°"],
      correctIndex: 0,
      explanations: {
        bn: "প্রতি ঘণ্টায় ঘড়ির কাঁটা ৩০ ডিগ্রি ঘুরে। ৪ ঘণ্টায় ৩*৪ = ১২০ ডিগ্রি কোণ উৎপন্ন হবে।",
        en: "At 4 o'clock, the angle is 4 * 30 = 120 degrees.",
        wrongOptions: ["অন্যান্য বিকল্পগুলো কোণটির ভুল গাণিতিক অবস্থান নির্দেশ করে।"]
      }
    }
  ]
};

export function mapToCorpusKey(subjectName: string): string {
  const norm = (subjectName || "").toLowerCase();
  
  if (norm.includes("বাংলাদেশ") || norm.includes("bangladesh") || norm.includes("affairs")) {
    return "bangladesh";
  }
  if (norm.includes("বাংলা") || norm.includes("bengali") || norm.includes("bangla")) {
    return "bangla";
  }
  if (norm.includes("english") || norm.includes("ইংরেজি") || norm.includes("eng")) {
    return "english";
  }
  if (norm.includes("আন্তর্জাতিক") || norm.includes("international") || norm.includes("glob")) {
    return "international";
  }
  if (norm.includes("গণিত") || norm.includes("গাণিতিক") || norm.includes("math")) {
    return "math_reasoning";
  }
  if (norm.includes("মানসিক") || norm.includes("mental") || norm.includes("ability") || norm.includes("দক্ষতা")) {
    return "mental_ability";
  }
  if (norm.includes("বিজ্ঞান") || norm.includes("science")) {
    return "science";
  }
  if (norm.includes("কম্পিউটার") || norm.includes("আইসিটি") || norm.includes("computer") || norm.includes("ict") || norm.includes("it")) {
    return "computer_it";
  }
  if (norm.includes("ভৌগোলিক") || norm.includes("ভূগোল") || norm.includes("দুর্যোগ") || norm.includes("geography") || norm.includes("disaster")) {
    return "geography";
  }
  if (norm.includes("নৈতিকতা") || norm.includes("মূল্যবোধ") || norm.includes("সুশাসন") || norm.includes("ethics") || norm.includes("values")) {
    return "ethics";
  }
  
  return "bangladesh";
}

export function getProceduralQuestionsForSubject(
  subjectName: string,
  count: number,
  topic: string,
  difficulty: string,
  seedOffset: number = 0
): any[] {
  const corpusKey = mapToCorpusKey(subjectName);
  const pool = SYLLABUS_CORPUS[corpusKey] || SYLLABUS_CORPUS["bangladesh"];
  const qs: any[] = [];
  
  for (let i = 0; i < count; i++) {
    const originalQ = pool[(i + seedOffset) % pool.length];
    const options = [...originalQ.options];
    const correctValue = options[originalQ.correctIndex];
    
    // Deterministic shuffling of options based on index
    const shuffleSeed = (i + seedOffset * 3) % options.length;
    for (let j = options.length - 1; j > 0; j--) {
      const k = (shuffleSeed * 7 + j * 13) % options.length;
      const t = options[j];
      options[j] = options[k];
      options[k] = t;
    }
    const correctIndex = options.indexOf(correctValue);
    
    let finalSelection = {
      text: originalQ.text,
      options,
      correctIndex: correctIndex >= 0 ? correctIndex : 0,
      explanations: {
        bn: originalQ.explanations.bn,
        en: originalQ.explanations.en,
        wrongOptions: [...originalQ.explanations.wrongOptions]
      }
    };
    
    // Seeded math variations
    if (corpusKey === "math_reasoning" && originalQ.text.includes("সরল সুদে")) {
      const rates = [5, 10, 20, 25, 8];
      const rateIdx = (i + seedOffset) % rates.length;
      const rate = rates[rateIdx];
      
      let yearsStr = "১০ বছর";
      if (rate === 5) yearsStr = "২০ বছর";
      else if (rate === 10) yearsStr = "১০ বছর";
      else if (rate === 20) yearsStr = "৫ বছর";
      else if (rate === 25) yearsStr = "৪ বছর";
      else if (rate === 8) yearsStr = "১২.৫ বছর";
      
      const newText = `বার্ষিক ${rate}% সরল সুদে কত বছরে আসল সুদে-আসলে দ্বিগুণ হবে?`;
      const choices = [yearsStr, "৬ বছর", "৮ বছর", "১৫ বছর"];
      const finalChoices = [...choices];
      for (let j = finalChoices.length - 1; j > 0; j--) {
        const k = (i * 3 + j) % finalChoices.length;
        const temp = finalChoices[j];
        finalChoices[j] = finalChoices[k];
        finalChoices[k] = temp;
      }
      const cIdx = finalChoices.indexOf(yearsStr);
      
      finalSelection = {
        text: newText,
        options: finalChoices,
        correctIndex: cIdx >= 0 ? cIdx : 0,
        explanations: {
          bn: `আসল দ্বিগুণ হতে হলে অর্জিত সরল সুদের পরিমাণ আসলের সমান (I = P) হতে হবে। সুতরাং সরল সুদের সূত্রানুসারে: সময় = ১০০ / সুদের হার = ১০০ / ${rate} = ${rate === 8 ? "১২.৫" : 100/rate} বছর।`,
          en: `Under simple interest formula, doubling time t = 100 / Rate = 100 / ${rate} = ${rate === 8 ? "12.5" : 100/rate} years.`,
          wrongOptions: ["অন্যান্য বিকল্পগুলো ভুল গাণিতিক হিসাব বা জটিল সুদের কারণে বিভ্রান্তিকর হতে পারে।"]
        }
      };
    } else if (corpusKey === "math_reasoning" && originalQ.text.includes("xy এর মান")) {
      const sumAndDiffs = [
         { s: 12, d: 2, ans: "৩৫", x: 7, y: 5 },
         { s: 10, d: 2, ans: "২৪", x: 6, y: 4 },
         { s: 8, d: 4, ans: "১২", x: 6, y: 2 },
         { s: 14, d: 2, ans: "৪৮", x: 8, y: 6 }
      ];
      const tuple = sumAndDiffs[(i + seedOffset) % sumAndDiffs.length];
      const newText = `যদি x + y = ${tuple.s} এবং x - y = ${tuple.d} হয়, তবে xy এর সঠিক মান নিচের কোনটি?`;
      const choices = [tuple.ans, "৩০", "২০", "১৬"];
      const finalChoices = [...choices];
      for (let j = finalChoices.length - 1; j > 0; j--) {
        const k = (i * 3 + j) % finalChoices.length;
        const temp = finalChoices[j];
        finalChoices[j] = finalChoices[k];
        finalChoices[k] = temp;
      }
      const cIdx = finalChoices.indexOf(tuple.ans);
      
      finalSelection = {
        text: newText,
        options: finalChoices,
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
      difficulty: difficulty,
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
