// const playersList = require('./personagens');
import { playersList } from './personagens.js';

function start (){    

    const personagens = playersList
    playersList.forEach((player) => {
        
        let nomeImage = player.NOME.toLowerCase().replace(" ", "");
        
        const template = `<div class="player">
        <h2>${player.NOME}</h2>
        <img src="./img/${nomeImage}.gif" alt="">
        </div>`
        
        document.querySelector(".playersList").insertAdjacentHTML('afterbegin', template)
    })
    
}



// start();