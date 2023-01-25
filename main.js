// Naming buttons and grid to add events
const grid = document.querySelector("#grid");
const gridSize = document.querySelector("#size");
const blackButton = document.querySelector("#black");
const rainbowButton = document.querySelector("#rainbow");
const eraserButton = document.querySelector("#eraser");
const resetButton = document.querySelector("#reset");
const slider = document.querySelector("#slider");
const colorPicker = document.querySelector("#color-picker");

// Upon loading this creates the default 16x16 grid and start painting in black mode
window.onload = () => {
	createGrid(16);
	startPainting("pick-color", "#000000");
};

// Events for each button
rainbowButton.addEventListener("click", () => startPainting("rainbow"));
blackButton.addEventListener("click", () => startPainting("pick-color", "black"));
eraserButton.addEventListener("click", () => startPainting("eraser"));
resetButton.addEventListener("click", () => resetGrid());

// Takes input from slider for the grid size
slider.addEventListener("input", () => changeSize(slider.value));

// Sends a hex color code to painting function if user selects from the color wheel
colorPicker.addEventListener("input", (e) => {
	const userHexCode = e.target.value;
	startPainting("pick-color", userHexCode);
});

// Uses input from slider to change the size of the grid
function createGrid(size) {
	grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
	for (let i = 1; i <= size * size; i++) {
		let square = document.createElement("div");
		grid.appendChild(square);
	}
}

// Paint mode
function startPainting(mode, color) {
	const gridSquares = document.querySelectorAll("#grid > div"); // Looks at all divs created from createGrid function
	gridSquares.forEach((div) => {
		// Applies the following code to each div created
		div.addEventListener("mouseenter", (e) => {
			if (mode === "pick-color") {
				e.target.style.background = color;
			} else if (mode === "rainbow") {
				let rainbowColor = Math.floor(Math.random() * 16777215).toString(16); // Generates random hex color code
				e.target.style.background = `#${rainbowColor}`;
			} else {
				e.target.style.background = "white"; // Eraser mode
			}
		});
	});
}
// Resets the grid turning all squares to white
function resetGrid() {
	const gridSquares = document.querySelectorAll("#grid > div");
	gridSquares.forEach((div) => {
		div.style.background = "white";
	});
}

// Changes the size of grid to whatever user selects on slider input
function changeSize(newSize) {
	createGrid(newSize);
	resetGrid();
	gridSize.innerText = `${newSize} x ${newSize}`; // Changes text below slider to match the grid size
	startPainting("pick-color", "#000000"); // Reverts back to default paint mode
}
