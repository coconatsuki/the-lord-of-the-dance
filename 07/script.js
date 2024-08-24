const narrativeText = [
  "The further Jimli climbs, the louder the mountain's melody becomes. It's a haunting tune that seems to blend with the wind, making every echo feel alive.<br /><br />Suddently, a screech cuts through the music. A large eagle swoops down from the heights above, its eyes gleaming with hunger.“Oi! Get your beak off my snacks!” Jimli growls, swinging his axe to fend off the bird.<br /><br />The eagle dodges and dives again. The mountain's melody seems to grow faster, more intense, as if matching the tension of the moment.",
  "Jimli moves cautiously as the path narrows... The music seems to dance along the rocks, and with each step, loose stones tumble down the slope, joining the mountain's song.<br /><br />Suddenly, a larger boulder ahead begins to shift, rumbling ominously as the mountain's rhythm quickens. The ground shakes beneath Jimli's feet, and the boulder breaks free, tumbling toward him with the sound of a drumroll in the mountain's song.",
  "As Jimli climbs higher, the air grows colder, and the mountain's song changes too. The melodies become slower, more drawn out, like a lullaby carried on the wind. Jimli's breath fogs in the air, and his fingers start to stiffen from the cold. “I never thought I'd miss the heat of the desert,” he mutters through chattering teeth.<br /><br />With exhaustion setting in, the mountain's lullaby seems to pull him into a trance. He begins to daydream of a warm dwarven hall, a roaring fire, and a hot bowl of stew.<br /><br />The music lulls him further, making his eyelids heavy. But falling asleep on a cliffside wouldn't be... the best idea.",
];

const diceInstructions = [
  "Can Jimli save his snacks —and balance? =>",
  "Can Jimli dodge the rocks and keep climbing? =>",
  "Can Jimli shake off the mountain's lullaby? =>",
];

const finalMessages = [
  `Total score: 0/60\n\nJimli's climb has been nothing short of a disaster. The eagle got away with his snacks, the boulder nearly flattened him, and the mountain's lullaby almost sent him plummeting off the cliff.\n\nHe may have made it up a few feet, but his pride —and his rations— are in tatters. Still, he's alive. And for a dwarf, that's something.`,
  `Total score: {score}/60\n\nJimli's climb was rough, to say the least. He managed to save some of his snacks from that blasted eagle, but a few boulders gave him more than a bruised ego. And the mountain's lullaby? It had him nodding off more than once.\n\nNot the most graceful ascent, but at least he's still hanging on—barely.`,
  `Total score: {score}/60\n\nJimli handled the climb better than most dwarves would! The eagle barely got a peck, the rocks were more of an inconvenience than a danger, and the mountain's lullaby? It couldn't lull him to sleep.\n\nHe's tired, sore, but determined. With any luck, the summit isn't too far off.`,
  `Total score: {score}/60\n\nJimli scaled the mountain like a dwarf possessed! The eagle flew away empty-beaked, the boulders rolled harmlessly past, and the mountain's lullaby? It might as well have been a dwarven drinking song.\n\nHe's nearing the summit, stronger than ever, with his beard flowing gloriously in the melodic winds.`,
];

// Initialize the game
startDiceGame({
  narrativeText,
  diceInstructions,
  finalMessages,
  gameNumber: "7",
  gameName: "The Climb",
});
