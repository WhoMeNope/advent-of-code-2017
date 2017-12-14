const input = 312051;

let sequence = [1, 1, 2, 4, 5, 10, 11, 23, 25];
let precomputed = 9;

for(let i = 1; i < 100; i++) {
	let val = valAtIndex(i);
	sequence.push(val);
	console.log(i, val);
	if(val > input) {
		 console.log(val);
		 break;
	}
}

function valAtIndex(index) {
	if(index <= precomputed)
		return sequence[index-1];

	let neighbours = adjacent(index);

	let val = 0;
	for(let n of neighbours)
		val += valAtIndex(n);

	return val;
}

function adjacent(index) {
	let side = sideSizeForIndex(index);
	let firstInSide = (side - 2) * (side - 2) + 1;

	//first, second, second to last, and last
	if(index == firstInSide)
		return [index - 1, (side - 4) * (side - 4) + 1];
	if(index == firstInSide + 1)
		return [index - 1, index - 2, (side - 4) * (side - 4) + 1, (side - 4) * (side - 4) + 2];
	if(index == side * side)
		return [index - 1, (side - 2) * (side - 2), (side - 2) * (side - 2) + 1];
	if(index == side * side - 1)
		return [index - 1, (side - 2) * (side - 2) - 1, (side - 2) * (side - 2), (side - 2) * (side - 2) + 1];

	let cornerInd = 0;
	let corner = getCornerIndex(side, cornerInd);
	let smallCornerIndex = getCornerIndex(side - 2, cornerInd);

	//until first corner
	if(index > firstInSide + 1 && index < corner - 1) {
		let t = index - firstInSide - 1;
		return [index - 1, (side - 4) * (side - 4) + t, (side - 4) * (side - 4) + 1 + t, (side - 4) * (side - 4) + 2 + t];
	}

	//rest of square
	while(cornerInd < 4) {
		// corner
		if(index == corner - 1)
			return [index - 1, smallCornerIndex, smallCornerIndex - 1];
		if(index == corner)
			return [index - 1, smallCornerIndex];
		if(index == corner + 1)
			return [index - 1, index - 2, smallCornerIndex, smallCornerIndex + 1];
		
		//til next corner
		if(index > corner + 1 && index < corner + side - 2) {
			let t = index - corner - 2;
			return [index - 1, smallCornerIndex + t, smallCornerIndex + t + 1, smallCornerIndex + t + 2];
		}

		cornerInd++;
		corner = getCornerIndex(side, cornerInd);
		smallCornerIndex = getCornerIndex(side - 2, cornerInd);
	}

	console.error("Did not find index...");
	return [];
}

function getCornerIndex(side, corner) {
	return (side - 2) * (side - 2) + side - 1 + corner * (side - 1);
}

function sideSizeForIndex(n) {
	var squareSize = 1;
	while (n > squareSize * squareSize) {
		squareSize += 2;
	}
	return squareSize;
}
