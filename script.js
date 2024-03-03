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

const createSections = (function () {
	const welcomeSection = document.querySelector("#welcome-screen");
	const selectPlayersSection = document.querySelector("#select-players-screen");
	const gameSection = document.querySelector("#game-screen");
	const endGameModal = document.querySelector("#end-game-modal");

	function createWelcomeSection() {
		// H1
		const h1 = document.createElement("h1");
		h1.textContent = "Welcome at";
		const br = document.createElement("br");
		h1.append(br);
		h1TextNode = document.createTextNode("Tic-Tac-Toe");
		h1.append(h1TextNode);
		welcomeSection.append(h1);

		// Button
		const button = document.createElement("button");
		button.setAttribute("id", "welcome-btn");
		button.classList.add("standard-btn");
		button.textContent = "Play Game";
		welcomeSection.append(button);
	}

	function createSelectPlayersSection() {
		// H2
		const h2 = document.createElement("h2");
		h2.setAttribute("id", "select-players-text");
		h2.textContent = "Select Players";
		selectPlayersSection.append(h2);

		// Play Game Btn
		const playGameBtn = document.createElement("button");
		playGameBtn.setAttribute("id", "play-game-btn");
		playGameBtn.classList.add("standard-btn", "play-game-btn");
		playGameBtn.textContent = "Play";
		selectPlayersSection.append(playGameBtn);

		// Cards Wrapper
		const cardsWrapper = document.createElement("div");
		cardsWrapper.classList.add("cards-wrapper");

		// Players Cards
		const playerOneCard = createPlayerCard(
			"Player One",
			"X",
			"Arthur",
			"player-one-form",
			"player-one-name"
		);
		cardsWrapper.append(playerOneCard);
		const playerTwoCard = createPlayerCard(
			"Player Two",
			"O",
			"Sadie",
			"player-two-form",
			"player-two-name"
		);
		cardsWrapper.append(playerTwoCard);
		selectPlayersSection.append(cardsWrapper);
	}

	function createPlayerCard(
		playerName,
		playerSign,
		placeholderText,
		playerForm,
		playerInputName
	) {
		// Player Card Container
		const playerCard = document.createElement("div");
		playerCard.classList.add("player-card");

		// H3
		const h3 = document.createElement("h3");
		h3.textContent = playerName;
		playerCard.append(h3);

		// Player Sign
		const playerSignText = document.createElement("p");
		playerSignText.classList.add("player-sign");
		playerSignText.textContent = playerSign;
		playerCard.append(playerSignText);

		// Player Form
		const form = document.createElement("form");
		form.setAttribute("id", playerForm);
		form.setAttribute("action", "#");
		form.setAttribute("method", "post");
		// Form Label
		const label = document.createElement("label");
		label.setAttribute("for", playerInputName);
		label.textContent = "Name";
		form.append(label);
		// Form Input
		const input = document.createElement("input");
		input.setAttribute("type", "text");
		input.setAttribute("id", playerInputName);
		input.setAttribute("name", "name");
		input.setAttribute("placeholder", placeholderText);
		input.setAttribute("required", "");
		input.setAttribute("minlength", "4");
		input.setAttribute("maxlength", "16");
		form.append(input);
		// Form Btn
		const button = document.createElement("button");
		button.classList.add("standard-btn");
		button.textContent = "Select";
		form.append(button);

		playerCard.append(form);

		return playerCard;
	}

	function createGameSection() {
		// H2
		const h2 = document.createElement("h2");
		h2.setAttribute("id", "player-turn-text");
		h2.textContent = "Sadie's Turn";
		gameSection.append(h2);

		// Game Board
		const gameBoardContainer = document.createElement("div");
		gameBoardContainer.setAttribute("id", "game-board");
		gameBoardContainer.classList.add("game-board", "x");

		// Game Board Cells
		for (let i = 0; i <= 8; i++) {
			const button = document.createElement("button");
			button.classList.add("board-cell");
			button.dataset.cell = `${i}`;
			gameBoardContainer.append(button);
		}
		gameSection.append(gameBoardContainer);
	}

	function createEndGameModal() {
		// H2
		const h2 = document.createElement("h2");
		h2.setAttribute("id", "winner-text");
		h2.textContent = "Sadie Won!";
		endGameModal.append(h2);

		// Btns Wrapper
		const btnsWrapper = document.createElement("div");
		btnsWrapper.classList.add("btns-wrapper");

		// Play Again Btn
		const playAgainBtn = document.createElement("button");
		playAgainBtn.setAttribute("id", "play-again-btn");
		playAgainBtn.classList.add("standard-btn");
		playAgainBtn.textContent = "Play Again";
		btnsWrapper.append(playAgainBtn);

		// Restart Game Btn
		const restartGameBtn = document.createElement("button");
		restartGameBtn.setAttribute("id", "restart-game-btn");
		restartGameBtn.classList.add("standard-btn");
		restartGameBtn.textContent = "Restart Game";
		btnsWrapper.append(restartGameBtn);

		endGameModal.append(btnsWrapper);
	}
	createWelcomeSection();
	createSelectPlayersSection();
	createGameSection();
	createEndGameModal();

	return {
		welcomeSection,
		selectPlayersSection,
		gameSection,
		endGameModal,
		createWelcomeSection,
		createSelectPlayersSection,
		createGameSection,
		createEndGameModal,
	};
})();

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

