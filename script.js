var today = new Date();
var hourNow = today.getHours();
var greeting;

if (hourNow > 18) {
    greeting = 'Ready for some dinner suggestions?';
} else if (hourNow > 12) {
greeting = 'Ready for some lunch suggestions?';
} else if (hourNow > 0) {
greeting = 'Ready for some breakfast suggestions?';
} else {
greeting = 'Welcome';
}

document.getElementById('greeting').textContent = greeting;

const quotes = ["I love deadlines. I love the whooshing noise they make as they go by", "The story so far: In the beginning the Universe was created. This has made a lot of people very angry and been widely regarded as a bad move.","I refuse to answer that question on the grounds that I don't know the answer","Don't Panic.", "A learning experience is one of those things that says, 'You know that thing you just did? Don't do that.", "I would far rather be happy than right any day." , "I would far rather be happy than right any day.", "For a moment, nothing happened. Then, after a second or so, nothing continued to happen.", "You live and learn. At any rate, you live." , "I would take the awe of understanding over the awe of ignorance any day." ]