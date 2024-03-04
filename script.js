// --Board Object--
const gameBoard = (function () {
	let board = ["", "", "", "", "", "", "", "", ""];

	function resetBoard() {
		return (board = ["", "", "", "", "", "", "", "", ""]);
	}

	function getBoard() {
		return board;
	}

	return { getBoard, resetBoard };
})();

// --Player Object--
function player(playerName, playerMarker) {
	function getPlayerName() {
		return playerName;
	}

	function getPlayerMark() {
		return playerMarker;
	}

	return { getPlayerName, getPlayerMark };
}

// --Game Controller Object--
function gameController(firstPlayer, secondPlayer) {
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
		} else {
			board[cellIndex] = currentPlayer.getPlayerMark();
		}
		checkWinner();
	}

	function checkWinner() {
		let roundWon = false;

		// Check the winning conditions
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
			running = false;
		} else if (!board.includes("")) {
			running = "draw";
		} else {
			switchPlayerTurn();
		}
	}

	function switchPlayerTurn() {
		currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
	}

	function resetGame() {
		currentPlayer = playerOne;
		board = gameBoard.resetBoard();
		running = true;
	}

	function getCurrentPlayerName() {
		return currentPlayer.getPlayerName();
	}

	function getGameStatus() {
		return running;
	}

	return {
		placeMarker,
		getCurrentPlayerName,
		getGameStatus,
		resetGame,
	};
}

// --Display Sections Object--
const displaySections = (function () {
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
		input.setAttribute("minlength", "3");
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

	function renderSections() {
		createWelcomeSection();
		createSelectPlayersSection();
		createGameSection();
		createEndGameModal();
	}

	renderSections();

	return {
		welcomeSection,
		selectPlayersSection,
		gameSection,
		endGameModal,
	};
})();

// --Screen Controller Object--
const screenController = (function () {
	// Welcome Section
	const welcomeBtn = document.querySelector("#welcome-btn");
	// Select Players Section
	const playerOneForm = document.querySelector("#player-one-form");
	const playerTwoForm = document.querySelector("#player-two-form");
	const playerOneInput = document.querySelector("#player-one-name");
	const playerTwoInput = document.querySelector("#player-two-name");
	const selectPlayersText = document.querySelector("#select-players-text");
	const playGameBtn = document.querySelector("#play-game-btn");
	// Game Section
	const playerTurnText = document.querySelector("#player-turn-text");
	const gameBoardEl = document.querySelector("#game-board");
	// End Game Section
	const winnerText = document.querySelector("#winner-text");
	const playAgainBtn = document.querySelector("#play-again-btn");
	const restartGameBtn = document.querySelector("#restart-game-btn");

	let playerOneName = "";
	let playerTwoName = "";
	let game;

	function playGame() {
		if (playerOneName !== "" && playerTwoName !== "") {
			game = gameController(
				player(playerOneName, "X"),
				player(playerTwoName, "O")
			);

			selectPlayersText.classList.remove("select-players-text");
			switchSections(
				displaySections.selectPlayersSection,
				displaySections.gameSection
			);

			playerTurnText.textContent = `${game.getCurrentPlayerName()}'s Turn`;
		} else {
			// Highlight to the player that the players must be selected first before playing
			selectPlayersText.textContent = "Select Players";
			selectPlayersText.classList.add("select-players-text");
		}
	}

	function placeMarkerOnTheBoard(e) {
		const targetEl = e.target;

		if (
			game.getCurrentPlayerName() === playerOneName &&
			!targetEl.className.includes("circle")
		) {
			game.placeMarker(targetEl.dataset.cell);
			targetEl.classList.add("x");
			// This classes are for the hover effect of the marks
			gameBoardEl.classList.remove("x");
			gameBoardEl.classList.add("circle");
			playerTurnText.textContent = `${game.getCurrentPlayerName()}'s Turn`;
		} else if (
			game.getCurrentPlayerName() === playerTwoName &&
			!targetEl.className.includes("x")
		) {
			game.placeMarker(targetEl.dataset.cell);
			targetEl.classList.add("circle");
			gameBoardEl.classList.remove("circle");
			gameBoardEl.classList.add("x");
			playerTurnText.textContent = `${game.getCurrentPlayerName()}'s Turn`;
		}

		openEndGameModal();
	}

	function openEndGameModal() {
		// This conditions is for checking when the game ended
		if (!game.getGameStatus()) {
			displaySections.endGameModal.showModal();
			winnerText.textContent = `${game.getCurrentPlayerName()} Won!`;
		} else if (game.getGameStatus() === "draw") {
			displaySections.endGameModal.showModal();
			winnerText.textContent = "It's a draw!";
		}
	}

	function cleanTheBoard() {
		const cells = document.querySelectorAll("button[data-cell]");
		cells.forEach((cell) => {
			cell.classList.remove("x", "circle");
		});
		gameBoardEl.classList.remove("circle");
		gameBoardEl.classList.add("x");
		playerTurnText.textContent = `${game.getCurrentPlayerName()}'s Turn`;
	}

	function playAgain() {
		game.resetGame();
		cleanTheBoard();
		displaySections.endGameModal.close();
	}

	function restartGame() {
		playerOneInput.disabled = false;
		playerOneInput.value = "";
		playerTwoInput.disabled = false;
		playerTwoInput.value = "";
		playerOneName = "";
		playerTwoName = "";
		selectPlayersText.textContent = "Select Players";

		playAgain();
		switchSections(
			displaySections.gameSection,
			displaySections.selectPlayersSection
		);
	}

	// --Helper Functions--
	function handleWelcomeBtn() {
		switchSections(
			displaySections.welcomeSection,
			displaySections.selectPlayersSection
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
		selectPlayersText.textContent = "Select Players";
		selectPlayersText.classList.remove("select-players-text");
		playerTwoInput.focus();
	}

	function handlePlayerTwoForm(e) {
		e.preventDefault();

		if (playerOneInput.value === "") {
			selectPlayersText.textContent = "Select Player One First";
			selectPlayersText.classList.add("select-players-text");
		} else if (playerTwoInput.value !== playerOneInput.value) {
			handleFormInput(playerTwoInput);
			playerTwoName = playerTwoInput.value;
			selectPlayersText.textContent = "You can play now";
			selectPlayersText.classList.remove("select-players-text");
			playGameBtn.focus();
		} else {
			selectPlayersText.textContent = "Please select another name";
			selectPlayersText.classList.add("select-players-text");
		}
	}

	function switchSections(elementOne, elementTwo) {
		elementOne.classList.toggle("hide");
		elementTwo.classList.toggle("hide");
	}

	function preventModalClosing(e) {
		if (e.key === "Escape" && displaySections.endGameModal.open) {
			e.preventDefault();
		}
	}

	// --Event Listeners--
	welcomeBtn.addEventListener("click", handleWelcomeBtn);
	playerOneForm.addEventListener("submit", handlePlayerOneForm);
	playerTwoForm.addEventListener("submit", handlePlayerTwoForm);
	playGameBtn.addEventListener("click", playGame);
	gameBoardEl.addEventListener("click", placeMarkerOnTheBoard);
	playAgainBtn.addEventListener("click", playAgain);
	restartGameBtn.addEventListener("click", restartGame);
	document.addEventListener("keydown", preventModalClosing);
})();
