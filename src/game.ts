
let settingstheme = sessionStorage.getItem("theme");
let settingsplayer = sessionStorage.getItem("player");
let settingssize = sessionStorage.getItem("size");

const game = document.querySelector(".game") as HTMLElement;
game.style.gridTemplateColumns = "repeat(4, 120px)";

let flippedCardsAround = 0;
let flippedCards: HTMLElement[] = [];

let playerPoints: number[] = [0, 0];

let gameSettings: GameSettings = {
    theme: Number(settingstheme),
    player: settingsplayer === "true",
    size: Number(settingssize)
};

function gameInit() {
    setBoard();
    renderCards();
}
(window as any).gameInit = gameInit;

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


function renderCards() {
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
        gameCanvas.innerHTML += returnCardTemplate(cardValue);
    });
    attachListeners();
}

function attachListeners() {
    document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("click", () => {
            updateCurrentPlayerUI();
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
                    if (gameSettings.player) {
                        playerPoints[0] += 1;
                    }
                    else {
                        playerPoints[1] += 1;
                    }
                    updatePointsUI();
                    card1.classList.add("matched");
                    card2.classList.add("matched");
                    flippedCards = [];
                } else {
                    setTimeout(() => {
                        card1.classList.remove("flipped");
                        card2.classList.remove("flipped");
                        gameSettings.player = !gameSettings.player;
                        flippedCards = [];

                    }, 800);
                }
            }
            checkWin();
        });
    });
}

function updatePointsUI() {
    let pointsPlayer1 = document.getElementById('pointsPlayer1');
    let pointsPlayer2 = document.getElementById('pointsPlayer2');
    pointsPlayer1!.innerText = String(playerPoints[0]);
    pointsPlayer2!.innerText = String(playerPoints[1]);
}

function updateCurrentPlayerUI() {

}

function checkWin() {
    const allCards = document.querySelectorAll(".card");
    const allMatched = Array.from(allCards).every(card =>
        card.classList.contains("matched")
    );
    if (allMatched) {
        if (playerPoints[0] > playerPoints[1]) {
            console.log('p1 won');
        }
        else if (playerPoints[0] === playerPoints[1]) {
            console.log("draw");
        }
        else {
            console.log('p2 won');
        }
    }
}

function setGrid(cards: number) {
    const game = document.querySelector(".game") as HTMLElement;

    let columns = 4;

    if (cards === 24) columns = 6;
    if (cards === 36) columns = 9;

    game.style.gridTemplateColumns = `repeat(${columns}, 120px)`;
}