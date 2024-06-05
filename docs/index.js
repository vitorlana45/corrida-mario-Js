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
    document.querySelector('.btnOpenModal').addEventListener('click', function (event) {
        event.preventDefault(); // Impede o comportamento padrão do botão (submit, etc.)
        const modal = document.getElementById('modal');
        modal.style.display = 'block';
        header.classList.add('hidden');
    });

    // Adiciona o evento de clique para fechar o modal
    const spanFechar = document.querySelector('.close');
    spanFechar.addEventListener('click', function () {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
        header.classList.remove('hidden');
    });

    // Fecha o modal ao clicar fora dele
    window.addEventListener('click', function (event) {
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
    let racerTwo;
    let racerOne;

    const cards = document.querySelectorAll('.card-container');

    cards.forEach(card => {
        card.addEventListener('mouseover', function () {

            if (!selectedCards.includes(card)) {
                card.style.borderImage = 'linear-gradient(to right, #39ff14, #ff073a, #00ffff, #ff4500, #ffa500) 1';
                card.style.scale = '1.1';
                card.style.borderRadius = '10px';
                card.classList.add('selected');
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

                let racerOne = selectedCards[0].querySelector('.player-name').textContent.split(': ')[1]
                console.log("racerOne aqui e: ", racerOne)
                let racerTwo = selectedCards[1].querySelector('.player-name').textContent.split(': ')[1]
                console.log("racerTwo aqui e: ", racerTwo)

                let findedRacerOne = playersList.find(player => player.NOME === racerOne);
                let findedRacerTwo = playersList.find(player => player.NOME === racerTwo);
                
                playRaceEngine(findedRacerOne, findedRacerTwo)
            }
        });
    });
});
async function playRaceEngine(racerOne, racerTwo) {

    let racerOneObject = racerOne;
    let racerTwoObject = racerTwo;

    let historyRoundsbattle = "";
    

    if (racerOneObject && racerTwoObject) {
        let racerRoundWon;

        let continueNextRound = true;
        for (let round = 1; round <= 5; round++) {
            let battleRound = `🏁 Rodada ${round}`;

            let block = await getRandomBlock();

            let diceResult1 = await rollDice();
            let diceResult2 = await rollDice();


            let totalTestSkill1 = isNaN;
            let totalTestSkill2 = isNaN;
            let logResult1 = "";
            let logResult2 = "";
            let winnerRound = "";
            let tiedRound ;


            if (block.match( "RETA")) {
                totalTestSkill1 = diceResult1 + racerOneObject.VELOCIDADE;
                totalTestSkill2 = diceResult2 + racerTwoObject.VELOCIDADE;

                logResult1 =  `${racerOneObject.NOME} 🎲 rolou o dado de Velocidade  ${diceResult1}, ${racerOneObject.VELOCIDADE} = ${racerOneObject.VELOCIDADE + diceResult1}`;
                logResult2 =  `${racerTwoObject.NOME} 🎲 rolou o dado de Velocidade: ${diceResult2}, ${racerTwoObject.VELOCIDADE} = ${racerTwoObject.VELOCIDADE + diceResult2}`;
            }
            if (block.match("CURVA")) {

                totalTestSkill1 = diceResult1 + racerOneObject.MANOBRABILIDADE;
                totalTestSkill2 = diceResult2 + racerTwoObject.MANOBRABILIDADE;

                logResult1 =  `${racerOneObject.NOME} 🎲 rolou o dado de Manobrabilidade: ${diceResult1}, ${racerOneObject.MANOBRABILIDADE} = ${racerOneObject.MANOBRABILIDADE + diceResult1}`;
                logResult2 =  `${racerTwoObject.NOME} 🎲 rolou o dado de Manobrabilidade: ${diceResult2}, ${racerTwoObject.MANOBRABILIDADE} = ${racerTwoObject.MANOBRABILIDADE + diceResult2}`;

            }

            if (totalTestSkill1 > totalTestSkill2) {
                winnerRound = `${racerOneObject.NOME} marcou um ponto!`
                racerOneObject.PONTOS++;
            }
            else if (totalTestSkill2 > totalTestSkill1) {
                winnerRound = `${racerTwoObject.NOME} marcou um ponto!`
                racerTwoObject.PONTOS++;
            }if ( totalTestSkill1 === totalTestSkill2){
                winnerRound = `empate na rodada!`;
            }
            if (block.match("CONFRONTO")) {

                let powerResult1 = diceResult1 + racerOneObject.PODER;
                let powerResult2 = diceResult2 + racerTwoObject.PODER;

                
                logResult1 =  `${racerOneObject.NOME} 🎲 rolou o dado de Poder: ${diceResult1}, ${racerOneObject.PODER} = ${racerOneObject.PODER + diceResult1}`;
                logResult2 =  `${racerTwoObject.NOME} 🎲 rolou o dado de Poder: ${diceResult2}, ${racerTwoObject.PODER} = ${racerTwoObject.PODER + diceResult2}`;


                if (powerResult1 > powerResult2 && racerTwoObject.PONTOS > 0) {
                    racerTwoObject.PONTOS--;
                    console.log("racer 2 com pontos");
                    winnerRound = `${racerOneObject.NOME} vencceu o confronto ${racerTwoObject.NOME} perdeu um ponto!`

                } 
                else if (powerResult2 > powerResult1 && racerOneObject.PONTOS > 0) {
                    racerOneObject.PONTOS--;
                    winnerRound = `${racerTwoObject.NOME} vencceu o confronto ${racerOneObject.NOME} perdeu um ponto!`
                    console.log("racer 1 com pontos");
                }else if(powerResult1 === powerResult2){
                    winnerRound = `Confronto empatado!`;
                }

            }

        let racerOneImage = "./img/" + racerOneObject.NOME.toLowerCase() + ".gif";
        let racerTwoImage ="./img/" + racerTwoObject.NOME.toLowerCase() + ".gif";


        const modalStartRace = `
        <div class="playContainer" id="playModal">
            <div class="play-modal-content">
                <span class="close">&times;</span>
                <h2>Corrida entre ${racerOne.NOME} e ${racerTwo.NOME}</h2>
                    <div class ="modal-image">
                        <img src="${racerOneImage}" alt="">
                        <h1 class="vs">VS</h1>
                        <img src="${racerTwoImage}" alt="">
                    </div>
                <div class="modal-content-results">
                    <h2>${battleRound}</h2>
                    <p>${logResult1}</p>
                    <p>${logResult2}</p>
                    <p>${winnerRound}</p>
                </div>
                <button class="nextRound" id="nextRound"> Próxima Rodada</button>
            </div>
        </div>`;

    document.querySelector(".rule").insertAdjacentHTML('afterbegin', modalStartRace);

    const modal = document.getElementById('playModal');
    const spanClose = document.querySelector('.close');
    const nextRound = document.getElementById('nextRound');


    spanClose.addEventListener('click', function (event) {
        if (event.target == spanClose) {
            const modals = document.querySelectorAll('.playContainer');
            modals.forEach(modal => {
                modal.style.display = 'none';
                modal.remove(); 
            });
        }
    });
    
    window.addEventListener('click', function (event) {
        // Verifica se o clique foi fora do modal
        if (event.target == nextRound) {
                modal.style.display = 'none';
                modal.remove(); 
        }
    });
}
    } else {
        console.error('Não foi possível obter os nomes dos corredores.');
    }
}


async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
            break;
    }
    return result;
}

async function rollDice() {
    // Simulação de rolagem de dado
    return Math.floor(Math.random() * 6) + 1;
}

