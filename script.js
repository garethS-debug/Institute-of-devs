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