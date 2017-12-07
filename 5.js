const readline = require('readline');

function stepsUntilExit(instructions) {
	let steps = 0;
	let pc = 0;

	while (pc >= 0 && pc < instructions.length) {
		const oldPc = pc;
		pc += instructions[pc];
		instructions[oldPc] += instructions[oldPc] >= 3 ? -1 : 1;
		steps++;
	}

	return steps;
}

function main() {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	const instructions = [];

	rl.on('line', line => {
		if (!line) {
			process.exit(0);
		}

		instructions.push(parseInt(line));
	});

	rl.on('close', () => console.log(stepsUntilExit(instructions)));
}

main();