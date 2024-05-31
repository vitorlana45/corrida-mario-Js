// const playersList = require('./personagens');
import { playersList } from './personagens.js';

function start() {
    const players = playersList
    
    playersList.forEach((player) => {

        let nomeImage = player.NOME.toLowerCase().replace(" ", "");

        let colors = player.COLOR.length > 2 ?
        `linear-gradient(to right, ${player.COLOR[0]}, ${player.COLOR[1]}, ${player.COLOR[2]})`:
        `linear-gradient(to right, ${player.COLOR[0]}, ${player.COLOR[1]})`

        const template = `<div class="card-container" style="background: ${colors}">

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
