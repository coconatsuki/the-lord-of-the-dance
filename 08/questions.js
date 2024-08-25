const questions = [
  {
    question: "What is the origin of the word 'ballet'?",
    answers: ["Italian", "French", "Spanish", "Russian", "Greek"],
    correctAnswer: 0,
  },
  {
    question:
      "What ancient civilization is believed to have performed the earliest recorded dance rituals?",
    answers: [
      "The Egyptians",
      "The Greeks",
      "The Mesopotamians",
      "The Chinese",
      "The Mayans",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "What was the original purpose of the Haka, a traditional dance of the Māori people of New Zealand?",
    answers: [
      "Celebration of a successful hunt",
      "Welcoming guests",
      "Preparing warriors for battle",
      "Mourning the dead",
      "Marriage ceremony",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "In which culture is the dance form known as 'Butoh' characterized by slow, controlled movements and often an exploration of darkness or grotesque imagery?",
    answers: ["Japanese", "Indian", "Chinese", "Cambodian", "Tibetan"],
    correctAnswer: 0,
  },
  {
    question:
      "Which dance form originated as a court dance in France and was later adapted into ballet?",
    answers: ["Polonaise", "Pavane", "Mazurka", "Gigue", "Tarantella"],
    correctAnswer: 1,
  },
  {
    question:
      "Which dance was banned by the Catholic Church in the 14th century for its association with pagan rituals?",
    answers: ["Flamenco", "Tarantella", "Maypole Dance", "Morris Dance", "Jig"],
    correctAnswer: 2,
  },
  {
    question:
      "What is the name of the traditional dance of the Basque people that involves jumping and intricate footwork?",
    answers: ["Zorba", "Fandango", "Jota", "Aurresku", "Sardana"],
    correctAnswer: 3,
  },
  {
    question:
      "What is the origin of the 'Cakewalk,' a dance that became popular in the late 19th century?",
    answers: [
      "It was a competition dance among enslaved African Americans, where the winner received a cake.",
      "It was a ballroom dance from France involving a balancing act with cakes.",
      "It originated from Victorian England as a children’s dance during tea parties.",
      "It was part of a religious ritual in the Caribbean where cakes were offered to gods.",
      "It started in Ireland as a folk dance, where cakes were part of the celebration.",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "Which dance is traditionally performed in a circle and is a significant part of Greek culture?",
    answers: ["Sirtaki", "Syrtos", "Tsikoudia", "Kleftiko", "Mastika"],
    correctAnswer: 0,
  },
  {
    question:
      "What is the primary purpose of the traditional Hawaiian dance called 'Hula'?",
    answers: [
      "Telling stories through movement",
      "Demonstrating physical strength",
      "Celebrating the harvest",
      "Honoring ancestors",
      "Practicing martial arts",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "Which dance is an integral part of the Day of the Dead celebrations in Mexico?",
    answers: [
      "La Danza de los Viejitos",
      "La Danza de los Muertos",
      "El baile de las Abuelitas",
      "El baile de los Borrachitos",
      "La Danza de los Ancianos",
    ],
    correctAnswer: 0,
  },
  {
    question: "In which culture did the 'Kabuki' dance-drama originate?",
    answers: ["Japan", "China", "India", "Korea", "Thailand"],
    correctAnswer: 0,
  },
  {
    question:
      "The traditional Russian dance 'Kalinka' is characterized by what type of movement?",
    answers: [
      "High-energy squatting and kicking",
      "Slow, graceful spins",
      "Arm waving and head nodding",
      "Hand clapping and stomping",
      "Jumping and spinning",
    ],
    correctAnswer: 0,
  },
  {
    question: "The 'Mambo' dance originated in which country?",
    answers: ["Cuba", "Brazil", "Argentina", "Mexico", "Dominican Republic"],
    correctAnswer: 0,
  },
  {
    question:
      "Which dance form is associated with the Mardi Gras celebrations in New Orleans?",
    answers: ["Second Line", "Samba", "Cha-Cha", "Merengue", "Bossa Nova"],
    correctAnswer: 0,
  },
  {
    question: "The 'Polka' dance originated in which European country?",
    answers: ["Czech Republic", "Poland", "Germany", "Hungary", "Austria"],
    correctAnswer: 0,
  },
  {
    question:
      "Which dance is often performed at celebrations in South Africa, featuring elaborate footwork and rhythmic clapping?",
    answers: [
      "Gumboot Dance",
      "Zulu Dance",
      "Mbube Dance",
      "Vusi Dance",
      "Marabi Dance",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "What is the purpose of the 'Bollywood' dance style often seen in Indian films?",
    answers: [
      "Storytelling through movement",
      "Demonstrating athletic ability",
      "Expressing sorrow and loss",
      "Honoring the gods",
      "Promoting physical fitness",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "The traditional Indian dance 'Bharatanatyam' is known for its intricate hand gestures and storytelling. What is the primary purpose of these hand gestures?",
    answers: [
      "To represent elements of nature",
      "To mimic the movements of animals",
      "To tell stories and convey emotions",
      "To bless the audience",
      "To create rhythm with clapping motions",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "The 'Tarantella' dance, often associated with Southern Italy, was historically believed to be a cure for what?",
    answers: [
      "Snake bites",
      "Poisonous spider bites",
      "Bad luck",
      "Infertility",
      "A broken heart",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "Which traditional Japanese dance is performed during the summer, to honor the spirits of ancestors?",
    answers: ["Bon Odori", "Noh", "Kabuki", "Butoh", "Kagura"],
    correctAnswer: 0,
  },
  {
    question:
      "The 'Hula' dance, originating from Hawaii, uses what accessories to enhance the storytelling?",
    answers: [
      "Leis and grass skirts",
      "Shell necklaces and feathers",
      "Drums and bamboo sticks",
      "Fans and scarves",
      "Wooden clappers and anklets",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "In the traditional Viennese Waltz, the dancers move in what distinctive pattern?",
    answers: ["Circular", "Zigzag", "Linear", "Square", "Figure-eight"],
    correctAnswer: 0,
  },
  {
    question:
      "The dance 'Kathak' is one of the eight classical dances of India. What is a distinctive feature of this dance form?",
    answers: [
      "Rhythmic footwork and spins",
      "Fast-paced arm movements",
      "Acrobatics and flips",
      "Leaps and jumps",
      "Use of scarves and fans",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "In traditional Scottish Highland dance, which competition event involves dancing over crossed blades on the ground?",
    answers: [
      "Sword Dance",
      "Blade Reel",
      "Dagger Fling",
      "Pike Jig",
      "Saber Strathspey",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "The social dance 'Salsa' originated from a blend of which two cultures?",
    answers: [
      "Afro-Cuban and Puerto Rican",
      "Brazilian and Spanish",
      "Caribbean and African American",
      "Mexican and Dominican",
      "Argentine and Portuguese",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "What traditional Filipino dance involves dancers skillfully moving between bamboo poles clapped together on the ground?",
    answers: [
      "Tinikling",
      "Cariñosa",
      "Pandanggo",
      "Sayaw sa Bangko",
      "Maglalatik",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "Which dance, known for its lively tempo and use of castanets, is often performed during Spanish bullfighting events?",
    answers: ["Paso Doble", "Fandango", "Bolero", "Sevillanas", "Sardana"],
    correctAnswer: 0,
  },
  {
    question:
      "Which traditional dance from Hungary features a distinctive fast tempo and energetic leaps?",
    answers: ["Csárdás", "Mazurka", "Polonaise", "Krakowiak", "Tarantella"],
    correctAnswer: 0,
  },
  {
    question:
      "The ancient Egyptian dance known as 'Raqs Sharqi' is more commonly known in the West by what name?",
    answers: [
      "Belly Dance",
      "Sword Dance",
      "Fan Dance",
      "Veil Dance",
      "Lotus Dance",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "The traditional Ukrainian dance 'Hopak' is often performed at which events?",
    answers: [
      "Weddings and celebrations",
      "Religious ceremonies",
      "Harvest festivals",
      "Military parades",
      "Funerals and memorials",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "In the Balinese dance tradition, which dance is performed to depict the battle between good and evil?",
    answers: [
      "Barong Dance",
      "Kecak Dance",
      "Legong Dance",
      "Pendet Dance",
      "Topeng Dance",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "The 'Polka' dance originated in which European country during the 19th century?",
    answers: ["Czech Republic", "Austria", "Germany", "Poland", "Hungary"],
    correctAnswer: 0,
  },
  {
    question:
      "In Brazilian culture, the 'Forró' is a dance style traditionally associated with what?",
    answers: [
      "Folk festivals and harvest celebrations",
      "Weddings and engagements",
      "Carnival and street parades",
      "Religious pilgrimages",
      "Protests and political movements",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "The 'Merengue,' a popular dance from the Dominican Republic, has a characteristic rhythm that is often described as resembling what?",
    answers: [
      "The sound of dragging one leg",
      "The beat of a horse's gallop",
      "The sway of ocean waves",
      "The flutter of bird wings",
      "The crack of a whip",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "The traditional Russian dance 'Kalinka' is characterized by which type of movement?",
    answers: [
      "Energetic squats and kicks",
      "Fast spins and twirls",
      "Graceful slides and glides",
      "Heavy stomps and claps",
      "Partnered lifts and dips",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "Which Middle Eastern dance style is known for its use of elaborate finger cymbals (zills)?",
    answers: ["Belly Dance", "Dabke", "Khaleegy", "Tanoura", "Raqs Baladi"],
    correctAnswer: 0,
  },
  {
    question:
      "The traditional Chinese dance 'Dragon Dance' is performed during which festival?",
    answers: [
      "Lunar New Year",
      "Mid-Autumn Festival",
      "Qingming Festival",
      "Lantern Festival",
      "Spring Festival",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "The Greek dance 'Zeibekiko' is unique because it is traditionally performed by:",
    answers: [
      "Solo male dancers expressing emotion",
      "Couples in close embrace",
      "Large groups forming circles",
      "Young women balancing jugs of water",
      "Children mimicking animal movements",
    ],
    correctAnswer: 0,
  },
];
