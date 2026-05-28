import { codeVibeTheme } from "./cards";
import { foodTheme } from "./cards";
let settingstheme = sessionStorage.getItem("theme");
let settingsplayer = sessionStorage.getItem("player");
let settingssize = sessionStorage.getItem("size");

let body = document.getElementById("body");
let exitIcon = document.getElementById("exitIcon") as HTMLImageElement;
let gamePointsPlayer1 = document.getElementById("gamePointsPlayer1") as HTMLImageElement;
let gamePointsPlayer2 = document.getElementById("gamePointsPlayer2") as HTMLImageElement;

let pointsPlayer1 = document.getElementById('pointsPlayer1') as HTMLElement;
let pointsPlayer2 = document.getElementById('pointsPlayer2') as HTMLElement;

let pointsPlayer1GameOver = document.getElementById('pointsPlayer1GameOver');
let pointsPlayer2GameOver = document.getElementById('pointsPlayer2GameOver');

let currentPlayerImg = document.getElementById("currentPlayer") as HTMLImageElement;
let currentPlayerThemeVibeCode: string[] = [
    '../public/assets/img/blue.svg',
    '../public/assets/img/orange.svg'
]

let currentPlayerThemeFood: string[] = [
    '../public/assets/img/chess_pawn_blue.svg',
    '../public/assets/img/chess_pawn_orange.svg'
]
let game = document.querySelector(".game") as HTMLElement;
game.style.gridTemplateColumns = "repeat(4, 120px)";

let flippedCards: HTMLElement[] = [];

let playerPoints: number[] = [0, 0];

let gameSettings: GameSettings = {
    theme: Number(settingstheme),
    player: String(settingsplayer),
    size: Number(settingssize)
};

function gameInit() {
    if (gameSettings.theme == 1) {
        setThemeCodeVibe();
    }
    else {
        setThemeFood();
    }

    setBoard();
    updateCurrentPlayerUI();
    loadCardTheme();
}
(window as any).gameInit = gameInit;

function setThemeCodeVibe() {
    body!.classList.add("theme-codevibe");
    gamePointsPlayer1!.src = currentPlayerThemeVibeCode[0];
    gamePointsPlayer2!.src = currentPlayerThemeVibeCode[1];
    pointsPlayer1.style.color = "rgba(43, 177, 255, 1)";
    pointsPlayer2.style.color = "rgba(245, 142, 57, 1)";

}

function setThemeFood() {
    body!.classList.add("theme-food");
    gamePointsPlayer1!.src = currentPlayerThemeFood[0];
    gamePointsPlayer2!.src = currentPlayerThemeFood[1];
    exitIcon!.src = "../public/assets/img/exit_orange.svg";
    pointsPlayer1.style.color = "rgba(43, 177, 255, 1)";
    pointsPlayer2.style.color = "rgba(245, 142, 57, 1)";
}

function setBoard() {
    if (gameSettings.size == 16) {
        setGrid(16);
    }
    else if (gameSettings.size == 24) {
        setGrid(24);
    }
    else if (gameSettings.size == 36) {
        setGrid(36);
    }
}

function renderCards(theme: string[]) {
    const gameCanvas = document.getElementById("gameCanvas");
    if (!gameCanvas) return;
    const cards: number[] = [];
    for (let i = 0; i < gameSettings.size! / 2; i++) {
    // for (let i = 0; i < 4! / 2; i++) {

        cards.push(i);
        cards.push(i);
    }
    for (let i = cards.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
    }
    cards.forEach(cardValue => {
        gameCanvas.innerHTML += returnCardTemplate(cardValue, theme[cardValue + 1], theme);
    });
    attachListeners();
}

function loadCardTheme() {
    if (gameSettings.theme == 1) {
        renderCards(codeVibeTheme);
    }
    else if (gameSettings.theme == 2) {
        renderCards(foodTheme);

    }
}

function attachListeners() {
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => {

            if (card.classList.contains("flipped")) return;
            if (card.classList.contains("matched")) return;

            if (flippedCards.length === 2) return;

            card.classList.add("flipped");

            flippedCards.push(card as HTMLElement);

            if (flippedCards.length === 2) {

                const [card1, card2] = flippedCards;

                const pair1 = card1.getAttribute("data-pair");
                const pair2 = card2.getAttribute("data-pair");

                if (pair1 === pair2) {
                    if (gameSettings.player == "blue") {
                        playerPoints[0] += 1;
                    }
                    else {
                        playerPoints[1] += 1;
                    }
                    updatePointsUI();
                    card1.classList.add("matched");
                    card2.classList.add("matched");
                    checkWin();
                    flippedCards = [];
                    updateCurrentPlayerUI();
                } else {
                    setTimeout(() => {
                        card1.classList.remove("flipped");
                        card2.classList.remove("flipped");
                        if (gameSettings.player === "blue") {
                            gameSettings.player = "orange";
                        } else {
                            gameSettings.player = "blue";
                        }
                        flippedCards = [];
                        updateCurrentPlayerUI();
                    }, 800);
                }
            }
        });
    });
}

function updatePointsUI() {
    pointsPlayer1!.innerText = String(playerPoints[0]);
    pointsPlayer2!.innerText = String(playerPoints[1]);

    pointsPlayer1GameOver!.innerText = String(playerPoints[0]);
    pointsPlayer2GameOver!.innerText = String(playerPoints[1]);
}

function updateCurrentPlayerUI() {
    if (gameSettings.theme == 1) {
        if (gameSettings.player == "blue") {
            currentPlayerImg!.src = currentPlayerThemeVibeCode[0];
        } else {
            currentPlayerImg!.src = currentPlayerThemeVibeCode[1];
        }
    }
    else if (gameSettings.theme == 2) {
        if (gameSettings.player == "blue") {
            currentPlayerImg!.src = currentPlayerThemeFood[0];
        } else {
            currentPlayerImg!.src = currentPlayerThemeFood[1];
        }
    }
}

function checkWin() {
    const allCards = document.querySelectorAll(".card");
    const allMatched = Array.from(allCards).every(card =>
        card.classList.contains("matched")
    );
    if (allMatched) {
        if (playerPoints[0] > playerPoints[1]) {
            showEndScreen(0);
        }
        else if (playerPoints[0] === playerPoints[1]) {
            showEndScreen(2);
        }
        else {
            showEndScreen(1);
        }
    }
}

function showEndScreen(winState: number) {
    setTimeout(() => {
        let gameOver = document.getElementById("gameOver") as HTMLElement;
        let winScreen = document.getElementById("winScreen") as HTMLElement;
        let infoText = document.getElementById("infoText");
        let playerWinnerText = document.getElementById("playerWinnerText");

        gameOver.style.display = "flex";
        setTimeout(() => {
            gameOver.style.display = "none";
            winScreen.style.display = "flex";
            if (winState === 0) {
                console.log("Player 1 won");
                playerWinnerText!.innerText = "Player 1";
            }
            else if (winState === 1) {
                console.log("Player 2 won");
                playerWinnerText!.innerText = "Player 2";
            }
            else {
                console.log("Draw");
                infoText!.innerText = "It's a";
                playerWinnerText!.innerText = "DRAW";
            }
        }, 2500);
    }, 800);
}

function setGrid(cards: number) {
    const game = document.querySelector(".game") as HTMLElement;

    let columns = 4;

    if (cards === 24) columns = 6;
    if (cards === 36) columns = 9;

    game.style.gridTemplateColumns = `repeat(${columns}, 120px)`;
}