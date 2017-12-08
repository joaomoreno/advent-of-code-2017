const readline = require('readline');

function findRootAndMakeNodeMap(nodes) {
	const map = new Map();
	const toNodes = new Set();

	for (const node of nodes) {
		map.set(node.name, { weight: node.weight, children: node.children });

		for (const child of node.children) {
			toNodes.add(child);
		}
	}

	for (const [name,] of map) {
		if (!toNodes.has(name)) {
			return { rootName: name, map };
		}
	}
}

function createWeightMap(map, root) {
	function loop(name) {
		const node = map.get(name);

		let weight = node.weight;

		const childrenWeightMap = new Map();

		for (const child of node.children) {
			const childWeight = loop(child);

			const sameWeightChildren = childrenWeightMap.get(childWeight) || [];
			sameWeightChildren.push(child);
			childrenWeightMap.set(childWeight, sameWeightChildren);

			weight += childWeight;
		}

		if (childrenWeightMap.size > 1) {
			let badWeight, goodWeight, badChildWeight;

			for (const [weight, children] of childrenWeightMap) {
				if (children.length === 1) {
					badWeight = weight;
					badChildWeight = map.get(children[0]).weight;
				} else {
					goodWeight = weight;
				}
			}

			throw (goodWeight - badWeight) + badChildWeight;
		}

		console.log(name, weight);
		return weight;
	}

	loop(root);
}

function main() {
	const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
	let nodes = [];

	rl.on('line', line => {
		const match = /^(\w+) \((\d+)\)( -> (.*))?$/.exec(line);

		const name = match[1];
		const weight = parseInt(match[2]);
		const children = match[3] ? match[4].split(', ') : [];
		nodes.push({ name, weight, children });
	});

	rl.on('close', () => {
		const { rootName, map } = findRootAndMakeNodeMap(nodes);

		try {
			createWeightMap(map, rootName);
		} catch (name) {
			console.log(name);
		}
	});
}

main();