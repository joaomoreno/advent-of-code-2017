/*
--- Day 3: Spiral Memory ---

You come across an experimental new kind of memory stored on an infinite two-dimensional grid.

Each square on the grid is allocated in a spiral pattern starting at a location marked 1 and then counting up while spiraling outward. For example, the first few squares are allocated like this:

17  16  15  14  13
18   5   4   3  12
19   6   1   2  11
20   7   8   9  10
21  22  23---> ...
While this is very space-efficient (no squares are skipped), requested data must be carried back to square 1 (the location of the only access port for this memory system) by programs that can only move up, down, left, or right. They always take the shortest path: the Manhattan Distance between the location of the data and square 1.

For example:

Data from square 1 is carried 0 steps, since it's at the access port.
Data from square 12 is carried 3 steps, such as: down, left, left.
Data from square 23 is carried only 2 steps: up twice.
Data from square 1024 must be carried 31 steps.
How many steps are required to carry the data from the square identified in your puzzle input all the way to the access port?

--- Part Two ---

As a stress test on the system, the programs here clear the grid and then store the value 1 in square 1. Then, in the same allocation order as shown above, they store the sum of the values in all adjacent squares, including diagonals.

So, the first few squares' values are chosen as follows:

Square 1 starts with the value 1.
Square 2 has only one adjacent filled square (with value 1), so it also stores 1.
Square 3 has both of the above squares as neighbors and stores the sum of their values, 2.
Square 4 has all three of the aforementioned squares as neighbors and stores the sum of their values, 4.
Square 5 only has the first and fourth squares as neighbors, so it gets the value 5.
Once a square is written, its value does not change. Therefore, the first few squares would receive the following values:

147  142  133  122   59
304    5    4    2   57
330   10    1    1   54
351   11   23   25   26
362  747  806--->   ...
What is the first value written that is larger than your puzzle input?
*/

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