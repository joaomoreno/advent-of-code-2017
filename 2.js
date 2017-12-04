const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let result = 0;

rl.on('line', line => {
	let min = Number.POSITIVE_INFINITY;
	let max = Number.NEGATIVE_INFINITY;
	const values = line.split(/\W/g).map(n => parseInt(n));

	for (const n of values) {
		if (n < min) {
			min = n;
		}

		if (n > max) {
			max = n;
		}
	}

	result += max - min;
});

rl.on('close', () => console.log(result));