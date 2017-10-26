let startGameDiv = document.querySelector('#startGameDiv');

let playerOneNameInput = document.querySelector("input");
let playerTwoName = "Komputer";
let startGameBtn = document.querySelector("#startGameBtn");

startGameBtn.addEventListener('click', startGame);

function startGame (){
	endGameDiv.style.display = "none";
	let alert = document.querySelector('#alert');
	playerOneName = playerOneNameInput.value;
	if (!playerOneName){
		alert.style.display = 'block';
	} else {
		startGameDiv.style.display = "none";
		gameDiv.style.display = "flex";
		firstRound();
	}
}

let gameDiv = document.querySelector('#gameDiv');
let playerOne = document.querySelectorAll('#playerOne');
let playerOnePoints = 0;
let playerTwo = document.querySelectorAll('#playerTwo');
let playerTwoPoints = 0;

function checkPoints (){
	for (let i = 0; i < playerOne.length; i++){
		playerOne[i].innerHTML = `${playerOneName}: ${playerOnePoints} pkt`;
		playerTwo[i].innerHTML = `${playerTwoName}: ${playerTwoPoints} pkt`;
	}
}

let activePlayerName = document.querySelector('#activePlayer');
let activePlayer = 0;

function firstRound (){
	checkPoints();
	let player = drawFirstPlayer();
	if (player === 1){
		activePlayer = 1;
		activePlayerName.innerHTML = `Obstawia: ${playerOneName}`;
		gameTurn();
	} else {
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
		return 0;
	}
}

let sumFirstDraw = 0;
let lessBtn = document.querySelector('#lessBtn');
let moreBtn = document.querySelector('#moreBtn');

function firstDrawDice (){
	lessBtn.disabled = false;
	moreBtn.disabled = false;
	let sumValue = document.querySelector('#gameDiv #sumValue'),
	 	dice = document.querySelectorAll(".firstDice div"),
		sum = 0,
		dieValue = 0;
	for (let i = 0; i < dice.length; i++) {
		dieValue = Math.floor(Math.random()*(6 - 1 + 1)) + 1;
		dice[i].innerHTML = dieValue;
		sum += dieValue;
	}
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
		sum = 0,
		dieValue = 0;
	for (let i = 0; i < dice.length; i++) {
		dieValue = Math.floor(Math.random()*(6 - 1 + 1)) + 1;
		dice[i].innerHTML = dieValue;
		sum += dieValue;
	}
 	sumValue.innerHTML = `Suma wartosci: ${sum}`;
 	resultsDiv.style.display = "block";
 	sumSecondDraw = sum;
}

let rounds = document.querySelector("#rounds");
let round = 0;
let maxround = 5;

function gameTurn() {
	firstDrawDice();
 	lessBtn.addEventListener('click', smallerValue);
 	moreBtn.addEventListener('click', higherValue);
 	round++;
 	rounds.innerHTML = `Runda: ${round}`;
}

function gameComputerTurn(){
	firstDrawDice();
	window.setTimeout(function (){
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
	moreBtn.className = "active";
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

let endGameDiv = document.querySelector("#endGameDiv");

function stopGame(){
	let winner = document.querySelector("#winner"),
		repeatGameBtn = document.querySelector("#repeatGameBtn");

	endGameDiv.style.display = "block";
	lessBtn.style.display = "none";
	moreBtn.style.display = "none";
	nextRoundBtn.style.display = "none";
	if (playerOnePoints > playerTwoPoints) {
		winner.innerHTML += playerOneName;
	} else {
		winner.innerHTML += playerTwoName;
	}
	repeatGameBtn.addEventListener("click", function(){
		winner.innerHTML = "";
		resultsDiv.style.display = "none";
		results.innerHTML = "";
		lessBtn.classList.remove("active");
		moreBtn.classList.remove("active");
		lessBtn.style.display = "inline-block";
		moreBtn.style.display = "inline-block";
		nextRoundBtn.style.display = "block";
		round = 0;
		activePlayer = 0;
		playerOnePoints = 0;
		playerTwoPoints = 0;
		startGame();
	});
}
