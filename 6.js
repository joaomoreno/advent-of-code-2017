const readline = require('readline');

function hashBanks(banks) {
	return banks.join(',');
}

function maxIndex(banks) {
	let max = Number.NEGATIVE_INFINITY;
	let index = -1;

	for (let i = 0; i < banks.length; i++) {
		if (banks[i] > max) {
			max = banks[i];
			index = i;
		}
	}

	return index;
}

function stepsUntilLoop(banks) {
	const set = new Set();
	let count = 0;

	while (true) {
		const hash = hashBanks(banks);

		if (set.has(hash)) {
			return count;
		}

		set.add(hash);
		let index = maxIndex(banks);

		let blocks = banks[index];
		banks[index] = 0;

		for (let i = 1; i <= blocks; i++) {
			banks[(index + i) % banks.length]++;
		}

		count++;
	}
}

function main() {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	let banks;

	rl.on('line', line => {
		if (!line) {
			process.exit(0);
		}

		banks = line.split(/\s+/g).map(n => parseInt(n));
	});

	rl.on('close', () => console.log(stepsUntilLoop(banks)));
}

main();