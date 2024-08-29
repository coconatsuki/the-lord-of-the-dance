const questions = [
  {
    question:
      "In J.R.R. Tolkien's Middle-earth, what is the name of the first Elven city built in Aman?",
    answers: ["Gondolin", "Tirion", "Rivendell", "Lothlórien", "Valimar"],
    correctAnswer: 1,
  },
  {
    question:
      "Which Elven character in 'The Lord of the Rings' was known as the Lady of the Wood?",
    answers: ["Arwen", "Galadriel", "Lúthien", "Eowyn", "Elwing"],
    correctAnswer: 1,
  },
  {
    question:
      "In Irish folklore, what is the traditional offering left out to appease the Aos Sí (Elves)?",
    answers: [
      "A bowl of milk",
      "A silver coin",
      "A piece of bread",
      "A lock of hair",
      "A ring of flowers",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "What was the name of the High King of the Elves who ruled over all of Beleriand?",
    answers: ["Thingol", "Gil-galad", "Fëanor", "Turgon", "Elu Thingol"],
    correctAnswer: 1,
  },
  {
    question: "In 'The Silmarillion,' which Elf created the Silmarils?",
    answers: ["Fingolfin", "Galadriel", "Fëanor", "Thingol", "Maedhros"],
    correctAnswer: 2,
  },
  {
    question:
      "Which Elven race is known for their close relationship with the forest and trees?",
    answers: ["Sindar", "Noldor", "Teleri", "Silvan", "Avari"],
    correctAnswer: 3,
  },
  {
    question:
      "In Tolkien's works, what gift did Galadriel give to Frodo Baggins?",
    answers: [
      "A sword",
      "A phial of light",
      "A bow",
      "An elven cloak",
      "A ring of power",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "What is the Elvish word for 'friend' that Gandalf speaks to open the doors of Moria?",
    answers: ["Mellon", "Gwaith", "Mae", "Estel", "Galad"],
    correctAnswer: 0,
  },
  {
    question:
      "In Irish mythology, what is the name of the land where the Elves or fairies are said to live?",
    answers: ["Tír na nÓg", "Avalon", "Eldamar", "Fólkvangr", "Asgard"],
    correctAnswer: 0,
  },
  {
    question:
      "Which Elven king in 'The Hobbit' imprisons Thorin and his company?",
    answers: ["Elrond", "Thranduil", "Gil-galad", "Thingol", "Círdan"],
    correctAnswer: 1,
  },
  {
    question:
      "What was the name of the sword carried by the Elf Glorfindel in 'The Lord of the Rings'?",
    answers: ["Hadhafang", "Glamdring", "Orcrist", "Aeglos", "Eldacar"],
    correctAnswer: 3,
  },
  {
    question:
      "In Tolkien's legendarium, what is the name of the island where the Elves go to live in peace?",
    answers: ["Valinor", "Numenor", "Beleriand", "Tol Eressëa", "Middle-earth"],
    correctAnswer: 3,
  },
  {
    question:
      "What is the name of the Elven ship that carried Frodo to the Undying Lands?",
    answers: ["Vingilótë", "Eärrámë", "Alqualondë", "Rána", "Amanel"],
    correctAnswer: 0,
  },
  {
    question:
      "In Irish folklore, what is the other name commonly given to elves?",
    answers: [
      "Fomorians",
      "Firbolgs",
      "Tuatha Dé Danann",
      "Banshees",
      "Leprechauns",
    ],
    correctAnswer: 2,
  },
  {
    question:
      "Which of these Elves was not a member of the Fellowship of the Ring?",
    answers: ["Legolas", "Elrond", "Galadriel", "Haldir", "Thranduil"],
    correctAnswer: 0,
  },
  {
    question:
      "What is the name of the jewel that Beren and Lúthien sought to retrieve?",
    answers: ["Nenya", "Narya", "Vilya", "Silmaril", "Elessar"],
    correctAnswer: 3,
  },
  {
    question:
      "Which Elven city is described as being hidden within the Encircling Mountains?",
    answers: ["Gondolin", "Rivendell", "Lothlórien", "Eregion", "Menegroth"],
    correctAnswer: 0,
  },
  {
    question: "What race of Elves did Elrond belong to?",
    answers: ["Vanyar", "Noldor", "Teleri", "Sindar", "Half-elven"],
    correctAnswer: 4,
  },
  {
    question: "What was the primary skill of the Teleri Elves?",
    answers: ["Archery", "Smithing", "Sailing", "Hunting", "Healing"],
    correctAnswer: 2,
  },
  {
    question:
      "In Tolkien's mythology, which of these Elven artifacts is NOT a ring of power?",
    answers: ["Narya", "Nenya", "Vilya", "Anglachel", "None of the above"],
    correctAnswer: 3,
  },
  {
    question: "Which Elf was one of the creators of the language Quenya?",
    answers: ["Thingol", "Fëanor", "Galadriel", "Finwë", "Maeglin"],
    correctAnswer: 1,
  },
  {
    question: "In 'The Hobbit,' which Elven stronghold is located in Mirkwood?",
    answers: [
      "Gondolin",
      "Rivendell",
      "Lothlórien",
      "Thranduil's Halls",
      "Mithlond",
    ],
    correctAnswer: 3,
  },
  {
    question: "Which of these Elves was NOT part of the White Council?",
    answers: ["Galadriel", "Thranduil", "Elrond", "Gandalf", "Saruman"],
    correctAnswer: 1,
  },
  {
    question:
      "What is the name of the Elven blade that glows blue when orcs are near?",
    answers: ["Glamdring", "Orcrist", "Andúril", "Sting", "Angrist"],
    correctAnswer: 3,
  },
  {
    question: "Who was the first King of the Elves in Middle-earth?",
    answers: ["Elu Thingol", "Finwë", "Ingwë", "Olwë", "Círdan"],
    correctAnswer: 0,
  },
  {
    question:
      "What event led to the creation of the Kinslaying among the Elves?",
    answers: [
      "The forging of the Silmarils",
      "The rebellion of Fëanor",
      "The War of Wrath",
      "The betrayal of Maeglin",
      "The flight of the Noldor",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "In 'The Silmarillion,' who was the leader of the Noldor who returned to Middle-earth after the theft of the Silmarils?",
    answers: ["Fingolfin", "Fëanor", "Finwë", "Maedhros", "Turgon"],
    correctAnswer: 1,
  },
  {
    question:
      "Which Elven character in 'The Lord of the Rings' was once a ring-bearer?",
    answers: ["Galadriel", "Elrond", "Círdan", "Gandalf", "All of the above"],
    correctAnswer: 4,
  },
  {
    question:
      "Which of these Elves is known as the greatest singer in Middle-earth?",
    answers: ["Lúthien", "Galadriel", "Finrod", "Thingol", "Arwen"],
    correctAnswer: 0,
  },
  {
    question:
      "In Tolkien’s legendarium, who is known as the 'Greatest of the Eldar'?",
    answers: ["Elrond", "Finwë", "Lúthien", "Fëanor", "Galadriel"],
    correctAnswer: 3,
  },
  {
    question:
      "Which elven kingdom was hidden in a forest surrounded by a ring of enchanted rivers?",
    answers: ["Lothlórien", "Doriath", "Rivendell", "Gondolin", "Eregion"],
    correctAnswer: 1,
  },
  {
    question: "Which Elven character was married to Aragorn, King of Gondor?",
    answers: ["Éowyn", "Galadriel", "Arwen", "Lúthien", "Celebrían"],
    correctAnswer: 2,
  },
  {
    question:
      "In Irish folklore, what is a common trait associated with the Aos Sí (Elves)?",
    answers: [
      "Immortality",
      "Shape-shifting",
      "Invisibility",
      "Flight",
      "Water control",
    ],
    correctAnswer: 0,
  },
  {
    question:
      "Which of the following Elven cities was founded by Galadriel and Celeborn?",
    answers: ["Tirion", "Lothlórien", "Gondolin", "Eregion", "Menegroth"],
    correctAnswer: 3,
  },
  {
    question:
      "In 'The Silmarillion,' who leads the Elves in the battle against Morgoth during the War of Wrath?",
    answers: ["Turgon", "Thingol", "Gil-galad", "Elrond", "Glorfindel"],
    correctAnswer: 2,
  },
  {
    question:
      "What is the Quenya word for 'Star' that is also part of many Elven names?",
    answers: ["Anor", "Elen", "Aldar", "Mith", "Calen"],
    correctAnswer: 1,
  },
  {
    question:
      "What is the name of the sacred tree in Valinor, from which the sun and moon were created?",
    answers: ["Laurelin", "Telperion", "Yavanna", "Celeborn", "Mallorn"],
    correctAnswer: 0,
  },
  {
    question:
      "In Tolkien's mythology, who was the last High King of the Noldor?",
    answers: ["Fingolfin", "Turgon", "Finarfin", "Gil-galad", "Maedhros"],
    correctAnswer: 3,
  },
  {
    question:
      "Which Elven character played a key role in the downfall of the Necromancer at Dol Guldur?",
    answers: ["Legolas", "Galadriel", "Elrond", "Glorfindel", "Thranduil"],
    correctAnswer: 1,
  },
  {
    question:
      "What is the name of the light captured in a phial given to Frodo by Galadriel?",
    answers: [
      "Light of the Two Trees",
      "Light of Elendil",
      "Light of Arda",
      "Light of Valinor",
      "Light of Eärendil",
    ],
    correctAnswer: 4,
  },
  {
    question:
      "In Irish folklore, what time of day is believed to be when the Aos Sí (Elves) are most active?",
    answers: ["Dawn", "Midday", "Dusk", "Midnight", "Afternoon"],
    correctAnswer: 3,
  },
  {
    question:
      "Which of these is a title given to Elrond in 'The Lord of the Rings'?",
    answers: [
      "Lord of Lothlórien",
      "High King of the Noldor",
      "Master of Rivendell",
      "King of Gondolin",
      "Warden of the North",
    ],
    correctAnswer: 2,
  },
  {
    question: "Which Elven realm was also known as 'The Hidden Kingdom'?",
    answers: ["Rivendell", "Lothlórien", "Gondolin", "Doriath", "Eregion"],
    correctAnswer: 2,
  },
  {
    question:
      "What was the original name of the Elves before they awoke in Middle-earth?",
    answers: ["Minyar", "Eldar", "Quendi", "Avari", "Vanyar"],
    correctAnswer: 2,
  },
  {
    question: "Which Elven character founded the city of Gondolin?",
    answers: ["Finwë", "Turgon", "Fëanor", "Thingol", "Fingolfin"],
    correctAnswer: 1,
  },
  {
    question:
      "In 'The Hobbit,' what treasure was sought by both Thorin Oakenshield and Thranduil?",
    answers: [
      "The Arkenstone",
      "The Silmarils",
      "The Mithril Crown",
      "The Dragon's Gold",
      "The Emerald of Girion",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which Elven realm did Legolas come from?",
    answers: ["Lothlórien", "Gondolin", "Mirkwood", "Rivendell", "Doriath"],
    correctAnswer: 2,
  },
  {
    question: "Which Elven king was granted one of the Three Rings of Power?",
    answers: ["Thingol", "Thranduil", "Gil-galad", "Elrond", "Fingolfin"],
    correctAnswer: 3,
  },
  {
    question:
      "In Irish folklore, what is a 'Fairy Rath' commonly believed to be?",
    answers: [
      "A magical forest",
      "A fairy mound",
      "An enchanted river",
      "A cursed stone",
      "A protective circle",
    ],
    correctAnswer: 1,
  },
  {
    question:
      "What is the name of the Elven sword given to Aragorn by Galadriel?",
    answers: ["Glamdring", "Andúril", "Narsil", "Hadhafang", "Aiglos"],
    correctAnswer: 3,
  },
  {
    question:
      "Which of the following Elves fought in the Last Alliance against Sauron?",
    answers: ["Galadriel", "Legolas", "Gil-galad", "Thranduil", "Glorfindel"],
    correctAnswer: 2,
  },
  {
    question: "Which Elven character gave Frodo and Sam their Elven cloaks?",
    answers: ["Elrond", "Galadriel", "Arwen", "Haldir", "Legolas"],
    correctAnswer: 1,
  },
  {
    question:
      "In Tolkien's works, what is the name of the Elven city in the Misty Mountains?",
    answers: ["Gondolin", "Rivendell", "Mithlond", "Doriath", "Nargothrond"],
    correctAnswer: 1,
  },
  {
    question: "Who was the creator of the Elven Rings of Power?",
    answers: ["Sauron", "Fëanor", "Celebrimbor", "Galadriel", "Melkor"],
    correctAnswer: 2,
  },

  {
    question:
      "In 'The Lord of the Rings,' what was the gift Galadriel gave to Gimli?",
    answers: ["A sword", "A golden hair", "A jewel", "A shield", "A dagger"],
    correctAnswer: 1,
  },
  {
    question:
      "In Tolkien's lore, which Elf was known as the greatest craftsman of Middle-earth?",
    answers: ["Fëanor", "Maedhros", "Celebrimbor", "Finrod", "Eöl"],
    correctAnswer: 2,
  },
  {
    question:
      "What was the name of the Elven kingdom that was destroyed by Morgoth's forces?",
    answers: ["Gondolin", "Rivendell", "Lothlórien", "Eregion", "Doriath"],
    correctAnswer: 0,
  },
  {
    question: "Which Elven character is known as the father of Elrond?",
    answers: ["Gil-galad", "Fingolfin", "Eärendil", "Turgon", "Maedhros"],
    correctAnswer: 2,
  },
  {
    question:
      "In Irish folklore, which of these is a common offering to the Aos Sí (Elves)?",
    answers: ["Silver coins", "Milk", "Salt", "Bread", "Honey"],
    correctAnswer: 4,
  },
  {
    question:
      "What was the name of the fortress built by Sauron in the land of Mordor?",
    answers: ["Orthanc", "Barad-dûr", "Minas Morgul", "Dol Guldur", "Angband"],
    correctAnswer: 1,
  },
  {
    question:
      "Which Elven character was called 'Evenstar' in 'The Lord of the Rings'?",
    answers: ["Galadriel", "Lúthien", "Arwen", "Éowyn", "Elwing"],
    correctAnswer: 2,
  },
  {
    question: "Which of these Elves was not present at the Council of Elrond?",
    answers: ["Legolas", "Elrond", "Glorfindel", "Arwen", "Galdor"],
    correctAnswer: 3,
  },
  {
    question:
      "In Tolkien's lore, which of the following was NOT one of the Three Rings of the Elves?",
    answers: ["Narya", "Nenya", "Vilya", "Angainor", "Narya"],
    correctAnswer: 3,
  },
  {
    question: "Which Elven realm is also known as the 'Woodland Realm'?",
    answers: ["Lothlórien", "Doriath", "Rivendell", "Mirkwood", "Eregion"],
    correctAnswer: 3,
  },
  {
    question: "In Irish folklore, what is the Aos Sí believed to be?",
    answers: [
      "Ghosts of the dead",
      "Nature spirits",
      "Ancient gods",
      "Cursed humans",
      "Guardians of treasure",
    ],
    correctAnswer: 2,
  },
  {
    question: "Which Elf is known for his part in the forging of the One Ring?",
    answers: ["Elrond", "Galadriel", "Sauron", "Fëanor", "Celebrimbor"],
    correctAnswer: 4,
  },
  {
    question:
      "In Tolkien’s works, who is known as the 'Lady of the Golden Wood'?",
    answers: ["Galadriel", "Arwen", "Éowyn", "Elwing", "Yavanna"],
    correctAnswer: 0,
  },
  {
    question: "Which of these Elven characters was the father of Legolas?",
    answers: ["Celeborn", "Elrond", "Thranduil", "Fëanor", "Glorfindel"],
    correctAnswer: 2,
  },
  {
    question:
      "Which Elven city was known as 'The Last Homely House East of the Sea'?",
    answers: ["Lothlórien", "Gondolin", "Rivendell", "Doriath", "Mirkwood"],
    correctAnswer: 2,
  },
];
