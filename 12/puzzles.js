const categories = ["Top", "Bottom", "Cloak", "Belt", "Hat"];
const options = {
  Top: ["Red Velvet Shirt", "Silk Blouse", "Cotton Shirt", "Linen Vest"],
  Bottom: ["Silk Trousers", "Leather Pants", "Cotton Trousers", "Linen Pants"],
  Cloak: ["Velvet Cloak", "Leather Jacket", "Cotton Cloak", "Linen Jacket"],
  Belt: ["Gold Belt", "Leather Belt", "Simple Rope Belt", "Silver Belt"],
  Hat: ["Velvet Hat", "Straw Hat", "Leather Cap", "Silk Hat"],
};

function evaluateCombination(selectedOptions, correctCombination, spareTime) {
  let correctCount = 0;
  for (let category in correctCombination) {
    if (selectedOptions[category] === correctCombination[category]) {
      correctCount++;
    }
  }

  // Provide feedback based on the number of correct items
  let feedback;
  let scoreMessage = `Score: ${correctCount}/5\n\n`;

  if (correctCount === 5) {
    feedback = `${scoreMessage}"By the stars! A dwarf with such impeccable taste? We never imagined! You must tell us where you learned such refined fashion sense.\n\nSimply marvelous, Master Dwarf! Might you have some advice for us?"`;
  } else if (correctCount === 4) {
    feedback = `${scoreMessage}"Well, well, well! Quite impressive, for a dwarf. You're just a whisper away from elven perfection.You'll turn a few heads, no doubt, though there's still room for improvement.\n\nBut don't worry, we'll let you compete —after all, you're quite the surprise!"`;
  } else if (correctCount === 3) {
    feedback = `${scoreMessage}"Hmm, not bad, not bad at all. For someone of your... background. But there's still a touch of dwarvish roughness about it. The judges might not be impressed, but you'll at least avoid being the butt of every joke.\n\nWe'll allow you to compete, though don't expect to dazzle the panel!"`;
  } else if (correctCount === 2) {
    feedback = `${scoreMessage}"Oh dear, this is quite the... unique look. Your taste is, shall we say, unconventional. But who knows? Perhaps the judges will find it charming in a... rustic sort of way.\n\nYou're in for the contest, but do prepare yourself for some curious glances —and perhaps a few giggles."`;
  } else {
    feedback = `${scoreMessage}"Oh my, oh my... This simply won't do! Your choices are... interesting, to say the least. We can't have you looking like this in the contest.\n\nHere, we'll pick something for you —no need to thank us, we wouldn't want to see you embarrass yourself, Master Dwarf."`;
  }

  let score = `correct count: ${correctCount} / spare time: ${spareTime}`;

  console.log("score: " + score);

  //Send email with the score
  sendEmail(score, "12", "Dress the Dancer", () => {
    console.log("Email sent for game 12.");
  });

  return feedback;
}

