const narrativeText = [
  "After hours of trudging through the burning sands, Jimli feels the weight of the desert sun pressing down on him. Sweat trickles down his face, and his beard feels like it's been dipped in lava. <br /><br />He pauses to take a swig of water from his flask, only to find it's already dangerously low. He wipes his forehead, glancing up at the sky. 'Right,' he says, determination setting in. 'Time to see if this old dwarf can keep his cool in this blasted heat, or if I'll be looking like a cooked turkey by sundown.'",
  "The dunes seem to grow taller with every step. Jimli climbs yet another sandy peak, only to be greeted by… more sand. 'Ah, of course,' he grunts. 'More sand. Why not? I've not seen enough of it yet today!'<br /><br /> He stumbles slightly as the ground shifts beneath him, barely keeping his balance. 'Alright, sand. Let's see if you can outrun a dwarf!'",
  "The sun begins to dip lower in the sky, casting long shadows across the desert. Jimli's mouth feels like a dry riverbed, and his water flask is completely empty. <br /><br />Just as despair starts to creep in, he spots something shimmering on the horizon. 'Is that…?' He squints, hoping it's not another trick of the desert. 'An oasis? Or just more sand playing games with my eyes?' <br /><br />His legs ache, and his beard feels crisped from the heat. 'Come on, spirits… just this once, let a dwarf find something besides sand out here!'",
];

const diceInstructions = [
  "How well can Jimli handle the relentless heat? =>",
  "How fast can Jimli navigates the dunes? =>",
  "Can Jimli finds the hidden oasis? =>",
];

const finalMessages = [
  `Total score: 0\n\nJimli's beard is singed, his boots are full of sand, and the oasis? A cruel mirage.\n\nNo water, no luck, and certainly no relief. But hey, at least he's got some stories to tell—if he survives this blasted heat!`,
  `Total score: {score}\n\nJimli's beard survived—barely. The heat almost got to him, the dunes were a nightmare, and that oasis? It was just a puddle.\n\nStill, a dwarf's got to take what he can get. Perhaps he'l find a better shade of luck tomorrow.`,
  `Total score: {score}\n\nJimli handled the heat like a seasoned warrior, the dunes weren't too much trouble, and the oasis—well, it wasn't just a mirage!\n\nHe's got water, he's got shade, and his beard is only mildly frazzled. All in all, not a bad day for a dwarf in a desert!`,
  `Total score: {score}\n\nJimli is practically dancing through the desert! The heat didn't stand a chance, the dunes were more like hills, and that oasis? A hidden paradise.\n\nHe's refreshed, recharged, and his beard is glistening in the sunlight!`,
];

// Initialize the game
startDiceGame({
  narrativeText,
  diceInstructions,
  finalMessages,
  gameNumber: "2",
  gameName: "The Dune Dash",
});
