const input = 312051;

function sideSizeForNum(n) {
	var squareSize = 1;

	while (n > squareSize * squareSize) {
		squareSize += 2;
	}

	return squareSize;
}

let sideSize = sideSizeForNum(input);

function carrySteps(n, side) {
	let halfside = (side - 1) / 2;
	let closestCenter = side * side - halfside;

	while (closestCenter - halfside > n) {
		closestCenter -= 2 * halfside;
	}

	let sideSteps = Math.abs(closestCenter - input);

	//horizontal distance + vertical distance
	return sideSteps + halfside;
}

let steps = carrySteps(input, sideSize);
console.log(steps);
