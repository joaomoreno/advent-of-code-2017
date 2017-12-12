/*
--- Day 11: Hex Ed ---

Crossing the bridge, you've barely reached the other side of the stream when a program comes up to you, clearly in distress. "It's my child process," she says, "he's gotten lost in an infinite grid!"

Fortunately for her, you have plenty of experience with infinite grids.

Unfortunately for you, it's a hex grid.

The hexagons ("hexes") in this grid are aligned such that adjacent hexes can be found to the north, northeast, southeast, south, southwest, and northwest:

  \ n  /
nw +--+ ne
  /    \
-+      +-
  \    /
sw +--+ se
  / s  \
You have the path the child process took. Starting where he started, you need to determine the fewest number of steps required to reach him. (A "step" means to move from the hex you are in to any adjacent hex.)

For example:

ne,ne,ne is 3 steps away.
ne,ne,sw,sw is 0 steps away (back where you started).
ne,ne,s,s is 2 steps away (se,se).
se,sw,se,sw,sw is 3 steps away (s,s,sw).

--- Part Two ---

How many steps away is the furthest he ever got from his starting position?
*/

const readline = require('readline');

function walkStep(coord, step) {
	const [x, y] = coord;
	const even = x % 2 === 0;

	switch (step) {
		case 'n': return [x, y + 1];
		case 'ne': return [x + 1, even ? y : y + 1];
		case 'se': return [x + 1, even ? y - 1 : y];
		case 's': return [x, y - 1];
		case 'sw': return [x - 1, even ? y - 1 : y];
		case 'nw': return [x - 1, even ? y : y + 1];
	}
}

function distance(from, to) {
	if (from[0] === to[0]) {
		return Math.abs(from[1] - to[1]);
	}

	if (from[1] === to[1]) {
		return Math.abs(from[0] - to[0]);
	}

	let step = (from[1] > to[1] ? 's' : 'n') + (from[0] > to[0] ? 'w' : 'e');
	return 1 + distance(walkStep(from, step), to);
}

function walk(coord, steps) {
	let max = Number.NEGATIVE_INFINITY;

	for (const step of steps) {
		coord = walkStep(coord, step);

		const dist = distance(coord, origin);

		if (dist > max) {
			max = dist;
		}
	}

	return max;
}

const origin = [0, 0];

function main() {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	let steps;

	rl.on('line', line => steps = line.split(','));
	rl.on('close', () => console.log(walk(origin, steps)));
}

main();