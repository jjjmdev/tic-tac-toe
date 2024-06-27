const items = document.querySelectorAll(".item");
// const itemContainer = document.querySelector(".item-container");
const winner = document.querySelector(".winner");
let turn = "X",
	x = [],
	o = [];

items.forEach((item) => {
	item.addEventListener("click", respond, { once: true });
});

function respond(e) {
	e.target.classList += " clicked";
	e.target.innerHTML = turn;

	makeTurn(e.target.dataset.index);
}

const combinations = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 5, 9],
	[3, 5, 7],
	[1, 4, 7],
	[3, 6, 9],
];

const dummy = [1, 5, 6, 9];

function check(arr) {
	const arrayToCheck = arr;

	for (let i = 0; i < combinations.length; i++) {
		// there's a combination in the value of arrayToCheck
		if (
			arrayToCheck.length >= 3 &&
			combinations[i].every((combinationItem) =>
				arrayToCheck.includes(combinationItem)
			)
		) {
			declareWinner();
		} else if (x.length + o.length === 9) {
			declareDraw();
		}
	}
}

function makeTurn(index) {
	if (turn === "X") {
		x.push(parseInt(index));
		check(x);
		turn = "O";
	} else if (turn === "O") {
		o.push(parseInt(index));
		check(o);
		turn = "X";
	}
}

function declareWinner() {
	winner.innerHTML = `Player ${turn} wins!!`;

	items.forEach((item) => {
		item.removeEventListener("click", respond);
	});
}

function declareDraw() {
	winner.innerHTML = `
	 <video width="450" autoplay>
 		<source src="draw.mp4" type="video/mp4">
	</video> `;

	items.forEach((item) => {
		item.removeEventListener("click", respond);
	});
}
