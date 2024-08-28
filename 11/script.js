const narrativeText = [
  "Just off the path, an elderly elf grandmother sits perched on a tree trunk, her hair as white as freshly fallen snow. As Jimli barrels down the path, her eyes twinkle with curiosity.<br /><br />'My, my, what a sight! A dwarf so nimble, hopping about like a sprightly deer!' she exclaims, waving him over with a bony hand. The warmth in her voice belies the danger —Jimli can already sense that if he stops, he'll be trapped in an endless loop of stories about her younger days. His eyes widen as he realizes he must find a way to escape… politely.",
  "A little further down the path, Jimli spots three teenage squirrels lounging lazily in the branches above. Their beady eyes gleam with mischief as they see him approach.<br /><br />The leader of the trio, clearly the most daring, twirls a twig in his tiny paws. And just as Jimli passes beneath, it slyly lowers the twig in a not-so-subtle attempt to trip the rushing dwarf. The other two snicker, their tiny faces brimming with anticipation.",
  "Just when Jimli thinks he's in the clear, a sharp, uneven tap-tap-tap cuts through the air. He glances up to see a woodpecker perched high on a nearby tree, pecking away with reckless abandon —completely out of rhythm. Each offbeat tap sends a jarring pulse through Jimli's head, his once-precise steps faltering as the bird's chaotic rhythm throws off his own.<br /><br />'By my beard,' he mutters, 'if that bird doesn't stop, I'm going to lose more than just my patience!' His jaw clenches tighter with every tap. It's not just a battle for speed now —it's a battle for his sanity!",
];

const diceInstructions = [
  "Can Jimli politely escape the conversation? =>",
  "Can Jimli escape the furry pranksters without tripping? =>",
  "Can Jimli resist the urge to stop and deal with the woodpecker? =>",
];

const finalMessages = [
  `Total score: {score}/60\n\nJimli's day has gone from bad to worse. The chatty grandma ensnared him in tales of elven knitting, the squirrels tripped him up with ease, and that blasted woodpecker threw him off his rhythm so badly he nearly lost his mind.\n\nWith all this time lost, making it to the festival on time seems like a distant dream. Maybe there's a consolation dance for latecomers?`,
  `Total score: {score}/60\n\nJimli's efforts have been a mixed bag. He escaped the grandma's endless chatter, but those squirrels managed to get the best of him, and that infernal woodpecker still slowed him down.\n\nHe's on his way to the festival, but with the time lost, he's cutting it dangerously close. He might make it… if he sprints the whole way. Let's hope his legs hold out!`,
  `Total score: {score}/60\n\nNot bad at all! Jimli dodged the grandma's stories and the squirrels' pranks, though that woodpecker still managed to ruffle his feathers a bit. He's moving faster now, but the clock is still ticking.\n\nWith luck on his side and a bit more speed, he just might make it to the festival on time. Keep running, Jimli!`,
  `Total score: {score}/60\n\nJimli breezed through the valley like a dwarf on a mission! He smoothly sidestepped the grandma, outsmarted the squirrels, and shrugged off the woodpecker's chaos like a true champion.\n\nHe's on track to make it to the festival with time to spare, his beard flowing in the wind and victory in his sights. Onward to glory, Jimli!`,
];

// Initialize the game
startDiceGame({
  narrativeText,
  diceInstructions,
  finalMessages,
  gameNumber: "11",
  gameName: "Racing through distractions",
});
