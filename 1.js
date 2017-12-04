function main(input) {
	let result = 0;

	for (let i = 0; i < input.length; i++) {
		if (input[i] === input[(i + 1) % input.length]) {
			result += parseInt(input[i]);
		}
	}

	return result;
}

function main2(input) {
	let result = 0;

	for (let i = 0; i < input.length; i++) {
		if (input[i] === input[(i + (input.length / 2)) % input.length]) {
			result += parseInt(input[i]);
		}
	}

	return result;
}

console.log(main2(process.argv[2]));