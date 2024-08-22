const narrativeText = [
  "First, Jimli approaches the River Spirit, Mistriva, who is said to control the flow of time itself. The river glows with an ethereal blue light, and as Jimli kneels before it, he whispers, 'Uh, great Mistriva... I hope this humble dwarf’s prayer doesn’t... um, dam up your waters?'",
  "Next, he finds the Elder Oak, home to the Tree Spirit, Sylvas, guardian of knowledge and wisdom. Jimli places a hand on the ancient bark, 'Sylvas, keeper of leaves and... uh, bark. Might you lend a dancing dwarf some wisdom?'",
  "Finally, Jimli comes upon the Stone of Echoes, a massive boulder said to house Kragrok, the Spirit of Earth and Stone. The rock’s surface is smooth and warm, and Jimli kneels beside it. 'Kragrok, mighty boulder of... er, boulderness, I don’t suppose you’d fancy a dance yourself? Just... you know, keep the ground steady for me?'",
];

const diceInstructions = [
  "Now, roll the dice for Mistriva =>",
  "Now, roll the dice for Sylvas =>",
  "Now, roll the dice for Kragrok =>",
];

const finalMessages = [
  `Total score: 0\n\nMistriva's waters remained still, Sylvas's leaves didn't so much as rustle, and Kragrok barely gave a pebble a nudge. It seems like Jimli's prayers were met with… nothing.\n\nThe road ahead may be long, dark, and filled with dwarven curses, but hey, Jimli always did like a good challenge.`,
  `Total score: {score}\n\nThe spirits gave Jimli a nod… well, a small nod. Mistriva stirred the waters just enough for a light drizzle, Sylvas dropped a single leaf of wisdom (it's still a leaf, right?), and Kragrok rumbled… slightly.\n\nNot exactly the luckiest start, but hey, even a drizzle can fill a dwarven cup.`,
  `Total score: {score}\n\nJimli's prayers were met with some solid support! Mistriva's waters flowed smoothly, Sylvas whispered a few wise words, and Kragrok shifted his stony weight to clear a path.\n\nThe spirits aren't dancing with him yet, but they've certainly got a foot tapping. Jimli's journey might just be a bit brighter after all!`,
  `Total score: {score}\n\nThe spirits are practically throwing a party for Jimli! Mistriva's waters are dancing, Sylvas's branches are bowing with wisdom, and Kragrok is rolling stones out of the way like they're pebbles.\n\nJimli's steps feel lighter and he starts believing he's invincible. Just don't trip on your beard, Jimli!`,
];

// Initialize the game
startDiceGame({
  narrativeText,
  diceInstructions,
  finalMessages,
  gameNumber: "1",
  gameName: "Setting Forth",
});
