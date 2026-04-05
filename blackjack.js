function randomnumber(){
    let num=Math.floor(Math.random()*13)+1;
    if(num>10){
        return 10;
    }else{
        return num;
    }
}

function cardname(num){
    if(num===1){
    return('Ace');
}else if(num===2){
    return('Two');
}else if(num===3){
    return('Three');
}else if(num===4){
    return('Four');
} else if(num===5){
    return('Five');
}else if(num===6){
    return('Six');
}else if(num===7){
    return('Seven');
}else if(num===8){
    return('Eight');
}else if(num===9){
    return('Nine');
}else if(num===10){
    return('Ten');
}else if(num===11){
    return('Jack');
}else if(num===12){
    return('Queen');
}else if(num===13){
    return('King');
}
}

let cardnum=0;
let card='none';
let dcardnum=0;

let player={
    score: 0,
    cards: ['']   
};

let dealer={
    score: 0,
    cards: ['']   
};

player.score=randomnumber();
cardnum=player.score;

dealer.score=randomnumber();
dcardnum=dealer.score;


player.cards.push(cardname(cardnum));
dealer.cards.push(cardname(dcardnum));

let playercards=document.getElementById('player-cards');
let playerscore=document.getElementById('player-score');
let dealercards=document.getElementById('dealer-cards');
let dealerscore=document.getElementById('dealer-score');

playerscore.textContent='Score: '+player.score;
dealerscore.textContent='Score: '+dealer.score;
for(let i=0;i<player.cards.length;i++){
    playercards.textContent+=player.cards[i]+' ';     
}
for(let i=0;i<dealer.cards.length;i++){
    dealercards.textContent+=dealer.cards[i]+' ';     
}

if(player.score<21){
    document.getElementsByClassName('hidebutton')[0].style.display='block';
    document.getElementsByClassName('hidebutton')[2].style.display='block';
    document.getElementsByClassName('hidebutton')[1].style.display='block';
}

let playerbj=false;
let playerbust=false;

function hit(){
    cardnum=randomnumber();
    player.score+=cardnum;
    player.cards.push(cardname(cardnum));
    playerscore.textContent='Score: '+player.score;
    if(player.score>=21){
    document.getElementsByClassName('hidebutton')[0].style.display='none';
    document.getElementsByClassName('hidebutton')[2].style.display='none';
    document.getElementsByClassName('hidebutton')[1].style.display='none';
    }  
    playercards.textContent+=player.cards[player.cards.length-1]+' ';
    if(player.score>21){
        document.getElementById('gameover').style.display='block';
        document.getElementById('dealer-win').style.display='block';
        playerbust=true;
    }else if(player.score===21){
        document.getElementById('bj').style.display='block';
        document.getElementById('player-win').style.display='block';
        playerbj=true;
    }
}

let dealerbj=false;
let dealerbust=false;

function stand(){
    document.getElementsByClassName('hidebutton')[0].style.display='none';
    document.getElementsByClassName('hidebutton')[2].style.display='none';
    document.getElementsByClassName('hidebutton')[1].style.display='none';
    document.getElementById('stand').style.display='block';
    dcardnum=randomnumber();
    for(let i=0;i<10;i++){
        if(dealer.score<17){
            dealer.score+=dcardnum;
            dealer.cards.push(cardname(dcardnum));
            dealerscore.textContent='Score: '+dealer.score;
            dealercards.textContent+=dealer.cards[dealer.cards.length-1]+' ';
        }else{
        dealerscore.textContent='Score: '+dealer.score;
        break;
        }
    }
    if(dealer.score===21){
        document.getElementById('dealer-bj').style.display='block';
        dealerbj=true;
    }else if(dealer.score>21){
        document.getElementById('dealer-bust').style.display='block';
        dealerbust=true;
    }
    if(playerbj===true && dealerbj===false){
        document.getElementById('player-win').style.display='block';
    }else if(playerbj===false && dealerbj===true){
        document.getElementById('dealer-win').style.display='block';
    }else if(playerbust===true && dealerbust===false){
        document.getElementById('dealer-win').style.display='block';
    }else if(playerbust===false && dealerbust===true){
        document.getElementById('player-win').style.display='block';
    }else if(player.score>dealer.score && playerbust===false && dealerbust===false){
        document.getElementById('player-win').style.display='block';
    }else if(player.score<dealer.score && playerbust===false && dealerbust===false){
        document.getElementById('dealer-win').style.display='block';
    }else{
        document.getElementById('draw').style.display='block';
    }
}
  