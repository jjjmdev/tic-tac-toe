const items = document.querySelectorAll(".item");
const winner = document.querySelector(".winner");
let turn = "X";

items.forEach((item) => {
	item.addEventListener("click", respond, { once: true });
});

const itemsRemove = () => {
	items.forEach((item) => {
		item.removeEventListener("click", respond);
	});
};

function respond(e) {
	const { target } = e;
	target.classList += " clicked";
	target.innerHTML = turn;

	if (turn === "X") {
		playerXTurn.makeTurn(target.dataset.index);
		turn = "O";
	} else {
		playerOTurn.makeTurn(target.dataset.index);
		turn = "X";
	}

	if (
		winner.innerHTML === "" &&
		playerXTurn.marked.length + playerOTurn.marked.length === 9
	) {
		winner.innerHTML = `
		<video width="450" autoplay>
			<source src="draw.mp4" type="video/mp4">
	 </video> `;

		itemsRemove();
	}
}

const playerXTurn = makePlayer("X");
const playerOTurn = makePlayer("O");

function makePlayer(player) {
	const combinations = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 5, 9],
		[3, 5, 7],
		[1, 4, 7],
		[3, 6, 9],
	];
	let marked = [];

	const makeTurn = function (index) {
		marked.push(parseInt(index));

		// check if may kaparehas na pattern
		for (let i = 0; i < combinations.length; i++) {
			if (
				marked.length >= 3 &&
				combinations[i].every((combinationItem) =>
					marked.includes(combinationItem)
				)
			) {
				winner.innerHTML = `Player ${turn} wins!!`;
				itemsRemove();
			}
		}
	};

	return { makeTurn, marked };
}
