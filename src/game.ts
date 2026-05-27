
let settingstheme = sessionStorage.getItem("theme");
let settingsplayer = sessionStorage.getItem("player");
let settingssize = sessionStorage.getItem("size");

let gameSettings: GameSettings = {
    theme: Number(settingstheme),
    player: String(settingsplayer),
    size: Number(settingssize)
};

function gameInit(){
    renderCards();
}
(window as any).gameInit = gameInit;


function renderCards(){
    let gameCanvas = document.getElementById('gameCanvas');
    for (let index = 0; index < gameSettings.size!; index++) {       
        gameCanvas!.innerHTML += returnCardTemplate();
    }
}

document.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("flipped");        
    });
});