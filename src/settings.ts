/**
 * game settings for the memory game
 * theme player and board size configuration
 */
interface GameSettings {
    theme: number | undefined;
    player: string | undefined;
    size: number | undefined;
}

/**
 * settings object for game configuration
 * stores theme player and size values
 */
let settings: GameSettings = {
    theme: undefined,
    player: undefined,
    size: undefined
};

/**
 * adds click listeners to theme elements
 * sets active theme and updates settings
 */
document.querySelectorAll("[data-theme]").forEach(el => {
    el.addEventListener("click", () => {
        document.querySelectorAll("[data-theme]").forEach(x => x.classList.remove("active"));
        const target = el as HTMLElement;
        target.classList.add("active");
        settings.theme = Number(target.dataset.theme) as 1 | 2;
        updateUIGameTheme();
    });
});

/**
 * adds click listeners to player selection
 * sets selected player and updates ui
 */
document.querySelectorAll("[data-player]").forEach(el => {
    el.addEventListener("click", () => {
        const target = el as HTMLElement;
        settings.player = String(target.dataset.player) as "blue" | "orange";
        document.querySelectorAll("[data-player]").forEach(x => x.classList.remove("active"));
        target.classList.add("active");
        updateUIPlayer();
    });
});

/**
 * adds click listeners to board size options
 * sets selected size and updates ui
 */
document.querySelectorAll("[data-size]").forEach(el => {
    el.addEventListener("click", () => {
        const target = el as HTMLElement;
        settings.size = Number(target.dataset.size) as 16 | 24 | 36;
        document.querySelectorAll("[data-size]").forEach(x => x.classList.remove("active"));
        target.classList.add("active");
        updateUIBoardSize();
    });
});

/**
 * updates ui for selected game theme
 * changes text and preview image based on settings.theme
 */
function updateUIGameTheme() {
    let gameThemeText = document.getElementById!('gameThemeText');
    let themePreview = document.getElementById!('themePreview') as HTMLImageElement;
    if (settings.theme == undefined) {
        gameThemeText!.innerText = "Game theme";
        themePreview!.src = "../public/assets/img/empty.png";
    } else if (settings.theme == 1) {
        gameThemeText!.innerText = "Code Vibes theme";
        themePreview!.src = "../public/assets/img/CodeVibe.svg";
    } else if (settings.theme == 2) {
        gameThemeText!.innerText = "Food theme";
        themePreview!.src = "../public/assets/img/Food.svg";
    }
}

/**
 * updates ui for selected player
 * changes text based on settings.player
 */
function updateUIPlayer() {
    let gamePlayerText = document.getElementById!('gamePlayerText');
    if (settings.player == undefined) {
        gamePlayerText!.innerText = "Player";
    } else if (settings.player == "blue") {
        gamePlayerText!.innerText = "Blue Player";
    } else if (settings.player == "orange") {
        gamePlayerText!.innerText = "Orange Player";
    }
}

/**
 * updates ui for board size selection
 * changes text based on settings.size
 */
function updateUIBoardSize() {
    let gameBoardSizeText = document.getElementById!('gameBoardSizeText');
    if (settings.size == undefined) {
        gameBoardSizeText!.innerText = "Board size";
    } else if (settings.size == 16) {
        gameBoardSizeText!.innerText = "16 Cards";
    } else if (settings.size == 24) {
        gameBoardSizeText!.innerText = "24 Cards";
    } else if (settings.size == 36) {
        gameBoardSizeText!.innerText = "36 Cards";
    }
}

/**
 * starts the game if all settings are selected
 * saves settings to session storage and opens game page
 */
function startGame() {
    if (
        settings.theme !== undefined &&
        settings.player !== undefined &&
        settings.size !== undefined
    ) {
        sessionStorage.setItem("theme", String(settings.theme));
        sessionStorage.setItem("player", String(settings.player));
        sessionStorage.setItem("size", String(settings.size));
        window.location.href = "../game.html";
    }
}
(window as any).startGame = startGame;