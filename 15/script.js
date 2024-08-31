// Get the query string from the URL
const queryString = window.location.search;
// const gameMusic = new Audio("./victory-music.mp3");
let narrative;

// Parse the query string to get the 'points' parameter
const urlParams = new URLSearchParams(queryString);
const totalPoints = urlParams.get("points");

// Event listener for the "Back to calendar" button
document.getElementById("calendar-button").addEventListener("click", () => {
  window.location.href = "../calendar.html";
});

if (victoryPage) {
  // Generate the narratives depending on the score

  if (totalPoints >= 117) {
    narrative = {
      title: "First Place!",
      message1: `The morning sun bathes the festival grounds in a golden glow. Jimli stands among the other contestants, his heart pounding like a blacksmith's hammer on an anvil. Every breath feels like a century, every second, a lifetime. The gathered crowd of elves watch the contestants with silent admiration.<br />The organizer steps forward: "Dancers, the moment you've all been waiting for has arrived! The judges have made their decisions. The elf pauses, letting the suspense hang in the air. "And now, <strong>the first prize </strong> goes to... <strong>Master Jimli and his partner, Elowen!</strong>"`,
      message2: `Time seems to stop for Jimli. His childhood dream has just come true. He feels a wave of pure joy and disbelief wash over him. "I... I did it! We did it!" he stammers, looking at Elowen, who beams at him with pride. The crowd erupts into applause, and Jimli's heart swells with a happiness he has never known before.<br />
              Elowen steps closer, her eyes shining with delight. "You were magnificent, Jimli. We both were." Before he can respond, she leans in and kisses him lightly on the cheek. Jimli's face turns as red as his beard, but he doesn't care. This moment is perfect. Absolutely perfect.`,
      message3: `The applause continues, echoing through the festival grounds. Jimli raises his arms triumphantly, basking in the glory of the moment. For a dwarf who had always felt a little out of place among the elegant elves, he now feels like he belongs. He turns to Elowen, "This win is as much yours as it is mine. Thank you for believing in me."<br /><br />
        Elowen smiles warmly. "It was an honor to dance with you, Master Dwarf. Let’s make sure the celebration is just as unforgettable."`,
      prize: `As the crowd's applause fades, the organizer announces the prize. "For achieving first place, Jimli and Elowen, you are <strong>invited to a luxurious dinner at the finest elven restaurant: el ANDINO!</strong> And you'll be <strong>accompagnied by the finest company</strong>.<br/><br/>Jimli’s grin widens. "Fancy dinner with elves? Well, that’s something I never thought I’d say. I hope they have ale!" The crowd laughs, and Jimli knows this is a victory he’ll cherish forever.`,
    };
  } else if (totalPoints >= 94) {
    narrative = {
      title: "Second Place!",
      message1: `The morning sun bathes the festival grounds in a golden glow. Jimli stands among the other contestants, his heart pounding like a blacksmith's hammer on an anvil. Every breath feels like a century, every second, a lifetime. The gathered crowd of elves watch the contestants with silent admiration.<br />The organizer steps forward: "Dancers, the moment you've all been waiting for has arrived! The judges have made their decisions. The elf pauses, letting the suspense hang in the air. "And now, the second prize goes to... <strong>Master Jimli and his partner, Elowen!</strong>"`,
      message2: `Jimli can hardly believe it. <strong>Second place!</strong> For a dwarf in an elven dance contest, this is beyond his wildest dreams. His heart feels like it’s going to burst from his chest as he looks at Elowen, who smiles warmly at him. The crowd’s applause is thunderous, and Jimli can barely hear his own thoughts over the noise.<br />
      Elowen steps closer, her smile radiant. "You were amazing, Jimli. We make a great team." Jimli grins back, overwhelmed with joy. "We sure do!" In a moment of elation, Elowen gives him a light kiss on the cheek. Jimli’s face turns beet red, but he can’t help but laugh. This is a moment he’ll never forget.`,
      message3: `As the applause continues, Jimli raises his arms in victory. "Second place! Who would have thought a dwarf could come this far in an elven contest?" he says, his voice full of pride. Elowen chuckles, "You did better than just 'come far,' Jimli. You’ve shown everyone that dwarves can dance just as well as elves." The crowd cheers, and Jimli’s grin widens.<br /><br />
      He turns to Elowen, his eyes shining. "I couldn’t have done it without you, Elowen. Thank you." She nods, "It was my pleasure, Master Dwarf. Now, let’s enjoy this moment!"`,
      prize: `As the excitement dies down, the organizer announces the prize. "For securing second place, Jimli and Elowen, you are <strong>treated to a feast prepared by our finest elven chefs</strong>. A meal fit for kings!"<br /><br />Jimli's stomach growls audibly, and he chuckles. "Elven cuisine? I might just get used to this! But I do hope there's plenty of it!" The crowd laughs, and Jimli can’t wait to savor this well-deserved reward.`,
    };
  } else {
    narrative = {
      title: "Third Place!",
      message1: `The morning sun bathes the festival grounds in a golden glow. Jimli stands among the other contestants, his heart pounding like a blacksmith's hammer on an anvil. Every breath feels like a century, every second, a lifetime. The gathered crowd of elves watch the contestants with silent admiration.<br />The organizer steps forward: "Dancers, the moment you've all been waiting for has arrived! The judges have made their decisions. The elf pauses, letting the suspense hang in the air. "And now, the third prize goes to... <strong>Master Jimli and his partner, Elowen!</strong>"`,
      message2: `Jimli feels a rush of pride. Third place in an elven dance contest! For a dwarf, this is no small feat. He looks at Elowen, who smiles at him with genuine affection. The applause from the crowd is warm and supportive, and Jimli can’t help but feel like a winner, regardless of the placement.<br /><br />
      Elowen steps closer, her eyes twinkling. "We did it, Jimli! You were fantastic." Jimli grins, his heart swelling with joy. "We make a pretty good team, don’t we?" In a gesture of friendship, Elowen leans in and kisses him lightly on the cheek. Jimli blushes, but he’s too happy to be embarrassed. This is a moment to remember.`,
      message3: `As the applause fades, Jimli raises his arms, feeling like he’s on top of the world. "Third place! Not bad for a dwarf, eh?" he exclaims, his voice filled with pride. Elowen laughs softly, "Not bad at all, Jimli. You’ve shown everyone here that dwarves can dance with the best of them." The crowd cheers, and Jimli feels like he’s just won the greatest victory of his life.<br /><br />
      He turns to Elowen, "Thank you, Elowen. I couldn’t have done this without you." She nods, her smile bright. "It was an honor to dance with you, Jimli. Let’s enjoy this victory together!"`,
      prize: `As the excitement settles, the organizer announces the prize. "For claiming third place, Jimli and Elowen, you are awarded <strong>a luxurious massage from our skilled elven masseurs</strong>. A perfect way to relax after the contest!"<br/><br/>Jimli chuckles, "A massage, eh? I could get used to this elven hospitality. Just don’t tell the other dwarves!" The crowd laughs, and Jimli can’t wait to enjoy this well-deserved reward.`,
    };
  }

  // Populate the narrative into the HTML
  document.querySelector("#story-part-1 .section-text").innerHTML =
    narrative.message1;
  document.querySelector("#story-part-2 .section-text").innerHTML =
    narrative.message2;
  document.querySelector("#story-part-3 .section-text").innerHTML =
    narrative.message3;
  document.querySelector("#story-part-4 .section-text").innerHTML =
    narrative.prize;

  document.querySelector("#story-part-2 .section-title").innerHTML =
    narrative.title;

  document.querySelector("#story-part-3 .section-title").innerHTML =
    narrative.title;
}
