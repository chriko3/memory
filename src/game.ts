import { codeVibeTheme } from "./cards";
import { foodTheme } from "./cards";
let settingstheme = sessionStorage.getItem("theme");
let settingsplayer = sessionStorage.getItem("player");
let settingssize = sessionStorage.getItem("size");

let body = document.getElementById("body");
let exitIcon = document.getElementById("exitIcon") as HTMLImageElement;
let winImg = document.getElementById("winImg") as HTMLImageElement;
let playerWinnerText = document.getElementById("playerWinnerText");
let infoText = document.getElementById("infoText");

const player1Imgs = document.querySelectorAll<HTMLImageElement>(".player1Img");
const player2Imgs = document.querySelectorAll<HTMLImageElement>(".player2Img");

const player1Points = document.querySelectorAll<HTMLElement>(".player1Points");
const player2Points = document.querySelectorAll<HTMLElement>(".player2Points");

let currentPlayerImg = document.getElementById("currentPlayer") as HTMLImageElement;
let currentPlayerThemeVibeCode: string[] = [
    '../public/assets/img/blue.svg',
    '../public/assets/img/orange.svg',
    '../public/assets/img/draw_cv.svg'
]

let currentPlayerThemeFood: string[] = [
    '../public/assets/img/chess_pawn_blue.svg',
    '../public/assets/img/chess_pawn_orange.svg',
    '../public/assets/img/draw_food.svg'
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

declare var confetti: any;

/**
 * initializes the game
 * sets theme board and ui updates
 */
function gameInit() {
    if (checkCurrentTheme() == 1) {
        setThemeCodeVibe();
    }
    else {
        setThemeFood();
    }
    setBoard();
    updateCurrentPlayerUI();
    updatePointsUI();
    loadCardTheme();
}
(window as any).gameInit = gameInit;

/**
 * checks current game theme
 * returns 1 or 2 based on selected theme
 */
function checkCurrentTheme() {
    if (gameSettings.theme == 1) {
        return 1;
    }
    else {
        return 2;
    }
}

/**
 * sets code vibe theme
 * updates body class and player images
 */
function setThemeCodeVibe() {
    body!.classList.add("theme-codevibe");
    player1Imgs.forEach(img => {
        img.src = currentPlayerThemeVibeCode[0];
    });
    player2Imgs.forEach(img => {
        img.src = currentPlayerThemeVibeCode[1];
    });
}

/**
 * sets food theme
 * updates body class icons and player images
 */
function setThemeFood() {
    body!.classList.add("theme-food");
    exitIcon!.src = "../public/assets/img/exit_orange.svg";
    player1Imgs.forEach(img => {
        img.src = currentPlayerThemeFood[0];
    });
    player2Imgs.forEach(img => {
        img.src = currentPlayerThemeFood[1];
    });
}

/**
 * sets game board size
 * calls grid setup based on selected size
 */
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

/**
 * renders game cards
 * creates pairs shuffles and adds them to canvas
 */
function renderCards(theme: string[]) {
    const gameCanvas = document.getElementById("gameCanvas");
    if (!gameCanvas) return;
    const cards: number[] = [];
    for (let i = 0; i < gameSettings.size! / 2; i++) {
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

/**
 * loads card theme and renders cards
 * chooses theme based on current game settings
 */
function loadCardTheme() {
    if (checkCurrentTheme() == 1) {
        renderCards(codeVibeTheme);
    }
    else {
        renderCards(foodTheme);
    }
}

/**
 * adds click listeners to all cards
 * handles flip match logic scoring and player switch
 */
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
                    } else {
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

/**
 * updates points ui for both players
 * sets text and colors for score display
 */
function updatePointsUI() {
    player1Points.forEach(point => {
        point.innerText = String(playerPoints[0]);
        point.style.color = "rgba(43, 177, 255, 1)";
    });
    player2Points.forEach(point => {
        point.innerText = String(playerPoints[1]);
        point.style.color = "rgba(245, 142, 57, 1)";
    });
}

/**
 * updates current player ui image
 * selects image based on theme and player color
 */
function updateCurrentPlayerUI() {
    if (checkCurrentTheme() == 1) {
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

/**
 * checks win condition
 * shows end screen based on player points
 */
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

/**
 * starts confetti animation
 * brings canvas to front
 */
function startConfetti() {
    confetti({
        particleCount: 1000,
        spread: 500,
        origin: { y: 0.6 }
    });
    const confettiCanvas = document.querySelector('canvas');
    if (confettiCanvas) {
        (confettiCanvas as HTMLElement).style.zIndex = '9999';
    }
}

/**
 * shows end screen animation
 * switches to win screen after delay
 * triggers win result based on state
 */
function showEndScreen(winState: number) {
    setTimeout(() => {
        let gameOver = document.getElementById("gameOver") as HTMLElement;
        let winScreen = document.getElementById("winScreen") as HTMLElement;

        gameOver.style.display = "flex";
        setTimeout(() => {
            gameOver.style.display = "none";
            winScreen.style.display = "flex";
            startConfetti();
            if (winState === 0) {
                bluePlayerWin();
            }
            else if (winState === 1) {
                orangePlayerWin();
            }
            else {
                drawWin();
            }
        }, 2500);
    }, 800);
}

/**
 * sets win screen for blue player
 * updates text color and win image
 */
function bluePlayerWin() {
    playerWinnerText!.innerHTML = "BLUE <br> PLAYER";
    playerWinnerText!.style.color = "rgba(43, 177, 255, 1)";
    winImg!.src = currentPlayerThemeFood[0];
}

/**
 * sets win screen for orange player
 * updates text color and win image
 */
function orangePlayerWin() {
    playerWinnerText!.innerHTML = "ORANGE <br> PLAYER";
    playerWinnerText!.style.color = "rgba(245, 142, 57, 1)";
    winImg!.src = currentPlayerThemeFood[1];
}

/**
 * sets win screen for draw state
 * updates text image and color based on theme
 */
function drawWin() {
    infoText!.innerText = "It's a";
    playerWinnerText!.innerText = "DRAW";
    if (checkCurrentTheme() == 1) {
        winImg!.src = currentPlayerThemeVibeCode[2];
        playerWinnerText!.style.color = "rgba(77, 213, 188, 1)";
    }
    else {
        winImg!.src = currentPlayerThemeFood[2];
        playerWinnerText!.style.color = "rgba(243, 131, 45, 1)";
    }
}

/**
 * sets grid layout for game board
 * adjusts number of columns based on card count
 */
function setGrid(cards: number) {
    const game = document.querySelector(".game") as HTMLElement;
    let columns = 4;
    if (cards === 24) columns = 6;
    if (cards === 36) columns = 9;
    game.style.gridTemplateColumns = `repeat(${columns}, 120px)`;
}