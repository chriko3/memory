import './styles/main.scss'
document.addEventListener("contextmenu", e => e.preventDefault());

/**
 * exits the game and returns to start page
 */
function exitGame() {
    window.location.href = "index.html";
}
(window as any).exitGame = exitGame;

/**
 * toggles exit popup visibility
 * switches between hidden and visible state
 */
function togglePopUp() {
    let exitPopUp = document.getElementById("exitPopUp");
    if (exitPopUp!.style.display === "none") {
        exitPopUp!.style.display = "flex";
    } else {
        exitPopUp!.style.display = "none";
    }
}
(window as any).togglePopUp = togglePopUp;