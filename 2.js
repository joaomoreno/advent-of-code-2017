const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function main() {
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
}

function main2() {
	let result = 0;

	rl.on('line', line => {
		// let min = Number.POSITIVE_INFINITY;
		// let max = Number.NEGATIVE_INFINITY;
		const values = line
			.split(/\W+/g)
			.map(n => parseInt(n))
			.sort((a, b) => a < b ? -1 : 1);

		for (let i = 0; i < values.length; i++) {
			for (let j = i + 1; j < values.length; j++) {
				if (values[j] % values[i] === 0) {
					result += values[j] / values[i];
					return;
				}
			}
		}

		throw new Error('whoops');
	});

	rl.on('close', () => console.log(result));
}

main2();