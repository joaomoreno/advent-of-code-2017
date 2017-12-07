const readline = require('readline');

function getCoord(index) {
	let coord = [0, 0];
	let max = 1;
	let incr = 1;
	let flip = false;
	let direction = 0;

	while (max < index) {
		const diff = Math.min(index - max, incr);

		switch (direction) {
			case 0: coord[0] += diff; break;
			case 1: coord[1] -= diff; break;
			case 2: coord[0] -= diff; break;
			case 3: coord[1] += diff; break;
		}

		max += diff;

		if (max === index) {
			return coord;
		}

		direction = (direction + 1) % 4;

		if (flip) {
			incr++;
		}

		flip = !flip;
	}
}

function getFirstValueLargerThan(input) {
	const grid = {};
	grid['0,0'] = 1;
	grid['1,0'] = 1;

	const _ = (x, y) => grid[`${x},${y}`] || 0;

	let x = 1;
	let y = 1;
	let direction = 'up';
	let value;

	while (true) {
		value =
			_(x - 1, y + 1) +
			_(x - 1, y) +
			_(x - 1, y - 1) +
			_(x, y + 1) +
			_(x, y - 1) +
			_(x + 1, y + 1) +
			_(x + 1, y) +
			_(x + 1, y - 1);

		if (value > input) {
			return value;
		}

		grid[`${x},${y}`] = value;

		if (x === y && x > 0) {
			direction = 'left';
		} else if (x === -y && x < 0) {
			direction = 'down';
		} else if (x === y && x < 0) {
			direction = 'right';
		} else if (x - 1 === - y && x > 0) {
			direction = 'up';
		}

		switch (direction) {
			case 'up': y++; break;
			case 'left': x--; break;
			case 'down': y--; break;
			case 'right': x++; break;
		}
	}
}

function main() {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.on('line', line => {
		if (!line) {
			process.exit(0);
		}

		const value = parseInt(line);
		// const coord = getCoord(value);

		// console.log(coord);
		// console.log(Math.abs(coord[0]) + Math.abs(coord[1]));

		console.log(getFirstValueLargerThan(value));
	});
}

main();