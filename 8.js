const readline = require('readline');

function run(instructions) {
	let max = Number.NEGATIVE_INFINITY;
	const map = new Map();

	for (const { register, operation, amount, cRegister, condition, cOperand } of instructions) {
		let value = map.get(register) || 0;
		let cValue = map.get(cRegister) || 0;
		let fn = operation === 'inc' ? v => v + amount : v => v - amount;

		switch (condition) {
			case '<': if (cValue < cOperand) value = fn(value); break;
			case '>': if (cValue > cOperand) value = fn(value); break;
			case '<=': if (cValue <= cOperand) value = fn(value); break;
			case '>=': if (cValue >= cOperand) value = fn(value); break;
			case '==': if (cValue == cOperand) value = fn(value); break;
			case '!=': if (cValue != cOperand) value = fn(value); break;
		}

		map.set(register, value);

		if (value > max) {
			max = value;
		}
	}

	return max;
}

function main() {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	let instructions = [];

	rl.on('line', line => {
		const match = /^(\w+) (inc|dec) (-?\d+) if (\w+) (<|>|>=|<=|==|!=) (-?\d+)$/.exec(line);

		let [, register, operation, amount, cRegister, condition, cOperand] = match;
		amount = parseInt(amount);
		cOperand = parseInt(cOperand);

		instructions.push({ register, operation, amount, cRegister, condition, cOperand });
	});

	rl.on('close', () => {
		console.log(run(instructions));
	});
}

main();