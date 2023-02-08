document.addEventListener("DOMContentLoaded", () => {

//global variables
let guessedWords = [];
let listOfWords = ["robin","goose","finch","corgi","pigeon"];
let randomNumber = Math.floor((Math.random() * listOfWords.length))
let secretWord = listOfWords[randomNumber].toUpperCase(); //uppercase so there is no difference between lower and uppercase
let numberOfGuesses = 0;

let birdImages = ["robinImage.jpeg", "gooseImage.jpeg", "finchImage.jpeg","corgiImage.jpeg","https://i.guim.co.uk/img/media/4f9193ea0a25b57fdef97fccc18f36715c3f9d72/0_542_3264_1958/master/3264.jpg?width=700&quality=85&auto=format&fit=max&s=6abc01247e19a67006c593f947cc966c"];
let birdImage = birdImages[randomNumber];
document.getElementById("bird").src = birdImage;

let messages = ["These birds are known for having red chests.", "These birds are known for having cute goslings","These birds are known for their aerial antics.", "These cuties are known to be Colleen's favorite animal.", "These are pigeons."];
let message = messages[randomNumber];

let blurFactor = 2;
let blurLevel = "";
document.getElementById("bird").style.filter = "blur(20px)";


let numberOfLetters = secretWord.length;
board.style.setProperty("--NOL",numberOfLetters); //changes the variable defined in "board" in CSS to match!


let currentWord = [];

//function calls
createSquares();


//I could have created a board using a for loop with i<30. This way, though, I can differentiate between rows and columns if I need to
function createSquares() {
	const gameBoard = document.getElementById("board");
	for (let row = 0; row < 6; row++) {
		for (let col = 0; col < numberOfLetters; col++) {
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

document.addEventListener("keyup",function(event){
	let wordId = "";
	if(currentWord.length<numberOfLetters){
		if(event.keyCode>=65 && event.keyCode <=90){ //only accept chars from A-Z
			currentWord.push(String.fromCharCode(event.keyCode)); //stores it in a string based on the entering on the keyboard
		}
		for (let i=0; i<currentWord.length; i++){
			wordId = "row"+numberOfGuesses+"col"+i; 
			document.getElementById(wordId).innerHTML = currentWord[i];
		}
	}
	if(event.keyCode == 8){ //if backspace
		currentWord.pop(); //gets rid of 1
		document.getElementById(wordId).innerHTML = "";
	}
	if(event.keyCode == 13){
		checkWord(currentWord.join("")); //turns it from an array into a string for later comparisons
	}
});

	
function checkWord(word){
	checkWordLength(word);
	if(checkWordLength == true){ //only do it if the word is actually 5 letters
	
	}
	wordComparison(word);

}

//checks if the word is actually 5 letters
function checkWordLength(word){
	if (word.length == numberOfLetters){
		document.getElementById("gameInfo").innerHTML = ""; 
		return true;
	}
	else{
		document.getElementById("gameInfo").innerHTML = "Word needs to be 5 letters!"; 
	}
}






function wordComparison(word){
	for (let i=0; i<numberOfLetters; i++){
		console.log("Word[i] is " + word[i]);
		let wordId = "row"+numberOfGuesses+"col"+i; 
		document.getElementById(wordId).innerHTML = word[i]; //sets the letters on the screen
		document.getElementById(wordId).style.backgroundColor = "grey"; //default color is grey
		document.getElementById(word[i]).style.backgroundColor = "white";
		for(let j=0; j<numberOfLetters; j++){ 
			if(word[i] == secretWord[j]){ //this is j to allow it to loop throug all the characters in the word
				if(i==j){
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
	currentWord = []; //resets currentWord for the next try
}

function endOfGame(word,secretWord){
	
	if(word == secretWord){
		document.getElementById("gameInfo").innerHTML = "Great job! The word was " + secretWord + ". " + message; 
		document.getElementById("bird").style.filter = "blur(0px)";
	}
	else if(numberOfGuesses==6){
		document.getElementById("gameInfo").innerHTML = "Better luck next time! The word was " + secretWord + ". " + message; 
		document.getElementById("bird").style.filter = "blur(0px)";
	}
}


//https://www.tabnine.com/academy/javascript/get-value-of-input/
//getting the value of the input field (html also is setting the onclick of this)


/*
//perform this function when you click the submit button
document.getElementById("submitButton").addEventListener("click",checkWord)
*/

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

/*arraySecretWord = secretWord.split('');
	console.log(word);
	console.log(arraySecretWord);
*/
//


/*
To-Do:
1. Allow users to type directly onto screen (DONE)
2. Make sure the code works correctly for duplicate letters
3. Add more birds using a data file
4. Make the code adaptable to more than just 5 letters (DONE)
5. Make it only accept valid words?
6. Add more characteristics for the bird?
7. Add some more graphics around the sides?
8. Fix the screen so that I don't need to zoom out to view it
9. Add the functionality to be able to report and share your score!
10. Make the checkWord() function actually check the word
11. Clean up any unnecessary code
12. Make the buttons clicable on the screen
*/





//https://eager.io/blog/communicating-between-javascript-and-css-with-css-variables/



