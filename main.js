const grid = document.querySelector("#grid");
const gridSize = document.querySelector("#size");
const blackButton = document.querySelector("#black");
const rainbowButton = document.querySelector("#rainbow");
const eraserButton = document.querySelector("#eraser");
const resetButton = document.querySelector("#reset");
const slider = document.querySelector("#slider");
let lastMode = "pick-color";
let lastColor = "#000000";
rainbowButton.addEventListener("click", () => startPainting("rainbow"));
blackButton.addEventListener("click", () => startPainting("pick-color", "black"));
eraserButton.addEventListener("click", () => startPainting("eraser"));
resetButton.addEventListener("click", () => resetGrid());
slider.addEventListener("input", changeSize);

const colorPicker = document.querySelector("#color-picker");
colorPicker.addEventListener("input", (e) => {
	console.log(e);
	const rgbCode = e.target.value;
	startPainting("pick-color", rgbCode);
});

function createGrid(size) {
	grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
	for (let i = 1; i <= size * size; i++) {
		let square = document.createElement("div");
		grid.appendChild(square);
	}
}

function startPainting(mode, rgb) {
	const gridSquares = document.querySelectorAll("#grid > div");
	gridSquares.forEach((div) => {
		div.addEventListener("mouseenter", (e) => {
			if (mode === "pick-color") {
				e.target.style.background = rgb;
			} else if (mode === "rainbow") {
				let rainbowColor = Math.floor(Math.random() * 16777215).toString(16);
				e.target.style.background = `#${rainbowColor}`;
				lastUsed = "rainbow";
				lastColor = rainbowColor;
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
	startPainting(lastMode, lastColor);
}

window.onload = () => {
	createGrid(16);
	startPainting("pick-color", "#000000");
};
