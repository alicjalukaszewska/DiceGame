var startGameDiv = document.querySelector('#startGameDiv');
var gameDiv = document.querySelector('#gameDiv');
var resultsDiv = document.querySelector('#resultsDiv');

var playerOneNameInput = document.querySelector("input");
var playerOneName = playerOneNameInput.value;

var playerTwoName = "Komputer";
var startGameBtn = document.querySelector("#startGameBtn");

var playerOne = document.querySelectorAll('#playerOne');
var playerOnePoints = 0;
var playerTwo = document.querySelectorAll('#playerTwo');
var playerTwoPoints = 0;

var rounds = document.querySelector("#rounds");
var round = 0;
var maxround = 5;

var activePlayerName = document.querySelector('#activePlayer');
var lessBtn = document.querySelector('#lessBtn');
var moreBtn = document.querySelector('#moreBtn');
var nextRoundBtn = document.querySelector('#nextRound');

var activePlayer = 0;

var sumFirstDraw = 0;
var sumSecondDraw = 0;
var results = document.querySelector("#results");

startGameBtn.addEventListener('click', startGame);

function startGame (){
	playerOneName = playerOneNameInput.value;
	var alert = document.querySelector('#alert');
	if (!playerOneName){
		alert.style.display = 'block';
	} else {
		startGameDiv.style.display = "none";
		firstRound();
	}
}


function checkPoints (){
	for (var i = 0; i < playerOne.length; i++){
		playerOne[i].innerHTML = playerOneName + ": " + playerOnePoints + " pkt";
		playerTwo[i].innerHTML = playerTwoName + ": " + playerTwoPoints + " pkt";	
	}
}

function firstRound (){
	checkPoints();
	var player = drawFirstPlayer();
	if (player === 1){
		activePlayer = 1;
		activePlayerName.innerHTML = "Obstawia: " + playerOneName;
		gameTurn();
	} else {
		activePlayer = 2;
		activePlayerName.innerHTML = "Obstawia: " + playerTwoName;
		gameComputerTurn();
	}
}

function drawFirstPlayer (){
	var player = Math.round(Math.random());
	if (player === 0) {
		return 1;
	} else {
		return 0;
	}
}

function firstDrawDice (){
	lessBtn.disabled = false;
	moreBtn.disabled = false;
	var sumValue = document.querySelector('#gameDiv #sumValue');
	var dice = document.querySelectorAll(".firstDice div");
	var sum = 0;
	var dieValue = 0;
	for (var i = 0; i < dice.length; i++) {
		dieValue = Math.floor(Math.random()*(6 - 1 + 1)) + 1;
		dice[i].innerHTML = dieValue;
		sum += dieValue;
	}
 	sumValue.innerHTML = "Suma wartosci: " + sum;
 	sumFirstDraw = sum;
}

function secondDrawDice (){
	lessBtn.disabled = true;
	moreBtn.disabled = true;
	var sumValue = document.querySelector('#resultsDiv #sumValue');
	var dice = document.querySelectorAll(".secondDice div");
	var sum = 0;
	var dieValue = 0;
	for (var i = 0; i < dice.length; i++) {
		dieValue = Math.floor(Math.random()*(6 - 1 + 1)) + 1;
		dice[i].innerHTML = dieValue;
		sum += dieValue;
	}
 	sumValue.innerHTML = "Suma wartosci: " + sum;
 	resultsDiv.style.display = "block";
 	sumSecondDraw = sum;
}

function gameTurn() {
	firstDrawDice();
 	lessBtn.addEventListener('click', smallerValue);
 	moreBtn.addEventListener('click', higherValue);
 	round++;
 	rounds.innerHTML = "Runda: " + round;
}

function gameComputerTurn(){
	firstDrawDice();
	window.setTimeout(function (){
		if (sumFirstDraw >= 8 ){
			lessBtn.onclick = smallerValue();
			lessBtn.className = "active";
			lessBtn.click();
		} else {
			moreBtn.onclick = higherValue();
			moreBtn.className = "active";
			moreBtn.click();
		}
	}, 2000)
	round++;
 	rounds.innerHTML = "Runda: " + round;
}


function smallerValue (){
	secondDrawDice();
	if (sumFirstDraw > sumSecondDraw){
		if (activePlayer === 1){
			playerOnePoints++;
			results.innerHTML  = "Punkt zdobywa: " +  playerOneName;
		} else {
			playerTwoPoints++;
			results.innerHTML = "Punkt zdobywa: " + playerTwoName;
		}
	} else {
		if (activePlayer === 1){
			playerTwoPoints++;
			results.innerHTML = "Punkt zdobywa: " +  playerTwoName;
		} else {
			playerOnePoints++;
			results.innerHTML = "Punkt zdobywa: " + playerOneName;
		}
	}
	checkPoints();
	if (round === maxround){
		stopGame();
	} else{
		nextRoundBtn.addEventListener('click', nextRound);
	}
}

function higherValue (){
	secondDrawDice();
	if (sumFirstDraw < sumSecondDraw){
		if (activePlayer === 1){
			playerOnePoints++;
			results.innerHTML = "Punkt zdobywa: " +  playerOneName;
		}else {
			playerTwoPoints++;
			results.innerHTML = "Punkt zdobywa: " + playerTwoName;
		}
		
	} else {
		if (activePlayer === 1){
			playerTwoPoints++;
			results.innerHTML = "Punkt zdobywa: " +  playerTwoName;
		} else {
			playerOnePoints++;
			results.innerHTML = "Punkt zdobywa: " + playerOneName;
		}
	}
	checkPoints();
	if (round === maxround){
		stopGame();
	} else{
		nextRoundBtn.addEventListener('click', nextRound);
	}
}

function nextRound() {
	resultsDiv.style.display = "none";
	if (activePlayer === 2){
		activePlayer = 1;
		activePlayerName.innerHTML = "Obstawia: " + playerOneName;
		gameTurn();

	} else {
		activePlayer = 2;
		activePlayerName.innerHTML = "Obstawia: " + playerTwoName;
		gameComputerTurn();
	}
	results.innerHTML = "";
	lessBtn.classList.remove("active");
	moreBtn.classList.remove("active");
}

var endGameDiv = document.querySelector("#endGameDiv");
var winner = document.querySelector("#winner");

function stopGame(){
	endGameDiv.style.display = "block";
	if (playerOnePoints > playerTwoPoints) {
		winner.innerHTML += playerOneName;
	} else {
		winner.innerHTML += playerTwoName;
	}
}
