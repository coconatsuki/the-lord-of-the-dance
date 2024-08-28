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
      return evaluateCombination(selectedOptions, correctCombination);
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
      return evaluateCombination(selectedOptions, correctCombination);
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
      return evaluateCombination(selectedOptions, correctCombination);
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
      return evaluateCombination(selectedOptions, correctCombination);
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
      return evaluateCombination(selectedOptions, correctCombination);
    },
  },
];

/*
const puzzles = [
  {
    clues: [
      "A red velvet shirt never goes with a simple rope belt!",
      "Silk trousers are best paired with a velvet cloak.",
      "If you’re wearing a velvet hat, don’t even think about putting on a leather jacket.",
      "A gold belt must only be worn with silk fabric!",
      "Leather pants and a silk hat? Please, darling, no!",
    ],
    evaluation: function (selectedOptions) {
      // Define the correct combination for this puzzle
      const correctCombination = {
        Top: "Silk Blouse",
        Bottom: "Silk Trousers",
        Cloak: "Velvet Cloak",
        Belt: "Gold Belt",
        Hat: "Velvet Hat",
      };

      // Evaluate and return a score
      return evaluateCombination(selectedOptions, correctCombination);
    },
  },
  {
    clues: [
      "Cotton shirts are perfect with linen pants, but never with a gold belt.",
      "A leather jacket looks stunning with a straw hat.",
      "If you choose a leather belt, make sure your pants aren’t silk.",
      "A velvet hat paired with a cotton cloak? You’re joking, right?",
      "Linen vests and leather pants make quite the rugged combination.",
    ],
    evaluation: function (selectedOptions) {
      const correctCombination = {
        Top: "Cotton Shirt",
        Bottom: "Linen Pants",
        Cloak: "Leather Jacket",
        Belt: "Leather Belt",
        Hat: "Straw Hat",
      };

      return evaluateCombination(selectedOptions, correctCombination);
    },
  },
  {
    clues: [
      "Silk hats and leather pants? Fashion catastrophe!",
      "A velvet cloak and linen vest? Only if you want to blend into the background.",
      "Gold belts are only for the most elegant of outfits—think velvet and silk!",
      "A cotton cloak works best with a simple rope belt.",
      "If you’re wearing a velvet hat, skip the leather trousers.",
    ],
    evaluation: function (selectedOptions) {
      const correctCombination = {
        Top: "Linen Vest",
        Bottom: "Cotton Trousers",
        Cloak: "Cotton Cloak",
        Belt: "Simple Rope Belt",
        Hat: "Velvet Hat",
      };

      return evaluateCombination(selectedOptions, correctCombination);
    },
  },
  {
    clues: [
      "Leather caps are a no-go with silk anything.",
      "Cotton trousers and a leather jacket? Now you’re talking style!",
      "If you wear a silk blouse, a straw hat is a must.",
      "Silver belts should never be paired with linen.",
      "Velvet hats demand a velvet cloak—anything less is unacceptable.",
    ],
    evaluation: function (selectedOptions) {
      const correctCombination = {
        Top: "Silk Blouse",
        Bottom: "Cotton Trousers",
        Cloak: "Velvet Cloak",
        Belt: "Silver Belt",
        Hat: "Straw Hat",
      };

      return evaluateCombination(selectedOptions, correctCombination);
    },
  },
  {
    clues: [
      "Red velvet shirts and linen pants? You’ve got to be kidding!",
      "Leather jackets are for rugged outfits, so don’t pair them with silk trousers.",
      "A cotton shirt with a simple rope belt? Yes, please!",
      "Gold belts require elegance—nothing cotton, darling!",
      "Linen jackets and leather caps? Now that’s a combo!",
    ],
    evaluation: function (selectedOptions) {
      const correctCombination = {
        Top: "Cotton Shirt",
        Bottom: "Leather Pants",
        Cloak: "Linen Jacket",
        Belt: "Simple Rope Belt",
        Hat: "Leather Cap",
      };

      return evaluateCombination(selectedOptions, correctCombination);
    },
  },
];
*/