// Screen Controller
const screenController = (function () {
	// Welcome Section
	const welcomeBtn = document.querySelector("#welcome-btn");
	// Select Players Section
	const playerOneForm = document.querySelector("#player-one-form");
	const playerTwoForm = document.querySelector("#player-two-form");
	const playerOneInput = document.querySelector("#player-one-name");
	const playerTwoInput = document.querySelector("#player-two-name");
	const playGameBtn = document.querySelector("#play-game-btn");
	const selectPlayersText = document.querySelector("#select-players-text");
	// Game Section
	const playerTurnText = document.querySelector("#player-turn-text");
	const gameBoardEl = document.querySelector("#game-board");
	// End Game Section

	let playerOneName = "";
	let playerTwoName = "";
	let game;

	function playGame() {
		if (playerOneName !== "" && playerTwoName !== "") {
			game = GameController(
				Player(playerOneName, "X"),
				Player(playerTwoName, "O")
			);
			selectPlayersText.classList.remove("select-players-text");
			switchSections(
				createSections.selectPlayersSection,
				createSections.gameSection
			);

			playerTurnText.textContent = `${game.getCurrentPlayerName()}'s Turn`;
		} else {
			selectPlayersText.classList.add("select-players-text");
		}
	}

	// --Helper Functions--
	function handleWelcomeBtn() {
		switchSections(
			createSections.welcomeSection,
			createSections.selectPlayersSection
		);
	}

	function handleFormInput(playerInput) {
		if (playerInput.value !== "") {
			playerInput.disabled = true;
		}
	}

	function handlePlayerOneForm(e) {
		e.preventDefault();
		handleFormInput(playerOneInput);
		playerOneName = playerOneInput.value;
		playerTwoInput.focus();

		console.log(playerOneName);
	}

	function handlePlayerTwoForm(e) {
		e.preventDefault();
		handleFormInput(playerTwoInput);
		playerTwoName = playerTwoInput.value;
		playGameBtn.focus();

		console.log(playerTwoName);
	}

	function switchSections(elementOne, elementTwo) {
		elementOne.classList.toggle("hide");
		elementTwo.classList.toggle("hide");
	}

	// --Event Listeners--
	welcomeBtn.addEventListener("click", handleWelcomeBtn);
	playerOneForm.addEventListener("submit", handlePlayerOneForm);
	playerTwoForm.addEventListener("submit", handlePlayerTwoForm);
	playGameBtn.addEventListener("click", playGame);
	// document.addEventListener("click", () => {
	// 	createSections.endGameModal.showModal();
	// });

	// document.addEventListener("keydown", (e) => {
	// 	if (e.key === "Escape" && createSections.endGameModal.open) {
	// 		e.preventDefault();
	// 	}
	// });
})();
