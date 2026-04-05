function randomnumber(){
    let num = Math.floor(Math.random() * 13) + 1;
    return num > 10 ? 10 : num;
}

function cardname(num){
    const names = ['','Ace','2','3','4','5','6','7','8','9','10','J','Q','K'];
    return names[num] || String(num);
}

// Render a card as a styled chip element
function addCardChip(containerId, name, value) {
    const container = document.getElementById(containerId);
    const chip = document.createElement('span');
    chip.className = 'card-chip';
    // Red suit for hearts/diamonds feel on face cards, black otherwise
    const redCards = ['A','J','Q','K'];
    chip.style.color = redCards.includes(name) ? '#c0392b' : '#1a1a1a';
    chip.textContent = name;
    container.appendChild(chip);
}

let cardnum = 0;
let dcardnum = 0;

let player = { score: 0, cards: [] };
let dealer = { score: 0, cards: [] };

// Initial deal
player.score = randomnumber();
cardnum = player.score;
player.cards.push(cardname(cardnum));

dealer.score = randomnumber();
dcardnum = dealer.score;
dealer.cards.push(cardname(dcardnum));

// Render initial cards
addCardChip('player-cards', cardname(cardnum), cardnum);
addCardChip('dealer-cards', cardname(dcardnum), dcardnum);

document.getElementById('player-score').textContent = 'Score: ' + player.score;
document.getElementById('dealer-score').textContent = 'Score: ' + dealer.score;

// Show hit/stand buttons and prompt if under 21
if (player.score < 21) {
    document.getElementsByClassName('hidebutton')[0].style.display = 'block';
    document.getElementsByClassName('hidebutton')[1].style.display = 'flex';
    document.getElementsByClassName('hidebutton')[2].style.display = 'flex';
}

let playerbj   = false;
let playerbust = false;

function hit(){
    cardnum = randomnumber();
    player.score += cardnum;
    const name = cardname(cardnum);
    player.cards.push(name);
    addCardChip('player-cards', name, cardnum);
    document.getElementById('player-score').textContent = 'Score: ' + player.score;

    if (player.score >= 21) {
        document.getElementsByClassName('hidebutton')[0].style.display = 'none';
        document.getElementsByClassName('hidebutton')[1].style.display = 'none';
        document.getElementsByClassName('hidebutton')[2].style.display = 'none';
    }

    if (player.score > 21) {
        document.getElementById('gameover').style.display = 'block';
        document.getElementById('dealer-win').style.display = 'block';
        playerbust = true;
    } else if (player.score === 21) {
        document.getElementById('bj').style.display = 'block';
        document.getElementById('player-win').style.display = 'block';
        playerbj = true;
    }
}

let dealerbj   = false;
let dealerbust = false;

function stand(){
    document.getElementsByClassName('hidebutton')[0].style.display = 'none';
    document.getElementsByClassName('hidebutton')[1].style.display = 'none';
    document.getElementsByClassName('hidebutton')[2].style.display = 'none';
    document.getElementById('stand').style.display = 'block';

    dcardnum = randomnumber();
    for (let i = 0; i < 10; i++) {
        if (dealer.score < 17) {
            dealer.score += dcardnum;
            const name = cardname(dcardnum);
            dealer.cards.push(name);
            addCardChip('dealer-cards', name, dcardnum);
            document.getElementById('dealer-score').textContent = 'Score: ' + dealer.score;
        } else {
            break;
        }
    }

    if (dealer.score === 21) {
        document.getElementById('dealer-bj').style.display = 'block';
        dealerbj = true;
    } else if (dealer.score > 21) {
        document.getElementById('dealer-bust').style.display = 'block';
        dealerbust = true;
    }

    if      (playerbj && !dealerbj)                                        showResult('player-win');
    else if (!playerbj && dealerbj)                                        showResult('dealer-win');
    else if (playerbust && !dealerbust)                                    showResult('dealer-win');
    else if (!playerbust && dealerbust)                                    showResult('player-win');
    else if (player.score > dealer.score && !playerbust && !dealerbust)   showResult('player-win');
    else if (player.score < dealer.score && !playerbust && !dealerbust)   showResult('dealer-win');
    else                                                                   showResult('draw');
}

function showResult(id){
    document.getElementById(id).style.display = 'block';
}
