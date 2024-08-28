const narrativeText = [
  "Just off the path, an elderly elf grandmother sits perched on a tree trunk, her hair as white as freshly fallen snow. As Jimli barrels down the path, her eyes twinkle with curiosity.<br /><br />'My, my, what a sight! A dwarf so nimble, hopping about like a sprightly deer!' she exclaims, waving him over with a bony hand. The warmth in her voice belies the danger —Jimli can already sense that if he stops, he'll be trapped in an endless loop of stories about her younger days. His eyes widen as he realizes he must find a way to escape… politely.",
  "A little further down the path, Jimli spots three teenage squirrels lounging lazily in the branches above. Their beady eyes gleam with mischief as they see him approach.<br /><br />The leader of the trio, clearly the most daring, twirls a twig in his tiny paws. And just as Jimli passes beneath, it slyly lowers the twig in a not-so-subtle attempt to trip the rushing dwarf. The other two snicker, their tiny faces brimming with anticipation.",
  "Just when Jimli thinks he's in the clear, a sharp, uneven tap-tap-tap cuts through the air. He glances up to see a woodpecker perched high on a nearby tree, pecking away with reckless abandon —completely out of rhythm. Each offbeat tap sends a jarring pulse through Jimli's head, his once-precise steps faltering as the bird's chaotic rhythm throws off his own.<br /><br />'By my beard,' he mutters, 'if that bird doesn't stop, I'm going to lose more than just my patience!' His jaw clenches tighter with every tap. It's not just a battle for speed now —it's a battle for his sanity!",
];

const diceInstructions = [
  "Can Jimli politely escape the conversation? =>",
  "Can Jimli escape the furry pranksters without tripping? =>",
  "Can Jimli resist the urge to deal with the woodpecker? =>",
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
  gameNumber: "11",
  gameName: "Racing through distractions",
});
