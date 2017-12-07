const readline = require('readline');

function isPassphraseValid(passphrase) {
	const words = passphrase.split(' ');
	const set = new Set();

	for (const word of words) {
		if (set.has(word)) {
			return false;
		}

		set.add(word);
	}

	return true;
}

function isPassphraseValid2(passphrase) {
	const words = passphrase.split(' ');
	const set = new Set();

	for (const word of words) {
		const sortedWord = word.split('').sort().join('');

		if (set.has(sortedWord)) {
			return false;
		}

		set.add(sortedWord);
	}

	return true;
}

function main() {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	let count = 0;

	rl.on('line', line => {
		if (!line) {
			process.exit(0);
		}

		count += isPassphraseValid2(line);
	});

	rl.on('close', () => console.log(count));
}

main();