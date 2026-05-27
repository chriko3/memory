interface GameSettings {
    theme: number | undefined;
    player: boolean | undefined;
    size: number | undefined;
}

let settings: GameSettings = {
    theme: undefined,
    player: undefined,
    size: undefined
};

document.querySelectorAll("[data-theme]").forEach(el => {
    el.addEventListener("click", () => {
        document.querySelectorAll("[data-theme]").forEach(x => x.classList.remove("active"));
        const target = el as HTMLElement;
        target.classList.add("active");
        settings.theme = Number(target.dataset.theme) as 1 | 2;
        updateUIGameTheme();
    });
});

document.querySelectorAll("[data-player]").forEach(el => {
    el.addEventListener("click", () => {
        const target = el as HTMLElement;
        settings.player = target.dataset.player === "blue";
        document.querySelectorAll("[data-player]").forEach(x => x.classList.remove("active"));
        target.classList.add("active");
        updateUIPlayer();
    });
});

document.querySelectorAll("[data-size]").forEach(el => {
    el.addEventListener("click", () => {
        const target = el as HTMLElement;
        settings.size = Number(target.dataset.size) as 16 | 24 | 36;
        document.querySelectorAll("[data-size]").forEach(x => x.classList.remove("active"));
        target.classList.add("active");
        updateUIBoardSize();
    });
});

function updateUIGameTheme() {
    let gameThemeText = document.getElementById!('gameThemeText');

    if (settings.theme == undefined) {
        gameThemeText!.innerText = "Game theme";
    }
    else if (settings.theme == 1) {
        gameThemeText!.innerText = "Code Vibes theme";
    } else if (settings.theme == 2) {
        gameThemeText!.innerText = "Gaming theme";
    }
}

function updateUIPlayer() {
    let gamePlayerText = document.getElementById!('gamePlayerText');

    if (settings.player == undefined) {
        gamePlayerText!.innerText = "Player";
    }
    else if (settings.player == true) {
        gamePlayerText!.innerText = "Blue Player";
    } else if (settings.player == false) {
        gamePlayerText!.innerText = "Orange Player";
    }
}

function updateUIBoardSize() {
    let gameBoardSizeText = document.getElementById!('gameBoardSizeText');

    if (settings.size == undefined) {
        gameBoardSizeText!.innerText = "Board size";
    }
    else if (settings.size == 16) {
        gameBoardSizeText!.innerText = "16 Cards";
    } else if (settings.size == 24) {
        gameBoardSizeText!.innerText = "24 Cards";
    } else if (settings.size == 36) {
        gameBoardSizeText!.innerText = "36 Cards";
    }
}

function startGame() {
    if (
        settings.theme !== undefined &&
        settings.player !== undefined &&
        settings.size !== undefined
    ) {
        sessionStorage.setItem("theme", String(settings.theme));
        sessionStorage.setItem("player", String(settings.player));
        sessionStorage.setItem("size", String(settings.size));
        window.location.href = "game.html";
    }
}
(window as any).startGame = startGame;