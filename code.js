let startGameDiv = document.querySelector('#startGameDiv');

let playerOneNameInput = document.querySelector("input");
let playerTwoName = "Komputer";
let startGameBtn = document.querySelector("#startGameBtn");

startGameBtn.addEventListener('click', startGame);

function startGame (){
	let alert = document.querySelector('#alert');
	endGameDiv.style.display = "none";
	playerOneName = playerOneNameInput.value;
	if (!playerOneName){
		alert.style.display = 'block';
	} else {
		startGameDiv.style.display = "none";
		gameDiv.style.display = "block";
		firstRound();
	}
}

let gameDiv = document.querySelector('#gameDiv');
let playerOne = document.querySelectorAll('#playerOne');
let playerOnePoints = 0;
let playerTwo = document.querySelectorAll('#playerTwo');
let playerTwoPoints = 0;

function checkPoints (){ 
	playerOne.forEach(name1 => {
		name1.innerHTML = `${playerOneName}: ${playerOnePoints} pkt`;
	});
	playerTwo.forEach(name2 => {
		name2.innerHTML = `${playerTwoName}: ${playerTwoPoints} pkt`;
	});
}

let activePlayerName = document.querySelector('#activePlayer');
let activePlayer = 0;

function firstRound (){
	checkPoints();
	let firstPlayer = drawFirstPlayer();
	if (firstPlayer === 1){
		activePlayer = 1;
		activePlayerName.innerHTML = `Obstawia: ${playerOneName}`;
		gameTurn();
	} else{
		activePlayer = 2;
		activePlayerName.innerHTML = `Obstawia: ${playerTwoName}`;
		gameComputerTurn();
	}
}

function drawFirstPlayer (){
	let player = Math.round(Math.random());
	if (!player) {
		return 1;
	} else {
		return 2;
	}
}

let sumFirstDraw = 0;
let lessBtn = document.querySelector('#lessBtn');
let moreBtn = document.querySelector('#moreBtn');

function draw (dice) {
		let sum = 0,
		dieValue = 0;
		let dices = ['&#9856;', '&#9857;', '&#9858;', '&#9859;', '&#9860;', '&#9861;' ];
		dice.forEach(die => {
			dieValue = Math.floor(Math.random()*(6 - 1 + 1)+1);
			die.innerHTML = dices[dieValue-1];
			sum += dieValue;
		});
		return sum;
};

function firstDrawDice (){
	lessBtn.disabled = false;
	moreBtn.disabled = false;
	let sumValue = document.querySelector('#gameDiv #sumValue'),
		dice = document.querySelectorAll(".firstDice div"),
		sum = draw (dice);
 	sumValue.innerHTML = `Suma wartosci: ${sum}`;
 	sumFirstDraw = sum;
}

let	resultsDiv = document.querySelector('#resultsDiv');
let sumSecondDraw = 0;

function secondDrawDice (){
	lessBtn.disabled = true;
	moreBtn.disabled = true;
	let sumValue = document.querySelector('#resultsDiv #sumValue'),
		dice = document.querySelectorAll(".secondDice div"),
		sum = draw (dice);
 	sumValue.innerHTML = `Suma wartosci: ${sum}`;
 	resultsDiv.style.display = "block";
 	sumSecondDraw = sum;
 	console.log(sum);
}

let rounds = document.querySelector("#rounds");
let round = 0;
let maxround = 5;
let timer = 0;

function gameTurn() {
	firstDrawDice();
 	lessBtn.addEventListener('click', smallerValue);
 	moreBtn.addEventListener('click', higherValue);
 	round++;
 	rounds.innerHTML = `Runda: ${round}`;
}

function gameComputerTurn(){
	firstDrawDice();
	timer = window.setTimeout(function (){
		if (sumFirstDraw >= 8 ){
			lessBtn.onclick = smallerValue();
			lessBtn.click();
		} else {
			moreBtn.onclick = higherValue();
			moreBtn.click();
		}
	}, 800)
	round++;
 	rounds.innerHTML = `Runda: ${round}`;
}

let results = document.querySelector("#results");
let nextRoundBtn = document.querySelector('#nextRound');

function smallerValue (){
	secondDrawDice();
	lessBtn.className = "active";
	if (sumFirstDraw > sumSecondDraw){
		if (activePlayer === 1){
			playerOnePoints++;
			results.innerHTML  = `Punkt zdobywa: ${playerOneName}`;
		} else {
			playerTwoPoints++;
			results.innerHTML = `Punkt zdobywa: ${playerTwoName}`;
		}
	} else {
		if (activePlayer === 1){
			playerTwoPoints++;
			results.innerHTML = `Punkt zdobywa: ${playerTwoName}`;
		} else {
			playerOnePoints++;
			results.innerHTML = `Punkt zdobywa: ${playerOneName}`;
		}
	}
	checkPoints();
	if (round === maxround){
		stopGame();
	} else {
		nextRoundBtn.addEventListener('click', nextRound);
	}
}

function higherValue (){
	secondDrawDice();
	moreBtn.className = "active";
	if (sumFirstDraw < sumSecondDraw){
		if (activePlayer === 1){
			playerOnePoints++;
			results.innerHTML = `Punkt zdobywa: ${playerOneName}`;
		} else {
			playerTwoPoints++;
			results.innerHTML = `Punkt zdobywa: ${playerTwoName}`;
		}
	} else {
		if (activePlayer === 1){
			playerTwoPoints++;
			results.innerHTML = `Punkt zdobywa: ${playerTwoName}`;
		} else {
			playerOnePoints++;
			results.innerHTML = `Punkt zdobywa: ${playerOneName}`;
		}
	}
	checkPoints();
	if (round === maxround){
		stopGame();
	} else {
		nextRoundBtn.addEventListener('click', nextRound);
	}
}

function nextRound() {
	resultsDiv.style.display = "none";
	if (activePlayer === 2){
		activePlayer = 1;
		activePlayerName.innerHTML = `Obstawia: ${playerOneName}`;
		gameTurn();

	} else {
		activePlayer = 2;
		activePlayerName.innerHTML = `Obstawia: ${playerTwoName}`;
		gameComputerTurn();
	}
	results.innerHTML = "";
	lessBtn.classList.remove("active");
	moreBtn.classList.remove("active");
	document.activeElement.blur();
}

let endGameDiv = document.querySelector("#endGameDiv");

function stopGame(){
	let winner = document.querySelector("#winner"),
		repeatGameBtn = document.querySelector("#repeatGameBtn");

	endGameDiv.style.display = "block";
	lessBtn.disabled = true;
	moreBtn.disabled = true;
	nextRoundBtn.style.display = "none";
	if (playerOnePoints > playerTwoPoints) {
		winner.innerHTML += playerOneName;
	} else {
		winner.innerHTML += playerTwoName;
	}
	repeatGameBtn.addEventListener("click", function(){
		winner.innerHTML = "Wygrał: ";
		resultsDiv.style.display = "none";
		results.innerHTML = "";
		lessBtn.classList.remove("active");
		moreBtn.classList.remove("active");
        window.clearTimeout(timer);
        timer = 0;
		sumFirstDraw = 0;
		sumSecondDraw = 0;
		lessBtn.disabled = false;
		moreBtn.disabled = false;
		nextRoundBtn.style.display = "block";
		round = 0;
		playerOnePoints = 0;
		playerTwoPoints = 0;
		startGame();
	});
}