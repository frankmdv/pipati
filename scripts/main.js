'use strict';

import { botDecision, trainModel } from './intelligence.js';
import { 
	playersHand, 
	scorePoints, 
	increaseRound, 
	restartGame, 
	gamePoints, 
	chooseWinner
} from './app.js';

const layerButton = document.querySelector('.layer__button');

layerButton.addEventListener('click', () => {
	document.querySelector('.layer').style.display = 'none';
});

const buttonElements = {
	'Piedra': document.querySelector('.element--stone'),
	'Papel': document.querySelector('.element--paper'),
	'Tijera': document.querySelector('.element--scissor')
};

for (let element in buttonElements) {
	buttonElements[element].addEventListener('click', async () => {
		if (gamePoints < 3) {
			const botElement = await botDecision(element);
			const winner = chooseWinner(element, botElement);

			const audio = new Audio('./audio/button-tap-sound.mp3');
			audio.play();

			playersHand(element, botElement);
			scorePoints(winner);

			if (gamePoints === 3) {
				increaseRound();
				restartGame();
				trainModel(50);
			}
		}
	});
}
