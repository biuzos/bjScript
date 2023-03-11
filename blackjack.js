var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden;
var deck;

var canHit = true; //permite o player dar hit enquanto a soma(yourSum<=21)

window.onload = function(){
    buildDeck();
    shuffleDeck();
    startGame();
}


function buildDeck(){
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    let types = ["C","D","H","S",]
    deck = [];

    for(let i = 0; i < types.length; i++ ) {
        for(let j = 0; j <values.length; j++){
            deck.push(values[j] + "-" + types[i]) // AC - KC, AD - KD, AH - KH, AS -KS
        }
        console.log(deck)
    }
}
function shuffleDeck(){
    for(let i = 0; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length);// (0-1) = random vezes deck.lenght(51.999) math floor para casa decimal
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame(){
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
   // console.log(hidden);
   // console.log(dealerSum);
   while(dealerSum < 17) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src= "./cards/" + card + ".png";
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    document.getElementById("dealer-cards").append(cardImg);
}
    //console.log(dealerSum);
    for(i = 0; i < 2; i++){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src= "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }
    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("reload").addEventListener("click", reloadPage);
}

function hit(){
    if(!canHit){
        return;
    }
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src= "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if(reduceAce(yourSum, yourAceCount) > 21){ // A , J , K ->  11 + 10 + 10
        canHit = false;
    }
}
function stay(){
     dealerSum = reduceAce(dealerSum,dealerAceCount);
     yourSum = reduceAce(yourSum,yourAceCount);

     canHit = false;

     document.getElementById("hidden").src = "./cards/" + hidden + ".png";

     let message = "";
     if(yourSum > 21){
        message = "Você Perdeu!"
     } 
     else if(dealerSum > 21) {
        message = "Você ganhou!"
     }// vc e o dealer < = 21
     else if(yourSum == dealerSum) {
        message = "Empate!"
     }
     else if(yourSum == 21 || dealerSum == 21){
        message = "BLACKJACK!"
     }
     else if (yourSum > dealerSum) {
        message = "Você ganhou!"
     } 
     else if(yourSum < dealerSum) {
        message = "Você perdeu!"
     }
     
     document.getElementById("dealer-sum").innerText  = dealerSum;
     document.getElementById("your-sum").innerText  = yourSum;
     document.getElementById("results").innerText = message;
}

function getValue(card){
    let data = card.split("-");// dividir o valor da carta em array ["4", "C"]
    let value = data[0];

    if(isNaN(value)){
        if( value == "A"){
            return 11;
        }
        return 10;
    }

    return parseInt(value);

}

function checkAce(card){
    if(card[0] == "A"){
        return 1;
    }
    return 0;

}

function reduceAce(playerSum, playerAceCount){
    while(playerSum > 21 && playerAceCount > 0){
        playerSum -= 10;
        playerAceCount -=1;
    }
    return playerSum;
}

function reloadPage(){
    window.location.reload(true);

}