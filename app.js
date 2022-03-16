let cardArray = [
    { name: "fries", img: "one.png", },
    { name: "fries", img: "one.png", },
    { name: "pizza", img: "crm.png", },
    { name: "pizza", img: "crm.png", },
    { name: "milkshake", img: "show.png", },
    { name: "milkshake", img: "show.png", },
    { name: "ice-cream", img: "oneauth.png", },
    { name: "ice-cream", img: "oneauth.png", },
    { name: "hotdog", img: "desk.png", },
    { name: "hotdog", img: "desk.png", },
    { name: "cheeseburger", img: "back.png", },
    { name: "cheeseburger", img: "back.png", },
    { name: "fries", img: "books.png", },
    { name: "fries", img: "books.png", },
    { name: "pizza", img: "requirt.png", },
    { name: "pizza", img: "requirt.png", },
    { name: "milkshake", img: "zs.png", },
    { name: "milkshake", img: "zs.png", },
    { name: "ice-cream", img: "tra.png", },
    { name: "ice-cream", img: "tra.png", },


];

//define variables and get DOM element

let card = document.querySelector(".card");
let scoreBoard = document.querySelector(".scoreBoard");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let clickBoard = document.querySelector(".clickBoard");
let imgs;
let cardsId = [];
let cardsSelected = [];
let cardsWon = 0;
let clicks = 0;


document.addEventListener("DOMContentLoaded", function() {
    //define functions 

    createBoard(card, cardArray);
    arrangeCard();
    playAgain.addEventListener("click", replay);

    //add a click function for images 

    imgs = document.querySelectorAll("img");
    Array.from(imgs).forEach(img =>
        img.addEventListener("click", flipCard)
    )
});

//createBoard function

function createBoard(card, array) {
    popup.style.display = "none";
    array.forEach((arr, index) => {
        let img = document.createElement("img");
        img.setAttribute("src", "blank.jpg");
        img.setAttribute("data-id", index);
        card.appendChild(img);
    })
}

// arrangeCard function

function arrangeCard() {
    cardArray.sort(() => 0.5 - Math.random())
}

// flip Card function

function flipCard() {
    let selected = this.dataset.id;
    cardsSelected.push(cardArray[selected].name);
    cardsId.push(selected);
    this.classList.add("flip");
    this.setAttribute("src", cardArray[selected].img);
    if (cardsId.length === 2) {
        setTimeout(checkForMatch, 500);
    }
}

function checkForMatch() {
    let imgs = document.querySelectorAll("img");
    let firstCard = cardsId[0];
    let secondCard = cardsId[1];
    if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) {

        cardsWon += 1;
        scoreBoard.innerHTML = cardsWon;
        setTimeout(checkWon, 500)
    } else {
        imgs[firstCard].setAttribute("src", "blank.jpg");
        imgs[secondCard].setAttribute("src", "blank.jpg");

        imgs[firstCard].classList.remove("flip");
        imgs[secondCard].classList.remove("flip");
    }
    cardsSelected = [];
    cardsId = [];
    clicks += 1;
    clickBoard.innerHTML = clicks;
}

function checkWon() {
    if (cardsWon == cardArray.length / 2) {
        alert("You won")
        setTimeout(() => popup.style.display = "flex", 300);
    }
}


function replay() {
    arrangeCard();
    card.innerHTML = "";
    createBoard(card, cardArray);
    cardsWon = 0;
    clicks = 0;
    clickBoard.innerHTML = 0;
    scoreBoard.innerHTML = 0;
    popup.style.display = "none";
}