const readline = require('readline');

function parse(input) {
	let lastPop, garbagge = false, garbaggeCount = 0;
	const stack = [];

	for (let i = 0; i < input.length; i++) {
		const char = input[i];

		if (char === '!') {
			i++;

		} else if (!garbagge && char === '<') {
			garbagge = true;

		} else if (garbagge && char === '>') {
			garbagge = false;

		} else if (!garbagge && char === '{') {
			const node = { children: [] };

			if (stack.length > 0) {
				stack[stack.length - 1].children.push(node);
			}

			stack.push(node);

		} else if (!garbagge && char === '}') {
			lastPop = stack.pop();

		} else if (garbagge) {
			garbaggeCount++;
		}
	}

	return garbaggeCount;
}

function getTotalScore(node, level = 1) {
	let result = level;

	for (const child of node.children) {
		result += getTotalScore(child, level + 1);
	}

	return result;
}

function main() {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	let input;

	rl.on('line', line => input = line);

	rl.on('close', () => {
		console.log(parse(input));
	});
}

main();