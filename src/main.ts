import './styles/main.scss'
document.addEventListener("contextmenu", e => e.preventDefault());

function exitGame(){
    window.location.href = "index.html";
}
(window as any).exitGame = exitGame;