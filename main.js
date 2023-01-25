const grid = document.querySelector("#grid");
const gridSize = document.querySelector("#size");
const colorButton = document.querySelector("#color");
const rainbowButton = document.querySelector("#rainbow");
const eraserButton = document.querySelector("#eraser");
const resetButton = document.querySelector("#reset");
const slider = document.querySelector("#slider");
rainbowButton.addEventListener("click", () => startPainting("rainbow"));
colorButton.addEventListener("click", () => startPainting("default"));
eraserButton.addEventListener("click", () => startPainting("eraser"));
resetButton.addEventListener("click", () => resetGrid());
slider.addEventListener("input", changeSize);
let lastUsed = "default";

function createGrid(size) {
	grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
	for (let i = 1; i <= size * size; i++) {
		let square = document.createElement("div");
		grid.appendChild(square);
	}
}

function startPainting(mode) {
	const gridSquares = document.querySelectorAll("#grid > div");
	gridSquares.forEach((div) => {
		div.addEventListener("mouseenter", (e) => {
			if (mode === "default") {
				e.target.style.background = "black";
			} else if (mode === "rainbow") {
				let rainbowColor = Math.floor(Math.random() * 16777215).toString(16);
				e.target.style.background = `#${rainbowColor}`;
				lastUsed = "rainbow";
			} else {
				e.target.style.background = "white";
			}
		});
	});
}

function resetGrid() {
	const gridSquares = document.querySelectorAll("#grid > div");
	gridSquares.forEach((div) => {
		div.style.background = "white";
	});
}

function changeSize() {
	resetGrid();
	let newGridSize = slider.value;
	gridSize.innerText = `${newGridSize} x ${newGridSize}`;
	createGrid(newGridSize);
	startPainting(lastUsed);
}

window.onload = () => {
	createGrid(16);
	startPainting("default");
};
