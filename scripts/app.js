'use strict';

let gamesWon = 0;
let gamePoints = 0;

function chooseWinner(player, bot) {
	const vsElements = {
		'Piedra': 'Tijera',
		'Papel': 'Piedra',
		'Tijera': 'Papel',
	};

	let winner = "Perdiste";
	if (vsElements[player] === bot) {
		winner = "Ganaste";
	}
	else if (player === bot) {
		winner = "Empate";
	}

	return winner;
}

function scorePoints(winner) {
	const pointsPlayer = document.querySelectorAll(".point--player");
	const pointsBot = document.querySelectorAll(".point--bot");
	const titleScore = document.querySelector(".scores__title");

	titleScore.style.color = "#FFF";
	if (winner === "Ganaste") {
		titleScore.style.color = "#8FD5A6";
		pointsPlayer[gamePoints].style.backgroundColor = "var(--winner-color)";
		pointsBot[gamePoints++].style.backgroundColor = "var(--loser-color)";
		gamesWon++;
	}
	else if(winner === "Perdiste") {
		titleScore.style.color = "#FF8B8B";
		pointsBot[gamePoints].style.backgroundColor = "var(--winner-color)";
		pointsPlayer[gamePoints++].style.backgroundColor = "var(--loser-color)";
	}

	titleScore.style.fontSize = "3.5rem";
	titleScore.innerHTML = winner;
}

function playersHand(playerValue, botValue) {

	const urlImg = './imgs/';

	const urlImagesBot = {
		Piedra : `${urlImg}stoneValueBot.png`,
		Papel : `${urlImg}paperValueBot.png`,
		Tijera : `${urlImg}scissorValueBot.png`
	};

	const urlImagesPlayer = {
		Piedra : `${urlImg}stoneValuePlayer.png`,
		Papel : `${urlImg}paperValuePlayer.png`,
		Tijera : `${urlImg}scissorValuePlayer.png`
	};

	document.getElementById("description-element-bot").innerHTML = botValue;
	document.getElementById("hand-bot").src = urlImagesBot[botValue];

	document.getElementById("description-element-player").innerHTML = playerValue;
	document.getElementById("hand-player").src = urlImagesPlayer[playerValue];
}

function restartGame() {
	const restartButton = document.querySelector(".button-rounds");

	restartButton.style.backgroundColor = "#8FD5A6";
	restartButton.style.cursor = "pointer";
	restartButton.addEventListener("mouseover", () => {
		restartButton.style.transform = "rotate(-1turn)";
	})
	restartButton.addEventListener("mouseleave", () => {
		restartButton.style.transform = "rotate(1turn)";
	})

	restartButton.classList.add('animation-pulsation');

	restartButton.addEventListener('click', () => {
		gamePoints = 0;
		gamesWon = 0;

		const pointsElements = document.getElementsByClassName("point");
		Array.from(pointsElements).forEach(element => element.style.backgroundColor = '#EDEAEA');

		const scoreTitle = document.querySelector('.scores__title');
		scoreTitle.style.color = '#8F96D5';
		scoreTitle.innerHTML = 'Selecciona tu jugada';

		const hands = { 
			player: document.getElementById('hand-player'),
			bot: document.getElementById('hand-bot')
		};

		hands.player.src = './imgs/mainHandPlayer.png';
		hands.bot.src = './imgs/mainHandBot.png';

		const elementDescription = document.getElementsByClassName('hand__element-description');
		Array.from(elementDescription).forEach(element => element.innerHTML = '');

		restartButton.classList.remove('animation-pulsation');
		restartButton.style.backgroundColor = "#4F4F4F";
		restartButton.style.cursor = "default";
		restartButton.addEventListener("mouseover", () => {
			restartButton.style.transform = "rotate(0)";
		});
		restartButton.addEventListener("mouseleave", () => {
			restartButton.style.transform = "rotate(0)";
		});
	});
}

function increaseRound() {
	let elementRounds = document.querySelector(".winner-rounds__n-rounds--player");
	if (gamesWon < 2) {
		elementRounds = document.querySelector(".winner-rounds__n-rounds--bot");
	}
	
	const numRounds = Number.parseInt(elementRounds.innerHTML) + 1;
	if (numRounds < 10) {
		elementRounds.innerHTML = "0" + numRounds;
	}
	else {
		elementRounds.innerHTML = numRounds;
	}
}

export { 
	playersHand, 
	scorePoints, 
	increaseRound, 
	restartGame, 
	chooseWinner, 
	gamePoints 
};
