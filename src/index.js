// const playersList = require('./personagens');
import { playersList } from './personagens.js';

function start() {
    const players = playersList
    
    playersList.forEach((player) => {

        let nomeImage = player.NOME.toLowerCase().replace(" ", "");

        const template = `<div class="card-container">

        
        <img class= "player-${nomeImage}" src="./img/${nomeImage}.gif" alt="">

            <div>
                <span class="player-name">Corredor: ${player.NOME}</span>
                <span>Velocidade: ${player.VELOCIDADE}</span>
                <span>Manobrabilidade: ${player.MANOBRABILIDADE}</span>
                <span>Poder: ${player.PODER}</span>
            </div> 
            <button>SELECIONAR</button>

        </div>`

        document.querySelector(".playersList").insertAdjacentHTML('afterbegin', template)
    })
    mappedCard()
}

// function synchronizeGIFs() {
//     const intervalTime = 9000; // Tempo em milissegundos para reiniciar os GIFs (ajuste conforme necessário)

//     function restartGIFs() {
//         const gifs = document.querySelectorAll(".card-container img");
//         gifs.forEach(gif => {
//             const src = gif.src;
//             gif.src = ""; // Limpa a fonte do GIF
//             gif.src = src; // Reatribui a fonte para reiniciar o GIF
//         });
//     }

//     setInterval(restartGIFs, intervalTime);
// }

// document.addEventListener("DOMContentLoaded", () => {
//     renderPlayers();
//     synchronizeGIFs();
// });

function mappedCard() {
    let result;
    document.querySelectorAll(".card-container").forEach((card) => {
        card.addEventListener('click', (userClick) => {
            // console.log(userClick.target.);
        })
        // selectedPlayers(result)
    })
}

// function selectedPlayers (player){
//     let players = [{}]
//     player.put("players", players
// }

start();
// synchronizeGIFs();
