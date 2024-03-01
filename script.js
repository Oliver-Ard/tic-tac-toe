const gameBoard = (function () {
	let board = ["", "", "", "", "", "", "", "", ""];

	function resetBoard() {
		return (board = ["", "", "", "", "", "", "", "", ""]);
	}

	function getBoard() {
		return board;
	}

	function displayBoard() {
		console.log(`${board[0]} | ${board[1]} | ${board[2]}`);
		console.log(`${board[3]} | ${board[4]} | ${board[5]}`);
		console.log(`${board[6]} | ${board[7]} | ${board[8]}`);
	}

	return { getBoard, resetBoard, displayBoard };
})();

function Player(playerName, playerMarker) {
	function getPlayerName() {
		return playerName;
	}

	function getPlayerMark() {
		return playerMarker;
	}

	return { getPlayerName, getPlayerMark };
}

function GameController(firstPlayer, secondPlayer) {
	let board = gameBoard.getBoard();
	const playerOne = firstPlayer;
	const playerTwo = secondPlayer;
	const winConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	let currentPlayer = playerOne;
	let running = true;

	function placeMarker(cellIndex) {
		if (board[cellIndex] !== "" || !running) {
			return;
		}

		updateCell(cellIndex);
		checkWinner();
	}

	function updateCell(index) {
		board[index] = currentPlayer.getPlayerMark();
		gameBoard.displayBoard();
	}

	function switchPlayerTurn() {
		currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;

		if (currentPlayer === playerOne) {
			console.log(`Is ${playerOne.getPlayerName()}'s turn`);
		} else {
			console.log(`Is ${playerTwo.getPlayerName()}'s turn`);
		}
	}

	function checkWinner() {
		let roundWon = false;

		for (let i = 0; i < winConditions.length; i++) {
			const condition = winConditions[i];
			const cellA = board[condition[0]];
			const cellB = board[condition[1]];
			const cellC = board[condition[2]];

			if (cellA === "" || cellB === "" || cellC === "") {
				continue;
			}

			if (cellA === cellB && cellB === cellC) {
				roundWon = true;
				break;
			}
		}

		if (roundWon) {
			console.log(
				`${
					currentPlayer === playerOne
						? playerOne.getPlayerName()
						: playerTwo.getPlayerName()
				} won!!!`
			);
			running = false;
		} else if (!board.includes("")) {
			console.log("Draw!");
			running = false;
		} else {
			switchPlayerTurn();
		}
	}

	function restartGame() {
		currentPlayer = playerOne;
		board = gameBoard.resetBoard();
		initGame();
		running = true;
	}

	function getCurrentPlayerName() {
		return currentPlayer.getPlayerName();
	}

	function getCurrentPlayerMark() {
		return currentPlayer.getPlayerMark();
	}

	function initGame() {
		gameBoard.displayBoard();
		if (currentPlayer === playerOne) {
			console.log(`Is ${playerOne.getPlayerName()}'s turn`);
		} else {
			console.log(`Is ${playerTwo.getPlayerName()}'s turn`);
		}
	}

	initGame();

	return {
		placeMarker,
		switchPlayerTurn,
		checkWinner,
		getCurrentPlayerName,
		getCurrentPlayerMark,
		restartGame,
	};
}

const game = GameController(Player("Arthur", "X"), Player("Mary", "O"));
