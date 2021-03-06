(function () {

//variables to change view
const startGameDiv = document.querySelector('#startGameDiv');
const resultsDiv = document.querySelector('#resultsDiv');

//playerOne variables
const playerOneNameInput = document.querySelector("input");
const playerOne = document.querySelector('#playerOne');
let playerOnePoints = 0;

//playerTwo variables
const playerTwoName = "Komputer";
const playerTwo = document.querySelector('#playerTwo');
let playerTwoPoints = 0;

//buttons
const startGameBtn = document.querySelector("#startGameBtn");
const lessBtn = document.querySelector('#lessBtn');
const moreBtn = document.querySelector('#moreBtn');
const nextRoundBtn = document.querySelector('#nextRound');

//active player variables
const activePlayerName = document.querySelector('#activePlayer');
let activePlayer = 0;

//default variables
let sumFirstDraw = 0;
let sumSecondDraw = 0;

//delay AI's choice
let timer = 0;

const results = document.querySelector("#results");

//rounds counter
const rounds = document.querySelector("#rounds");
let round = 0;
let maxround = 5;


//display players points
function checkPoints (){ 
	playerOne.textContent = `${playerOneName}: ${playerOnePoints} pkt`;
	playerTwo.textContent = `${playerTwoName}: ${playerTwoPoints} pkt`;
}

function resetGame (winner) {
	winner.textContent = "Wygrał: ";
	//hide results
	resultsDiv.style.display = "none";
	results.textContent = "";
	nextRoundBtn.style.display = "block";
	//turn on buttons
	lessBtn.classList.remove("active");
	moreBtn.classList.remove("active");	
	lessBtn.disabled = false;
	moreBtn.disabled = false;
	//reset timer
    window.clearTimeout(timer);
    timer = 0;
    //reset default variables
	sumFirstDraw = 0;
	sumSecondDraw = 0;
	round = 0;
	//reset players points
	playerOnePoints = 0;
	playerTwoPoints = 0;
}

function stopGame(){
	const winner = document.querySelector("#winner"),
		repeatGameBtn = document.querySelector("#repeatGameBtn"),
		endGameDiv = document.querySelector("#endGameDiv");
	//show endGame view
	endGameDiv.style.display = "block";
	//turn off buttons
	lessBtn.disabled = true;
	moreBtn.disabled = true;
	nextRoundBtn.style.display = "none";
	//display winner name
	if (playerOnePoints > playerTwoPoints) {
		winner.textContent += playerOneName;
	} else {
		winner.textContent += playerTwoName;
	}
	//wait for user to start over game
	repeatGameBtn.addEventListener("click", function(){
		endGameDiv.style.display = "none";
		resetGame(winner);
		//repeat program
		startGame();
	});
}

function nextRound() {
	resultsDiv.style.display = "none";
    window.clearTimeout(timer);
    timer = 0;
	//change activer player
	if (activePlayer === 2){
		activePlayer = 1;
		activePlayerName.textContent = `Obstawia: ${playerOneName}`;
	} else {
		activePlayer = 2;
		activePlayerName.textContent = `Obstawia: ${playerTwoName}`;
	}
	gameTurn();
	//reset results and buttons
	results.textContent = "";
	lessBtn.classList.remove("active");
	moreBtn.classList.remove("active");
	//remove focus from last clicked button
	document.activeElement.blur();
}

//get random values of dice
function draw (dice) {
	let sum = 0,
	dieValue = 0;
	//array with dice icons
	const dices = ['&#9856;', '&#9857;', '&#9858;', '&#9859;', '&#9860;', '&#9861;' ];
	dice.forEach(die => {
		//draw number from 1 to 6
		dieValue = Math.floor(Math.random()*(6 - 1 + 1)+1);
		//show die icon depended of dieValue
		die.innerHTML = dices[dieValue-1];
		sum += dieValue;
	});
	return sum;
}

function rollOfDice(toggle, resultsSelector, diceNumber) { 
	//toggle button clickable
	lessBtn.disabled = moreBtn.disabled = toggle; 
	const sumValue = document.querySelector(`#${resultsSelector} .sumValue`); 
	const dice = document.querySelectorAll(`.${ diceNumber === 1 ? 'first' : 'second' }Dice div` );
	//roll dice and get their value
	const sum = draw( dice );
	sumValue.textContent = `Suma wartości: ${ sum }`; 
	if ( diceNumber === 2 ) { 
		resultsDiv.style.display = 'block'; 
		sumSecondDraw = sum;
	} else {
		sumFirstDraw = sum;
	}
}

function showResults(winner) {
	results.textContent  = `Punkt zdobywa: ${winner}`;
}

//check which player get a point
function addPoint (chosenBtn) {
	const choice = chosenBtn.id;
	let diceResult;
	//check which button was chosen
	if (choice === "lessBtn"){
		diceResult = sumFirstDraw > sumSecondDraw;
	} else {
		diceResult = sumFirstDraw < sumSecondDraw;
	}
	//add point to player who won the turn
	if (diceResult){
		if (activePlayer === 1){
			playerOnePoints++;
			showResults(playerOneName);
		} else {
			playerTwoPoints++;
			showResults(playerTwoName);
		}
	} else {
		if (activePlayer === 1){
			playerTwoPoints++;
			showResults(playerTwoName);
		} else {
			playerOnePoints++;
			showResults(playerOneName);
		}
	}
}

//if user chosen value of second roll
function guessValue (){
	rollOfDice(true, 'resultsDiv', 2);
	this.className = "active";
	addPoint(this);
	checkPoints();
	if (round === maxround){
		stopGame();
	} else {
		nextRoundBtn.addEventListener('click', nextRound);
	}
}

//player decide if second roll value is higher or lower than current
function gameTurn () {
	rollOfDice(false, 'gameDiv', 1);
	if (activePlayer === 2){
		timer = window.setTimeout(function (){
			if (sumFirstDraw >= 8 ){
				lessBtn.click();
			} else {
				moreBtn.click();
			}
		}, 800)
	}
	round++;
	rounds.textContent = `Runda: ${round}`;
}

function drawFirstPlayer (){
	//draw beetween 1 and 0
	const player = Math.round(Math.random());
	//if 0 choose player one, if 1 choose player two
	if (player === 1) {
		return 1;
	} else {
		return 2;
	}
}

function firstRound (){
	checkPoints();
	if (drawFirstPlayer() === 1){
		activePlayer = 1;
		activePlayerName.textContent = `Obstawia: ${playerOneName}`;
	} else {
		activePlayer = 2;
		activePlayerName.textContent = `Obstawia: ${playerTwoName}`;
	}
	gameTurn();
}

function startGame (){
	const alert = document.querySelector('#alert');
	const gameDiv = document.querySelector('#gameDiv');
	playerOneName = playerOneNameInput.value;
	//check if input isn't empty
	if (!playerOneName){
		alert.style.display = 'block';
	//if not, start game
	} else {
		startGameDiv.style.display = "none";
		gameDiv.style.display = "block";
		//start first round
		firstRound();
	}
}


lessBtn.addEventListener('click', guessValue);
moreBtn.addEventListener('click', guessValue);
startGameBtn.addEventListener('click', startGame);

}());