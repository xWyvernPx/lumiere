import { ActivityMetadata } from "../types/activity";

export const ACTIVITIES: ActivityMetadata[] = [
  {
    id: "activity-1",
    type: "READING_SESSION",
    title: "La réforme écologique",
    description:
      "Read an excerpt from Le Monde on environmental reforms. Answer comprehension questions in French context.",
    level: "DELF B2",
    format: "Compréhension Écrite",
    data: {
      topic: "Politics",
      readTime: "5 Min Read",
      title: "Le gouvernement annonce une nouvelle réforme écologique majeure.",
      author: "L'Équipe Rédactionnelle",
      extractedDate: "Oct 24, 2026",
      paragraphs: [
        "Face à l'urgence climatique, le Premier ministre a dévoilé mardi un plan ambitieux visant à réduire les émissions de gaz à effet de serre de 50% d'ici 2030. Cette annonce, très attendue par les associations environnementales, marque un tournant décisif.",
        "Le projet de loi, qui sera débattu à l'Assemblée nationale dès le mois prochain, prévoit des investissements massifs dans les énergies renouvelables et une taxe carbone renforcée pour les entreprises les plus polluantes. Selon les experts, cette transition bouleversera inévitablement le tissu économique industriel.",
        "Cependant, des voix s'élèvent déjà dans l'opposition pour dénoncer une mesure hâtive et potentiellement destructrice pour l'emploi ouvrier dans les régions manufacturières. Le défi pour le gouvernement sera de concilier impératif écologique et paix sociale.",
        'Les syndicats ont d\'ores et déjà annoncé une journée de mobilisation nationale. "Nous ne paierons pas pour la transition," a déclaré le porte-parole du principal syndicat. La situation reste donc particulièrement tendue.',
      ],
      questions: [
        {
          id: "q1",
          type: "Main Idea",
          question:
            "Quel est l'objectif principal du plan annoncé par le gouvernement ?",
          options: [
            { id: "a", text: "Créer de nouveaux emplois dans l'industrie." },
            {
              id: "b",
              text: "Réduire drastiquement les émissions polluantes d'ici 2030.",
              isCorrect: true,
            },
            { id: "c", text: "Augmenter les impôts des citoyens." },
          ],
        },
        {
          id: "q2",
          type: "Vocabulaire en Contexte",
          question:
            'Dans le deuxième paragraphe, que signifie le mot souligné "bouleversera" ?',
          options: [
            { id: "A", text: "Améliorera" },
            { id: "B", text: "Maintiendra" },
            { id: "C", text: "Perturbera", isCorrect: true },
            { id: "D", text: "Finira" },
          ],
        },
      ],
    },
  },
  {
    id: "activity-2",
    type: "VISUAL_MATCHER",
    title: "Visual Matcher: Domestic Life",
    description:
      "Match descriptive French statements and dialogues with their accurate visual representations. Enhance vocabulary recognition.",
    level: "DELF A1",
    format: "Multi-Visual",
    data: {
      questions: [
        {
          id: 1,
          prompt: "Le chat noir dort sur le canapé.",
          englishTranslation: "The black cat is sleeping on the sofa.",
          hint: "Look for 'chat noir' (black cat) and the action 'dort sur le canapé' (sleeps on the sofa).",
          options: [
            {
              id: 0,
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBehs-C432tjROTJxpJ3OOKvWRuRwHllIyAge7CTSHN2lt3S1cWEmlpjdxjhnGtLclKDzRwN3FZcvCl41CAEkuuSruC6kz7CXSh5PgGy03ntSnqHmB54fxiXhAs7TaItEwY9SS0Ct2iPT9yX3NeZzrNbbbN0oN0iO5uWJid4Iditd_NAG4AyPFiNL24h0bz_SHD4nFHQYAfEVM32eRc5WvwsaRSGj91kB9K41A9-amrMbpTDsAawCeu8G3TN2V0RJkTjEEqHtbmGxg",
              alt: "Black cat sleeping peacefully on a luxurious, classic sofa.",
              isCorrect: true,
            },
            {
              id: 1,
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyJlTRUKioqWtXKF_vi3_in_C6UywAlzFKSkuVbP9TJcm6zLk_crHYmIlsC7PRVItF-VO0SQ3dkkqkI1kuzub3NIaHe4TJ94644bVCVSBRR9cpR8f8fgAkCykEv51KQKU547ZjeYlw3pX67tiXkWqztpQSbJgQJoaJlh033IeH9n_AmLYdKSRAzdiIdZasfnCM_HxfYrZzDg4AkwJ52SAlP9QpLTz5Mr5_WEpxP0ie1dPo9fHBs5XcXj1qoznZ-bq1Xc_lL9bkXfE",
              alt: "Golden retriever dog sitting alertly next to a minimalist side table.",
              isCorrect: false,
            },
            {
              id: 2,
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYwIbicqwLQrUuOM7fllHjtRDKg6ubonHb5cOFvImwhMA_E5SWd1_2ga4VMc2FP7mWn5BQGr3QEIlUyqz7-IN4asYfUp8wpNAVkJLQjkA5NKYXf24gdKbVINiJoka7Tx_etaAJVdZt-JDerY8Y6gGFhDVF2bVMKPEDa-dcaNFhWkohEh_fTMdFOJPIQfsLQ9Ctt0MSSluhToeDBlAEKC0AZJkP3-ByeVRplEa88in9Vhc-yVasoGR7pHuzXmhmfxu_iiSf_jdgihM",
              alt: "White cat hiding underneath a stark, geometric dining table.",
              isCorrect: false,
            },
            {
              id: 3,
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9TAIykkx7OBY9RYq8ps8OR8U53r5wddSyOi1Q0oitbYIms7xl7z7td0OeVjgBQQ5jCFFsoIrS4TmOZqzvVPsWlIvZfNGBjaOckDxwteKpARqX5TB6GyFgPC2_rPkQQhloxi3U30PDsMaxMkFMfqqm27mlUzh0I1AXNlsfu5YCR8PxTBwjZQlN8xEpMaNLTT67htG_zloeuV6pgy2ocSGgxke6PuxV9tID9Vhh0EMk5tIh9abAX9SP08L-IHcjd5SgCL0-EX2jQvw",
              alt: "Black cat perched on a windowsill looking out.",
              isCorrect: false,
            },
          ],
        },
        {
          id: 2,
          prompt: "Le chien jaune attend sagement à côté de la table.",
          englishTranslation:
            "The yellow (golden) dog is waiting nicely next to the table.",
          hint: "Identify 'chien jaune' (yellow dog/golden retriever) and 'à côté de la table' (next to the table).",
          options: [
            {
              id: 0,
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYwIbicqwLQrUuOM7fllHjtRDKg6ubonHb5cOFvImwhMA_E5SWd1_2ga4VMc2FP7mWn5BQGr3QEIlUyqz7-IN4asYfUp8wpNAVkJLQjkA5NKYXf24gdKbVINiJoka7Tx_etaAJVdZt-JDerY8Y6gGFhDVF2bVMKPEDa-dcaNFhWkohEh_fTMdFOJPIQfsLQ9Ctt0MSSluhToeDBlAEKC0AZJkP3-ByeVRplEa88in9Vhc-yVasoGR7pHuzXmhmfxu_iiSf_jdgihM",
              alt: "White cat hiding underneath a stark, geometric dining table.",
              isCorrect: false,
            },
            {
              id: 1,
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyJlTRUKioqWtXKF_vi3_in_C6UywAlzFKSkuVbP9TJcm6zLk_crHYmIlsC7PRVItF-VO0SQ3dkkqkI1kuzub3NIaHe4TJ94644bVCVSBRR9cpR8f8fgAkCykEv51KQKU547ZjeYlw3pX67tiXkWqztpQSbJgQJoaJlh033IeH9n_AmLYdKSRAzdiIdZasfnCM_HxfYrZzDg4AkwJ52SAlP9QpLTz5Mr5_WEpxP0ie1dPo9fHBs5XcXj1qoznZ-bq1Xc_lL9bkXfE",
              alt: "Golden retriever dog sitting alertly next to a minimalist side table.",
              isCorrect: true,
            },
            {
              id: 2,
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBehs-C432tjROTJxpJ3OOKvWRuRwHllIyAge7CTSHN2lt3S1cWEmlpjdxjhnGtLclKDzRwN3FZcvCl41CAEkuuSruC6kz7CXSh5PgGy03ntSnqHmB54fxiXhAs7TaItEwY9SS0Ct2iPT9yX3NeZzrNbbbN0oN0iO5uWJid4Iditd_NAG4AyPFiNL24h0bz_SHD4nFHQYAfEVM32eRc5WvwsaRSGj91kB9K41A9-amrMbpTDsAawCeu8G3TN2V0RJkTjEEqHtbmGxg",
              alt: "Black cat sleeping peacefully on a luxurious, classic sofa.",
              isCorrect: false,
            },
            {
              id: 3,
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9TAIykkx7OBY9RYq8ps8OR8U53r5wddSyOi1Q0oitbYIms7xl7z7td0OeVjgBQQ5jCFFsoIrS4TmOZqzvVPsWlIvZfNGBjaOckDxwteKpARqX5TB6GyFgPC2_rPkQQhloxi3U30PDsMaxMkFMfqqm27mlUzh0I1AXNlsfu5YCR8PxTBwjZQlN8xEpMaNLTT67htG_zloeuV6pgy2ocSGgxke6PuxV9tID9Vhh0EMk5tIh9abAX9SP08L-IHcjd5SgCL0-EX2jQvw",
              alt: "Black cat perched on a windowsill looking out.",
              isCorrect: false,
            },
          ],
        },
        {
          id: 3,
          prompt: "Le chat blanc se cache sous la table.",
          englishTranslation: "The white cat is hiding under the table.",
          hint: "Identify 'chat blanc' (white cat) and the spatial preposition 'sous la table' (under the table).",
          options: [
            {
              id: 0,
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9TAIykkx7OBY9RYq8ps8OR8U53r5wddSyOi1Q0oitbYIms7xl7z7td0OeVjgBQQ5jCFFsoIrS4TmOZqzvVPsWlIvZfNGBjaOckDxwteKpARqX5TB6GyFgPC2_rPkQQhloxi3U30PDsMaxMkFMfqqm27mlUzh0I1AXNlsfu5YCR8PxTBwjZQlN8xEpMaNLTT67htG_zloeuV6pgy2ocSGgxke6PuxV9tID9Vhh0EMk5tIh9abAX9SP08L-IHcjd5SgCL0-EX2jQvw",
              alt: "Black cat perched on a windowsill looking out.",
              isCorrect: false,
            },
            {
              id: 1,
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyJlTRUKioqWtXKF_vi3_in_C6UywAlzFKSkuVbP9TJcm6zLk_crHYmIlsC7PRVItF-VO0SQ3dkkqkI1kuzub3NIaHe4TJ94644bVCVSBRR9cpR8f8fgAkCykEv51KQKU547ZjeYlw3pX67tiXkWqztpQSbJgQJoaJlh033IeH9n_AmLYdKSRAzdiIdZasfnCM_HxfYrZzDg4AkwJ52SAlP9QpLTz5Mr5_WEpxP0ie1dPo9fHBs5XcXj1qoznZ-bq1Xc_lL9bkXfE",
              alt: "Golden retriever dog sitting alertly next to a minimalist side table.",
              isCorrect: false,
            },
            {
              id: 2,
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCYwIbicqwLQrUuOM7fllHjtRDKg6ubonHb5cOFvImwhMA_E5SWd1_2ga4VMc2FP7mWn5BQGr3QEIlUyqz7-IN4asYfUp8wpNAVkJLQjkA5NKYXf24gdKbVINiJoka7Tx_etaAJVdZt-JDerY8Y6gGFhDVF2bVMKPEDa-dcaNFhWkohEh_fTMdFOJPIQfsLQ9Ctt0MSSluhToeDBlAEKC0AZJkP3-ByeVRplEa88in9Vhc-yVasoGR7pHuzXmhmfxu_iiSf_jdgihM",
              alt: "White cat hiding underneath a stark, geometric dining table.",
              isCorrect: true,
            },
            {
              id: 3,
              src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBehs-C432tjROTJxpJ3OOKvWRuRwHllIyAge7CTSHN2lt3S1cWEmlpjdxjhnGtLclKDzRwN3FZcvCl41CAEkuuSruC6kz7CXSh5PgGy03ntSnqHmB54fxiXhAs7TaItEwY9SS0Ct2iPT9yX3NeZzrNbbbN0oN0iO5uWJid4Iditd_NAG4AyPFiNL24h0bz_SHD4nFHQYAfEVM32eRc5WvwsaRSGj91kB9K41A9-amrMbpTDsAawCeu8G3TN2V0RJkTjEEqHtbmGxg",
              alt: "Black cat sleeping peacefully on a luxurious, classic sofa.",
              isCorrect: false,
            },
          ],
        },
      ],
    },
  },
  {
    id: "activity-3",
    type: "INTERACTIVE_CONTEXT_CLUE",
    title: "Interactive Context Clue",
    description:
      "Read a short paragraph and guess the meaning of highlighted vocabulary words based on context.",
    level: "DELF A2",
    format: "Context Reading",
    data: {
      title: "Lecture du Matin",
      parts: [
        {
          type: "text",
          content:
            "Chaque matin, je me réveille à sept heures. Je bois une tasse de café chaud et je mange un croissant ",
        },
        { type: "clue", clueId: "délicieux", content: "délicieux" },
        {
          type: "text",
          content:
            ". Ensuite, je lis le journal sur le balcon, même s'il fait un peu ",
        },
        { type: "clue", clueId: "froid", content: "froid" },
        { type: "text", content: " dehors." },
      ],
      clues: {
        délicieux: {
          id: "délicieux",
          word: "délicieux",
          options: [
            { id: "opt1", text: "Delicious", isCorrect: true },
            { id: "opt2", text: "Expensive", isCorrect: false },
            { id: "opt3", text: "Fast", isCorrect: false },
          ],
        },
        froid: {
          id: "froid",
          word: "froid",
          options: [
            { id: "opt1", text: "Cold", isCorrect: true },
            { id: "opt2", text: "Hot", isCorrect: false },
            { id: "opt3", text: "Dark", isCorrect: false },
          ],
        },
      },
    },
  },
  {
    id: "activity-4",
    type: "TEXT_RECONSTRUCTION",
    title: "Sentence Unscramble",
    description:
      "Drag and drop the scrambled sentences back into the correct, logical sequence.",
    level: "DELF A1/A2",
    format: "Text Reconstruction",
    data: {
      title: "La routine matinale",
      items: [
        { id: "s1", text: "Je me réveille à sept heures.", correctOrder: 0 },
        { id: "s2", text: "Je prends une douche rapide.", correctOrder: 1 },
        {
          id: "s3",
          text: "Je prépare mon petit-déjeuner et mon café.",
          correctOrder: 2,
        },
        {
          id: "s4",
          text: "Je sors de chez moi pour prendre le bus.",
          correctOrder: 3,
        },
      ],
    },
  },
  {
    id: "activity-5",
    type: "PHONEME_MATCHER",
    title: "Le Défi Phonétique",
    description:
      "Tests the user’s ability to pronounce specific tricky sounds (phonemes) using IPA (International Phonetic Alphabet) guides.",
    level: "DELF A1",
    format: "Phoneme Matcher",
    data: {
      targetWord: "Un an",
      ipaRepresentation: "/ɑ̃/",
      description:
        "Écoutez attentivement la prononciation du mot cible. Observez le placement de la bouche et reproduisez le son avec précision.",
    },
  },
  {
    id: "activity-6",
    title: "Defending a Thesis",
    type: "SPEAKING",
    description: "In exactly two minutes, defend the thesis that public transport should be free in all major metropolitan areas.",
    level: "B2 Upper Intermediate",
    format: "Speaking Practice",
    tags: ["Speaking", "Subjunctive"],
    data: {
      prompt: "In exactly two minutes, defend the thesis that public transport should be free in all major metropolitan areas.",
      context: "Focus on utilizing the subjunctive mood and formal rhetorical connectors."
    }
  }
];
