var startGameDiv = document.querySelector('#startGameDiv');
var gameDiv = document.querySelector('#gameDiv');
var resultsDiv = document.querySelector('#resultsDiv');

var playerOneName = document.querySelector("input");
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
	var alert = document.querySelector('#alert');
	if (playerOneName.value === ""){
		alert.style.display = 'block';
	} else {
		startGameDiv.style.display = "none";
		firstRound();
	}
}


function checkPoints (){
	for (var i = 0; i < playerOne.length; i++){
		playerOne[i].innerHTML = playerOneName.value + ": " + playerOnePoints + " pkt";
		playerTwo[i].innerHTML = playerTwoName + ": " + playerTwoPoints + " pkt";	
	}
}

function firstRound (){
	checkPoints();
	drawFirstPlayer();
	if (drawFirstPlayer === playerOneName.value){
		activePlayer = 1;
		activePlayerName.innerHTML = "Obstawia: " + playerOneName.value;
		gameTurn();
	} else {
		activePlayer = 2;
		activePlayerName.innerHTML = "Obstawia: " + playerTwoName;
		gameTurn();
	}
}

function drawFirstPlayer (){
	var player = Math.round(Math.random());
	if (player === 0) {
		player = playerOneName.value;
	} else {
		player = playerTwoName;
	}
	return player;
}

function firstDrawDice (){
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


function smallerValue (){
	secondDrawDice();
	if (sumFirstDraw > sumSecondDraw){
		if (activePlayer === 1){
			playerOnePoints++;
			results.innerHTML  = "Punkt zdobywa: " +  playerOneName.value;
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
			results.innerHTML = "Punkt zdobywa: " + playerOneName.value;
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
			results.innerHTML = "Punkt zdobywa: " +  playerOneName.value;
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
			results.innerHTML = "Punkt zdobywa: " + playerOneName.value;
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
		activePlayerName.innerHTML = "Obstawia: " + playerOneName.value;

	} else {
		activePlayer = 2;
		activePlayerName.innerHTML = "Obstawia: " + playerTwoName;
	}
	results.innerHTML = "";
	gameTurn();
}

function stopGame(){
	if (playerOnePoints > playerTwoPoints) {
		alert("Wygrał: " + playerOneName.value);
	}else if (playerOnePoints === playerTwoPoints) {
		alert("Remis");
	}else{
		alert("Wygrał: " + playerTwoName);
	}
}