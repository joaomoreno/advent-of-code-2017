const readline = require('readline');
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function main() {
	let result = 0;

	rl.on('line', line => {
		const n = parseInt(line);
		let coord = [0, 0];
		let max = 1;
		let incr = 1;
		let flip = false;
		let direction = 0;

		while (max < n) {
			const diff = Math.min(n - max, incr);

			switch (direction) {
				case 0: coord[0] += diff; break;
				case 1: coord[1] -= diff; break;
				case 2: coord[0] -= diff; break;
				case 3: coord[1] += diff; break;
			}

			max += diff;

			if (max === n) {
				console.log(coord);
				console.log(Math.abs(coord[0]) + Math.abs(coord[1]));
				return;
			}

			direction = (direction + 1) % 4;

			if (flip) {
				incr++;
			}

			flip = !flip;
		}
	});

	rl.on('close', () => console.log(result));
}

main();