const puzzles = [
  {
    clues: [
      "Darling, a red velvet shirt with a simple rope belt? That’s fashion treason! Do you want to be the laughingstock of the festival?",
      "Silk trousers demand a velvet cloak! You wouldn’t wear silk without velvet, unless you want to look like you just rolled out of bed!",
      "Velvet hat with a leather jacket? Oh, sweetie, no. You might as well wear a barrel and call it fashion!",
      "A gold belt with anything less than silk? Perish the thought! If you’re wearing gold, the rest of your outfit had better sparkle just as much!",
      "Leather pants and a silk hat? Darling, that’s like putting a jewel on a pig. No offense to pigs, of course, but let’s keep things chic!",
    ],
    evaluation: function (selectedOptions) {
      const correctCombination = {
        Top: "Silk Blouse",
        Bottom: "Silk Trousers",
        Cloak: "Velvet Cloak",
        Belt: "Gold Belt",
        Hat: "Velvet Hat",
      };
      return evaluateCombination(
        selectedOptions,
        correctCombination,
        spareTime
      );
    },
  },
  {
    clues: [
      "Cotton shirts and linen pants? Perfect for a stroll through the meadows, darling! But if you add a gold belt to that, you might as well carry a sign that says ‘fashion faux pas’!",
      "A leather jacket and straw hat? Stunning! You’ll look like the most stylish scarecrow at the festival—without the scaring part, of course!",
      "A leather belt with silk pants? Please, darling, silk demands something more refined. Save the leather for rougher fabrics!",
      "A velvet hat with a cotton cloak? Oh, you’re funny! Now go put that velvet back in the wardrobe where it belongs.",
      "Linen vests and leather pants? Ah, rugged and refined! You’ll be the envy of all the adventurers. Just don’t get too much dirt on it!",
    ],
    evaluation: function (selectedOptions) {
      const correctCombination = {
        Top: "Cotton Shirt",
        Bottom: "Linen Pants",
        Cloak: "Leather Jacket",
        Belt: "Leather Belt",
        Hat: "Straw Hat",
      };
      return evaluateCombination(
        selectedOptions,
        correctCombination,
        spareTime
      );
    },
  },
  {
    clues: [
      "Silk hat with leather pants? Oh, darling, that’s not a fashion statement—it’s a fashion emergency!",
      "Velvet cloak with a linen vest? You might as well try to disappear into the scenery! No one will notice you in that!",
      "Gold belts are reserved for the elite, darling—velvet and silk only! Anything else would be, well, common.",
      "A cotton cloak with a simple rope belt? Now that’s an outfit with some down-to-earth charm. You won’t impress the elves, but at least you’ll be comfortable!",
      "Velvet hat and leather trousers? Oh, sweetie, that’s like trying to mix oil and water—it just doesn’t work.",
    ],
    evaluation: function (selectedOptions) {
      const correctCombination = {
        Top: "Linen Vest",
        Bottom: "Cotton Trousers",
        Cloak: "Cotton Cloak",
        Belt: "Simple Rope Belt",
        Hat: "Velvet Hat",
      };
      return evaluateCombination(
        selectedOptions,
        correctCombination,
        spareTime
      );
    },
  },
  {
    clues: [
      "Leather caps with silk? Oh, no, no, no! That’s like pairing wine with water. You’ll need something with a bit more style to pull that off.",
      "Cotton trousers and a leather jacket? Now, darling, that’s the rugged look we’re aiming for! You’ll be the talk of the festival.",
      "A silk blouse with a straw hat? Absolutely divine! You’ll be a vision of elegance and nonchalance all at once.",
      "Silver belts with linen? Oh, sweetie, no. Silver demands something a bit more upscale. Linen just won’t cut it!",
      "Velvet hats require velvet cloaks, darling. Anything less, and you might as well be wearing a potato sack!",
    ],
    evaluation: function (selectedOptions) {
      const correctCombination = {
        Top: "Silk Blouse",
        Bottom: "Cotton Trousers",
        Cloak: "Velvet Cloak",
        Belt: "Silver Belt",
        Hat: "Straw Hat",
      };
      return evaluateCombination(
        selectedOptions,
        correctCombination,
        spareTime
      );
    },
  },
  {
    clues: [
      "Red velvet with linen pants? Darling, that’s a tragedy! You’ll look like you’ve dressed in the dark!",
      "Leather jackets belong with rugged outfits, not with silk trousers! Please, save us all the fashion headache.",
      "A cotton shirt with a simple rope belt? Oh, yes, darling! That’s the perfect touch of rustic charm.",
      "Gold belts require elegance, darling—no cotton, no excuses! Keep it classy or don’t wear gold at all.",
      "Linen jackets and leather caps? Now that’s a combo that says, ‘I’m here to impress, but I’m not trying too hard.’ Bravo!",
    ],
    evaluation: function (selectedOptions) {
      const correctCombination = {
        Top: "Cotton Shirt",
        Bottom: "Leather Pants",
        Cloak: "Linen Jacket",
        Belt: "Simple Rope Belt",
        Hat: "Leather Cap",
      };
      return evaluateCombination(
        selectedOptions,
        correctCombination,
        spareTime
      );
    },
  },
];
