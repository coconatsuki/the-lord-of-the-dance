const narrativeText = [
  "The first song begins, a soft and lilting tune that slowly builds in complexity. The elves glide effortlessly, their feet barely touching the ground. Jimli, however, feels the weight of his boots with each step. As the rhythm quickens, the dance steps become more intricate, requiring precision and grace. Jimli's brow furrows in concentration as he tries to keep up. He can feel the eyes of the judges on him, their gazes sharp and discerning.",
  "As the second song starts, a gentle breeze rustles the leaves, adding a natural rhythm to the melody. This time, the focus is on the connection between the partners. Jimli's nerves spike as he realizes how crucial it is to stay in sync with Elowen. Her movements are fluid and graceful, like a leaf dancing on the wind. Jimli, on the other hand, feels like a boulder rolling down a hill.<br /><br />He concentrates on her every move, trying to mirror her steps without stumbling.",
  "The third and final song begins, a fast-paced, exhilarating tune that demands not just skill and connection, but style. This is Jimli's chance to shine —or to fall flat on his face. Jimli knows he needs to bring something special to the floor, something uniquely dwarven.<br /><br />He decides to add a bit of dwarven flair —a hearty spin here, a solid stomp there. The crowd gasps at the audacity, and for a moment, Jimli wonders if he's gone too far.",
];

const diceInstructions = [
  "Can Jimli match the elves' elegance, or will his heavy footwork betray him? =>",
  "Can Jimli and Elowen find their rhythm together? =>",
  "Can Jimli impress the judges with his bold moves? =>",
];

const finalMessages = [
  `Total score: {score}/60\n\nJimli's performance on the dance floor was, well... let’s just say the dwarven ancestors might be shaking their heads. His timing was all over the place, and his attempts at style looked more like a dwarf trying to swat a fly than anything else.\n\nThe judges exchanged concerned glances. At this rate, Jimli might just be the talk of the festival —for all the wrong reasons.`,

  `Total score: {score}/60\n\nJimli’s dance wasn’t a complete disaster, but it’s clear he was out of his depth. He managed to follow the steps well enough, but he nearly stomped on Elowen’s feet, and his dwarven flair didn’t quite land as intended.\n\nJimli’s chances of winning aren’t completely dashed, but he’ll need to hope that the judges see something in his rugged charm that the performance itself didn’t quite deliver.`,

  `Total score: {score}/60\n\nNot bad, Jimli! He managed to show a surprising amount of grace for a dwarf. His timing was a bit off, but he stayed in sync with Elowen, and his attempts at adding some dwarven flair brought a few smiles from the crowd. The judges nodded in approval, though they've seen better.\n\nJimli might not take the top spot, but the dwarves back home will be proud of his showing, win or lose.`,

  `Total score: {score}/60\n\nJimli surprised everyone today, including himself! His timing was sharp, his connection with Elowen was seamless, and his style —well, it might just start a new dwarven trend!\n\nThe judges were impressed and the crowd was cheering. Whether he takes first place or not, Jimli has left a mark on the Dancing Elves’ Festival, and his legend is just beginning.`,

  `Total score: {score}/60\n\nBy the beard of Durin! Jimli danced like a dwarf possessed by the spirit of the elves themselves. Every step was on point, his timing impeccable, and the elves were in awe as he added a touch of dwarven flair that no one saw coming. The judges exchanged looks of astonishment, and the crowd erupted in applause.\n\nJimli’s performance was nothing short of legendary.`,
];

// Initialize the game
startDiceGame({
  narrativeText,
  diceInstructions,
  finalMessages,
  gameNumber: "14",
  gameName: "The Mix and Match Challenge",
});
