import { playersList } from './personagens.js';

function start() {

    const headerTeamplate = `<div class="header">
        <header>
        <h1>Seja bem vindo, Aperte os cintos a corrida já vai começar!</h1>
        </header>
        </div>`

        document.querySelector(".header").insertAdjacentHTML('afterbegin', headerTeamplate);

    const players = playersList;

    playersList.forEach((player) => {
        let nomeImage = player.NOME.toLowerCase().replace(" ", "");
        let colors = player.COLOR.length > 2 ?
            `linear-gradient(to right, ${player.COLOR[0]}, ${player.COLOR[1]}, ${player.COLOR[2]})` :
            `linear-gradient(to right, ${player.COLOR[0]}, ${player.COLOR[1]})`;

        const template = ` 
            <div class="card-container" style="background: ${colors}">
                <img class="player-${nomeImage}" src="./img/${nomeImage}.gif" alt="">
                <div class="player-info">
                    <span class="player-name">Corredor: ${player.NOME}</span>
                    <span>Velocidade: ${player.VELOCIDADE}</span>
                    <span>Manobrabilidade: ${player.MANOBRABILIDADE}</span>
                    <span>Poder: ${player.PODER}</span>
                </div>
            </div>`;
        document.querySelector(".playersList").insertAdjacentHTML('afterbegin', template);
    });

    // Adiciona o botão e o modal na DOM
    const howToPlayButton = `
        <button class="btnOpenModal">COMO JOGAR</button>
        <div class="myModal" id="modal" style="display: none;">
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2> 🏁 REGRAS DA CORRIDA 🏁 </h2>
                <p> > Selecione 2 corredores para iniciar a corrida</p>
                <p> > A sorte está ao seu lado? </p>
                    <p> Sim, é um jogo de pura sorte. Um dado será lançado com 6 faces.</p>
                    <p> O valor do dado será somado ao atributo pessoal do corredor.</p>
                
                <h2> EXISTEM 3 MODOS DE JOGO </h2>
                <p>> VELOCIDADE</p>
                <p>> MANOBRABILIDADE</p>
                <p>> CONFRONTO</p>
                
                <h2> SISTEMA DE PONTUAÇÃO </h2>
                <p> > Cada rodada terá um vencedor com base na pontuação mais alta.</p>
                <p> O vencedor de cada rodada ganha 1 ponto.</p>
                <p> Se um corredor perder a rodada, e não tiver nenhum ponto, não será retirado pontos dele. </p>
                <p> Se um corredor tiver 1 ponto e perder uma rodada, ele perde aquele ponto.</p>
                <p> Após 5 rodadas, a soma dos pontos determina o vencedor geral.</p>
                

                </div>
        </div>`;
    document.querySelector(".rule").insertAdjacentHTML('afterbegin', howToPlayButton);

    // Adiciona o evento de clique para abrir o modal apenas ao botão específico
    document.querySelector('.btnOpenModal').addEventListener('click', function(event) {
        event.preventDefault(); // Impede o comportamento padrão do botão (submit, etc.)
        const modal = document.getElementById('modal');
        modal.style.display = 'block';
        header.classList.add('hidden');
    });

    // Adiciona o evento de clique para fechar o modal
    const spanFechar = document.querySelector('.close');
    spanFechar.addEventListener('click', function() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
        header.classList.remove('hidden');
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal');
        if (event.target == modal) {
            modal.style.display = 'none';
            header.classList.remove('hidden');
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    start();

    const selectedCards = [];
    const cards = document.querySelectorAll('.card-container');

    cards.forEach(card => {
        card.addEventListener('mouseover', function () {
            if (!selectedCards.includes(card)) {
                card.style.borderImage = 'linear-gradient(to right, #39ff14, #ff073a, #00ffff, #ff4500, #ffa500) 1';
                card.style.scale = '1.1';
                card.style.borderRadius = '10px';
            }
        });

        card.addEventListener('mouseout', function () {
            if (!selectedCards.includes(card)) {
                card.style.borderImage = '';
                card.style.scale = '';
                card.style.borderRadius = '';
            }
        });

        card.addEventListener('click', function () {
            const cardName = card.querySelector('.player-name').textContent.split(': ')[1];

            if (selectedCards.includes(card)) {
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
        });
    });
});
