import { playersList } from './personagens.js';

const inBattle = false;

(function start() {

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
}())

document.addEventListener('DOMContentLoaded', function () {

    const selectedCards = [];

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

let countButton =1;
async function playRaceEngine(racerOne, racerTwo) {

    let racerOneObject = racerOne;
    let racerTwoObject = racerTwo;

    if (racerOneObject && racerTwoObject) {

        for (let round = 1; round <= 5; round++) {

            if (round === 1) {
                racerOneObject.PONTOS = 0;
                racerTwoObject.PONTOS = 0;
            }

            let battleRound = `🏁 Rodada ${round}`;

            let block = await getRandomBlock();

            let diceResult1 = await rollDice();
            let diceResult2 = await rollDice();


            let totalTestSkill1 = "";
            let totalTestSkill2 = "";
            let logResult1 = "";
            let logResult2 = "";
            let winnerRound = "";

            let colorVelocity = "gold"
            let colormaneuverability = "cyan"
            let colorPower = "red"
            let colorDice = "#B026FF"
            let colorSumPoints = "#39FF14"


            if (block.match("RETA")) {

                totalTestSkill1 = diceResult1 + racerOneObject.VELOCIDADE;
                totalTestSkill2 = diceResult2 + racerTwoObject.VELOCIDADE;

                logResult1 = `: rolou o dado de Velocidade:<span style="color: ${colorDice}"> 🎲 ${diceResult1}</span>, Racer <span style="color: ${colorVelocity}">${racerOneObject.VELOCIDADE}</span>  = <span style="color: ${colorSumPoints}">${racerOneObject.VELOCIDADE + diceResult1}</span>`;
                logResult2 = `: rolou o dado de Velocidade:<span style="color: ${colorDice}"> 🎲 ${diceResult2}</span>, Racer <span style="color: ${colorVelocity}">${racerTwoObject.VELOCIDADE}</span>  = <span style="color: ${colorSumPoints}">${racerTwoObject.VELOCIDADE + diceResult2}</span>`;

            }
            if (block.match("CURVA")) {

                totalTestSkill1 = diceResult1 + racerOneObject.MANOBRABILIDADE;
                totalTestSkill2 = diceResult2 + racerTwoObject.MANOBRABILIDADE;

                logResult1 = `: rolou o dado de Manobrabilidade:<span style="color: ${colorDice}"> 🎲 ${diceResult1}</span>, Racer <span style="color: ${colormaneuverability}">${racerOneObject.MANOBRABILIDADE}</span>  = <span style="color: ${colorSumPoints}">${racerOneObject.MANOBRABILIDADE + diceResult1}</span>`;
                logResult2 = `: rolou o dado de Manobrabilidade:<span style="color: ${colorDice}"> 🎲 ${diceResult2}</span>, Racer <span style="color: ${colormaneuverability}">${racerTwoObject.MANOBRABILIDADE}</span>  = <span style="color: ${colorSumPoints}">${racerTwoObject.MANOBRABILIDADE + diceResult2}</span>`;
            }

            if (totalTestSkill1 > totalTestSkill2) {
                winnerRound = ` <span style="color: ${racerOne.fontColor}">${racerOneObject.NOME} </span>marcou um ponto!`
                racerOneObject.PONTOS++;
            }
            else if (totalTestSkill2 > totalTestSkill1) {
                winnerRound = ` <span style="color: ${racerTwo.fontColor}">${racerTwoObject.NOME} </span> marcou um ponto!`
                racerTwoObject.PONTOS++;
            } if (totalTestSkill1 === totalTestSkill2) {
                winnerRound = `<span style="color: ${colorSumPoints}"> empate na rodada!`;
            }
            if (block.match("CONFRONTO")) {

                let powerResult1 = diceResult1 + racerOneObject.PODER;
                let powerResult2 = diceResult2 + racerTwoObject.PODER;


                logResult1 = `: rolou o dado do Poder:<span style="color: ${colorDice}"> 🎲 ${diceResult1}</span>, Racer <span style="color: ${colorPower}">${racerOneObject.PODER}</span>  = <span style="color: ${colorSumPoints}">${racerOneObject.PODER + diceResult1}</span>`;
                logResult2 = `: rolou o dado do Poder:<span style="color: ${colorDice}"> 🎲 ${diceResult2}</span>, Racer <span style="color: ${colorPower}">${racerTwoObject.PODER}</span>  = <span style="color: ${colorSumPoints}">${racerTwoObject.PODER + diceResult2}</span>`;



                if (powerResult1 > powerResult2 && racerTwoObject.PONTOS > 0) {
                    racerTwoObject.PONTOS--;
                    racerOneObject.PONTOS++;
                    console.log("racer 2 com pontos");
                    winnerRound = `${racerOneObject.NOME} vencceu o confronto ${racerTwoObject.NOME} perdeu um ponto!`
                    winnerRound = `<span style="color: ${racerOne.fontColor}">${racerOneObject.NOME}</span> venceu o confronto <span style="color: ${racerTwo.fontColor}">${racerTwoObject.NOME} </span> perdeu um ponto!`

                }
                else if (powerResult2 > powerResult1 && racerOneObject.PONTOS > 0) {
                    racerOneObject.PONTOS--;
                    racerTwoObject.PONTOS++;
                    winnerRound = `<span style="color: ${racerTwo.fontColor}">${racerTwoObject.NOME}</span> venceu o confronto  <span style="color: ${racerOne.fontColor}">${racerOneObject.NOME} </span> perdeu um ponto!`
                    console.log("racer 1 com pontos");
                } else if (powerResult1 === powerResult2) {
                    winnerRound = `<span style="color: ${colorSumPoints}">Confronto empatado!`;
                }

            }

            let racerOneImage = "./img/" + racerOneObject.NOME.toLowerCase() + ".gif";
            let racerTwoImage = "./img/" + racerTwoObject.NOME.toLowerCase() + ".gif";


            const modalStartRace = `
            <div class="playContainer" id="playModal">
                <div class="play-modal-content">
                    <span class="close">&times;</span>
                    <div class="modal-image">
                        <img style="box-shadow: 0px 0px 5px 7px ${racerOne.shadowBorder}; border: 10px double ${racerOne.shadowBorder};" 
                        src="${racerOneImage.toLowerCase().replace(" ", "")}" alt="">
                        <h1 class="vs">VS</h1>
                        <img style="box-shadow: 0px 0px 5px 7px ${racerTwo.shadowBorder}; border: 10px double ${racerTwo.shadowBorder}" 
                            src="${racerTwoImage.toLowerCase().replace(" ", "")}" alt="">
                    </div>

                    <div class="container-attribute">
                        <div class="attribute-racerOne">
                            <h3 style="color:${racerOne.fontColor}">${racerOne.NOME}</h3>
                            <p> Velocidade: <span style="color: ${colorVelocity}">${racerOne.VELOCIDADE}</span></p>
                            <p>Manobrabilidade: <span style="color: ${colormaneuverability}">${racerOne.MANOBRABILIDADE}</span></p>
                            <p> Poder: <span style="color: ${colorPower}">${racerOne.PODER}</span></p>
                        </div>
                        <div class="attribute-racerTwo" >
                            <h3 style="color: ${racerTwo.fontColor}" >${racerTwo.NOME}</h3>
                            <p> Velocidade: <span style="color: ${colorVelocity}">${racerTwo.VELOCIDADE}</span></p>
                            <p>Manobrabilidade: <span style="color: ${colormaneuverability}">${racerTwo.MANOBRABILIDADE}</span></p>
                            <p> Poder: <span style="color: ${colorPower}">${racerTwo.PODER}</span></p>
                        </div>
                    </div>

                    
                            <div class="containerTitlePoints">
                                <h1 class="titlePoints"> PLACAR DE PONTOS</h1>      
                            </div>

                        <div class="containerPointsResults">
                            
                            <div class="RacerOnePoints">
                            <h3 style="color: ${racerOne.fontColor}; text-shadow: 0px 20px 10px ${racerOne.fontColor}">${racerOne.PONTOS}</h3>
                            </div>
                            <h1 class="vs-points">⚡</h1>
                            <div class="RacerTwoPoints">
                            <h3 style="color:${racerTwo.fontColor}; text-shadow: 0px 20px 10px ${racerTwo.fontColor}">${racerTwo.PONTOS}</h3>
                            </div>
                        </div>
                    
        
                    <div class="modal-content-results">
                        <h2>${battleRound}</h2>
                        <p><span style="color: ${racerOne.fontColor}; font-family: 'Press Start 2P', cursive; text-shadow: 0px 0px 15px ${racerOne.shadowBorder};">${racerOne.NOME}</span> ${logResult1}</p>
                        <p><span style="color: ${racerTwo.fontColor}; font-family: 'Press Start 2P', cursive; text-shadow: 0px 0px 15px ${racerTwo.shadowBorder};">${racerTwo.NOME}</span> ${logResult2}</p>
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
                if (event.target == nextRound) {
                    modal.style.display = 'none';
                    modal.remove();
                }
            });  


            console.log("countButton: ", countButton);
            countButton++;
        }

        let nextRoundButton = document.getElementById('nextRound');

        nextRoundButton.addEventListener('click', function (event) {

        
            if (countButton > 5) {
                console.log("chamando");

                declareWinner(racerOneObject,racerTwoObject);

            }
            countButton = 0;
        });

    } else {
        console.error('Não foi possível obter os nomes dos corredores.');
    }
}

function declareWinner(racerOneObject, racerTwoObject) {
    let winner;

    console.log("entrou dentro do declare", "corredor1: ",racerOneObject.PONTOS, "corredor2", racerTwoObject.PONTOS);

    if (racerOneObject.PONTOS > racerTwoObject.PONTOS) {
        winner = racerOneObject;
    } else {
        winner = racerTwoObject;
    }

    let colors = winner.COLOR.length > 2 ? 
        `linear-gradient(to right, ${winner.COLOR[0]}, ${winner.COLOR[1]}, ${winner.COLOR[2]})` :
        `linear-gradient(to right, ${winner.COLOR[0]}, ${winner.COLOR[1]})`;


    let racerOneImage = "./img/" + winner.NOME.toLowerCase() + ".gif";
    const templateWinner = `
        <div class="modal-overlay" id="modalOverlay">
            <div class="modal-content" id="modalContent" style="background: ${colors};">
                <span class="close-modal" id="closeModal">&times;</span>
                <div class="winner-info">
                    <h1>WINNER</h1>
                    <img src="${racerOneImage.replace(" ", "")}" alt="">
                    <div>
                    <h2 style="color: ${winner.fontColor}">${winner.NOME}</h2>
                    <p>Pontuação: ${winner.PONTOS}</p>
                    </div> 
                </div>
            </div>
        </div>`;

    document.querySelector(".container-winner").insertAdjacentHTML('afterbegin', templateWinner);


    const modalOverlay = document.getElementById('modalOverlay');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeModal');
    const spanCloseModal = document.getElementById('.close-modal');

    closeModal.addEventListener('click', function () {
        modalOverlay.remove();
    });

    window.addEventListener('click', function (event) {
        if (event.target === modalOverlay) {
            modalOverlay.remove();
        }
    });

    spanCloseModal.addEventListener('click', function () {
        modalOverlay.remove();
    });

}



async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA";
            console.log("deu reta dentro")
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

