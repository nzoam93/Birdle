document.addEventListener("DOMContentLoaded", () => {

createSquares();

//I could have created a board using a for loop with i<30. This way, though, I can differentiate between rows and columns if I need to
function createSquares() {
	const gameBoard = document.getElementById("board");
	for (let row = 0; row < 6; row++) {
		for (let col = 0; col < 5; col++) {
			let square = document.createElement("div"); //"div" (NOT a button) so that it can be blank instead of white!
			//square.setAttribute("data-row", row);
			//square.setAttribute("data-col", col);
			square.classList.add("square"); //setting the class as square
			square.setAttribute("id","row"+row + "col" + col); //setting the id as the index in the loop
			//square.onclick = handleClick;
			gameBoard.appendChild(square);
		}
	}
}

//assigning an onclick to all the buttons
const keys = document.querySelectorAll(".keyboard-row button") //grabs all the buttons under the keyboard-row class and stores it under the variable keys
for (let i=0; i<keys.length; i++){
	keys[i].onclick=({target}) => {
		const letter = target.getAttribute("data-key");
	}
}

//when you click the enter button, do the functions
document.getElementById("inputBox").addEventListener("keyup",function(event){
	
	if(event.keyCode == 13){
		checkWord();
	}
});



/*
//perform this function when you click the submit button
document.getElementById("submitButton").addEventListener("click",checkWord)
*/
	
function checkWord(){
	let word = document.getElementById("inputBox").value;
	checkWordLength(word);
	if(checkWordLength == true){ //only do it if the word is actually 5 letters
	}
	wordComparison(word);
}

//checks if the word is actually 5 letters
function checkWordLength(word){
	if (word.length == 5){
		document.getElementById("inputBox").value = "";
		document.getElementById("gameInfo").innerHTML = ""; 
		return true;
	}
	else{
		document.getElementById("gameInfo").innerHTML = "Word needs to be 5 letters!"; 
	}
}

let guessedWords = [];
let availableSpaces = 0;
let listOfWords = ["robin","goose","finch","corgi"];
let randomNumber = Math.floor((Math.random() * listOfWords.length))
let secretWord = listOfWords[randomNumber];
let numberOfGuesses = 0;

let birdImages = ["robinImage.jpeg", "gooseImage.jpeg", "finchImage.jpeg","corgiImage.jpeg"];
let birdImage = birdImages[randomNumber];
document.getElementById("bird").src = birdImage;

let messages = [". These birds are known for having red chests.", ". These birds are known for having cute goslings",". These birds are known for their aerial antics.", ". These cuties are known to be Colleen's favorite animal."];
let message = messages[randomNumber];

let blurFactor = 2;
let blurLevel = "";

document.getElementById("bird").style.filter = "blur(20px)";

let correctLetters = 0;


function wordComparison(word){
	for (let i=0; i<5; i++){
		let wordId = "row"+numberOfGuesses+"col"+i; 
		//console.log(wordId);
		document.getElementById(wordId).innerHTML = word[i]; //sets the letters on the screen
		document.getElementById(wordId).style.backgroundColor = "grey"; //default color is grey
		document.getElementById(word[i]).style.backgroundColor = "white";
		for(let j=0; j<5; j++){ 
			if(word[i] == secretWord[j]){ //this is j to allow it to loop throug all the characters in the word
				if(i==j){
					correctLetters++;
					document.getElementById(wordId).style.backgroundColor = "green"; //make the square green
					document.getElementById(word[i]).style.backgroundColor = "green"; //make the keyboard key green
				}
				else if (document.getElementById(word[i]).style.backgroundColor != "green") //makes sure it doesn't overwrite a green square
				{
					document.getElementById(wordId).style.backgroundColor = "yellow";
					document.getElementById(word[i]).style.backgroundColor = "yellow";

				}
			}
		}
	}
	numberOfGuesses++; //makes sure that the appropriate row is filled in
	blurFactor = 20 - numberOfGuesses*4;
	blurLevel = "blur("+blurFactor+"px)";
	document.getElementById("bird").style.filter = blurLevel;
	endOfGame(word,secretWord);
}

function endOfGame(word,secretWord){
	if(word == secretWord){
		document.getElementById("gameInfo").innerHTML = "Great job! The word was " + secretWord + message; 
		document.getElementById("bird").style.filter = "blur(0px)";
	}
	else if(numberOfGuesses==6){
		document.getElementById("gameInfo").innerHTML = "Better luck next time! The word was " + secretWord + message; 
		document.getElementById("bird").style.filter = "blur(0px)";
	}
}


//https://www.tabnine.com/academy/javascript/get-value-of-input/
//getting the value of the input field (html also is setting the onclick of this)


// function setClickHandlers() {
// 	const buttons = document.querySelectorAll("button");
// 	/*
// 	for (const button of buttons) {
// 		button.onclick = handleClick;
// 	}
// 	*/
// 	for (let i = 0; i < buttons.length; i++) {
// 		const button = buttons[i];
// 		button.onclick = handleClick; //when you click the button, do the handle click function
// 	}
// };
/*

function handleClick(target) {
	const row = target.getAttribute("data-row");
	const col = target.getAttribute("data-col");
}


*/


/*
codex = [
	["grey", "grey", "red"],
	["blue", "black", "grey"]
]
*/

});

//change keyboard container height to 200px
//change keyboard button height to 60px