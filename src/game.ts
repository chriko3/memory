
let settingstheme = sessionStorage.getItem("theme");
let settingsplayer = sessionStorage.getItem("player");
let settingssize = sessionStorage.getItem("size");

let flippedCards = 0;

let gameSettings: GameSettings = {
    theme: Number(settingstheme),
    player: String(settingsplayer),
    size: Number(settingssize)
};

function gameInit() {
    renderCards();
}
(window as any).gameInit = gameInit;

function renderCards() {
    const gameCanvas = document.getElementById("gameCanvas");

    for (let i = 0; i < gameSettings.size!; i++) {
        const cardValue = Math.floor(i / 2);
        gameCanvas!.innerHTML += returnCardTemplate(cardValue);
    }

    attachListeners();
}

function attachListeners() {
    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", () => {



            if (card.classList.contains("flipped")) return;
            if (flippedCards <= 1) {
                console.log(card.getAttribute("data-pair"));
            }
            else {

            }

            card.classList.add("flipped");
            flippedCards++;
        });
    });
}