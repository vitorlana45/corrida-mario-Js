import { playersList } from './personagens.js';

function start() {
    const players = playersList;

    playersList.forEach((player) => {
        let nomeImage = player.NOME.toLowerCase().replace(" ", "");
        let colors = player.COLOR.length > 2 ?
            `linear-gradient(to right, ${player.COLOR[0]}, ${player.COLOR[1]}, ${player.COLOR[2]})` :
            `linear-gradient(to right, ${player.COLOR[0]}, ${player.COLOR[1]})`;

        const template = `<div class="card-container" style="background: ${colors}">
            <img class="player-${nomeImage}" src="./img/${nomeImage}.gif" alt="">
            <div>
                <span class="player-name">Corredor: ${player.NOME}</span>
                <span>Velocidade: ${player.VELOCIDADE}</span>
                <span>Manobrabilidade: ${player.MANOBRABILIDADE}</span>
                <span>Poder: ${player.PODER}</span>
            </div>
        </div>`;
        document.querySelector(".playersList").insertAdjacentHTML('afterbegin', template);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    start();

    const selectedCards = [];
    const cards = document.querySelectorAll('.card-container');

    cards.forEach(card => {
        card.addEventListener('mouseover', function() {
            if (!selectedCards.includes(card)) {
                card.style.borderImage = 'linear-gradient(to right, #39ff14, #ff073a, #00ffff, #ff4500, #ffa500) 1';
                card.style.scale = '1.1';
                card.style.borderRadius = '10px';
            }
        });

        card.addEventListener('mouseout', function() {
            if (!selectedCards.includes(card)) {
                card.style.borderImage = '';
                card.style.scale = '';
                card.style.borderRadius = '';
            }
        });

        card.addEventListener('click', function() {
            const cardName = card.querySelector('.player-name').textContent.split(': ')[1];

            if (selectedCards.includes(card)) {
                // Se o cartão já estiver selecionado, desmarque-o
                selectedCards.splice(selectedCards.indexOf(card), 1);
                card.style.borderImage = '';
                card.style.scale = '1';
                card.style.borderRadius = '';
            } else {
                if (selectedCards.length === 2) {
                    alert('Selecione apenas 2 corredores');
                    return;
                }

                if (selectedCards.some(selectedCard => selectedCard.querySelector('.player-name').textContent.split(': ')[1] === cardName)) {
                    console.log('não pode haver cards repetidos', card);
                    return;
                }

                // Se o cartão não estiver selecionado, selecione-o
                selectedCards.push(card);
                card.style.borderImage = 'linear-gradient(to right, #39ff14, #ff073a, #00ffff, #ff4500, #ffa500) 1';
                card.style.scale = '1.2';
                card.style.borderRadius = '10px';
            }
            if (selectedCards.length === 2) {
            console.log('cartões selecionados:', selectedCards.map(card => card.querySelector('.player-name').textContent.split(': ')[1]));
            }
        });
    });
});
