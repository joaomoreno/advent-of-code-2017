function main(input) {
	let result = 0;

	for (let i = 0; i < input.length; i++) {
		if (input[i] === input[(i + 1) % input.length]) {
			result += parseInt(input[i]);
		}
	}

	return result;
}

console.log(main(process.argv[2]));