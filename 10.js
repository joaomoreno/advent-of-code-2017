/*
*/

const readline = require('readline');

function reverse(list, pos, length) {
	for (let i = 0; i < length / 2; i++) {
		let from = (pos + i) % list.length;
		let to = (pos + length - i - 1) % list.length;

		list[from] = list[from] ^ list[to];
		list[to] = list[from] ^ list[to];
		list[from] = list[from] ^ list[to];
	}
}

function hash(lengths, length = 256) {
	const list = Array(length).fill(0).map((_, i) => i);
	let pos = 0, skip = 0;

	for (const length of lengths) {
		reverse(list, pos, length);
		pos += (length + skip) % list.length;
		skip++;
	}

	return list[0] * list[1];
}

function main() {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	let lengths;

	rl.on('line', line => lengths = line.split(',').map(v => parseInt(v)));
	rl.on('close', () => console.log(hash(lengths)));
}

main();