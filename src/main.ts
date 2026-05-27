import './styles/main.scss'
document.addEventListener("contextmenu", e => e.preventDefault());

function exitGame() {
    window.location.href = "index.html";
}
(window as any).exitGame = exitGame;

function togglePopUp() {
    let exitPopUp = document.getElementById("exitPopUp");
    if (exitPopUp!.style.display === "none") {
        exitPopUp!.style.display = "flex";
    } else {
        exitPopUp!.style.display = "none";
    }
}
(window as any).togglePopUp = togglePopUp;