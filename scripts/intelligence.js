'use strict';

import { chooseWinner } from './app.js';

function createModel() {
	const model = tf.sequential({
		layers: [
			tf.layers.dense({ inputShape: [3], units: 3 })
		]
	});

	model.compile({ loss: "meanSquaredError", optimizer: "sgd" });

	return model;
}

function convertToBinary(element) {
	const convert = {
		Piedra : [1, 0, 0],
		Papel : [0, 1, 0],
		Tijera : [0, 0, 1]
	}

	return convert[element]
}

function choice(listElements) {
	return listElements[Math.floor(Math.random() * listElements.length)];
}

function showPrediction(value) {
	return model.predict(tf.tensor([value])).dataSync();
}

function chooseElement(elementPlayer) {
	const player = elementPlayer
	const prediction = showPrediction(convertToBinary(player));

	let bot = choice(["Piedra", "Papel", "Tijera"]);
	if (prediction[0] >= 0.95) {
		bot = 'Piedra';
	}
	else if (prediction[1] >= 0.95) {
		bot = 'Papel';
	}
	else if (prediction[2] >= 0.95) {
		bot = 'Tijera';
	}

	if (chooseWinner(player, bot) === "Perdiste") {
		dataX.push(convertToBinary(player));
		dataY.push(convertToBinary(bot));
	}

	return { prediction: prediction, botElement: bot};
}

export function trainModel(epochs) {
	model.compile({ loss: "meanSquaredError", optimizer: "sgd" });
	return model.fit(tf.tensor(dataX), tf.tensor(dataY), { 	
		epochs: epochs,
		callbacks: {
			onTrainEnd: () => {
				console.log("Terminó");
			}
		}
	});
}

export async function botDecision(elementPlayer) {
	const result = chooseElement(elementPlayer);
	return result.botElement;
}

const model = createModel();

export const dataX = ["Piedra", "Papel", "Tijera"].map(element => {
	return convertToBinary(element);
});

const dataY = ["Papel", "Tijera", "Piedra"].map(element => {
	return convertToBinary(element);
});

trainModel(5);
