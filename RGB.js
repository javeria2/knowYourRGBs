
var bgColor = [];
var easyMode = document.querySelector("#easy");
var hardMode = document.querySelector("#hard");
var square = document.querySelectorAll(".square");
var rgbLabel = document.querySelector("#rgbLabel");
var result = document.querySelector("#result");
var playAgain = document.querySelector("#play-again");
var topbar = document.querySelector("#top-bar");

var easyBool = false;
var hardBool = true;

/* initial function calls, game starts with hard mode */
var setup = {};
setup.start = function() {
	populate(6);
	update();
}
setup.start();

/* button listener for hard mode */
hardMode.addEventListener("click", function(){
	if(!hardBool){
		hardBool = true;
		hardMode.classList.add("setSelect");
		easyMode.classList.remove("setSelect");
		result.textContent = "";
		populate(6);
		update();
	}
	easyBool = false;
});

/* button listener for easy mode */
easyMode.addEventListener("click", function () {
	if(!easyBool){
		 easyBool = true;
		 easyMode.classList.add("setSelect");
		 hardMode.classList.remove("setSelect");
		 result.textContent = "";
		 populate(3);
		 update();
	}
	hardBool = false;
});

/* restart the game */
playAgain.addEventListener("click", function(){
	if(hardBool){
		populate(6);
		update();
	} else {
		populate(3);
		update();
	}
	result.textContent = "";
});

/* populate the bgColor array */
function populate(num) {
	bgColor = [];
	for(var i = 0; i < num; i++) {
		bgColor.push(getRandomRGB(0,255));
	}
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */

function getRandomRGB(min, max) {
	var num_1 = Math.floor(Math.random() * (max - min + 1)) + min;
	var num_2 = Math.floor(Math.random() * (max - min + 1)) + min;
	var num_3 = Math.floor(Math.random() * (max - min + 1)) + min;
    var ret_string = "rgb(" + num_3 + ", " + num_1  + ", " + num_2 + ")";
    return ret_string;
}

/* update the view */
function update(){
	var randIndex = Math.floor(Math.random() * bgColor.length);
	playAgain.textContent = "New colors!";
	topbar.style.backgroundColor = "rgb(13, 173, 152)";
	rgbLabel.textContent = bgColor[randIndex];
	if(square.length > bgColor.length) {
		for(var i=square.length - bgColor.length; i<square.length; i++) {
			square[i].style.background = "rgb(0,49,82)";
		}
	}
	for(var i=0; i<bgColor.length; i++) {
		square[i].style.background = bgColor[i];
		square[i].addEventListener("click", function() {
			if (this.style.background === rgbLabel.textContent) {
				for (var i = square.length - 1; i >= 0; i--) {
					square[i].style.background = rgbLabel.textContent;
				}
				topbar.style.backgroundColor = rgbLabel.textContent;
				result.textContent = "Correct!";
				playAgain.textContent = "Play Again?";
			} else {
				this.style.background = "rgb(0,49,82)"; 
				result.textContent = "Try again.";
			}
		})
	}
}