'use strict';

const cards = [
    {id: 1, title: 'Cinderella', img: './assets/Cinderella.PNG', imgBack: './assets/backSide.PNG'},
    {id: 2, title: 'Elsa', img: './assets/Elsa.PNG', imgBack: './assets/backSide.PNG'},
    {id: 3, title: 'Mermaid', img: './assets/Mermaid.PNG', imgBack: './assets/backSide.PNG'},
    {id: 4, title: 'SnowWhite', img: './assets/SnowWhite.PNG', imgBack: './assets/backSide.PNG'}
]


let index = 0;
const randomArr = getRandomArrayId();


function renderHandler() {
    cards.map((el) => templateImg(el['imgBack']) ).join('');
}
renderHandler()


function templateImg(imgBack) {
    console.log(randomArr)
    
    let img1 = (cards.find((el) => randomArr[index] === el.id)).img;
    index++
    let id1 = (cards.find((el) => randomArr[index - 1] === el.id)).id;
    

    let img2 = (cards.find((el) => randomArr[index] === el.id)).img;
    index++
    let id2 = (cards.find((el) => randomArr[index - 1] === el.id)).id;

    const col = document.createElement('div');
    col.classList.add('col');
    col.insertAdjacentHTML('afterbegin', `
        <div class="card" data-id=${id1}>
            <img class="card-img card-back off" data-side="${img1}" src=${imgBack}>
            <img class="card-img card-front on" data-side="back" src=${img1}>
        </div>
        <div class="card" data-id=${id2}>
            <img class="card-img card-back off" data-side="${img2}" src=${imgBack}>
            <img class="card-img card-front on" data-side="back" src=${img2}>
        </div>
    `)

    const menu = document.querySelector('.menu');
    menu.append(col);
}


/////////////////////////////////////////////////////////////


function shuffle() {
    const id = cards.map(el => el.id);

    for (let i = id.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [id[i], id[j]] = [id[j], id[i]];
    }

    return id;
}

function getRandomArrayId() {
    const randomArrayId1 = shuffle();
    const randomArrayId2 = shuffle();

    return randomArrayId1.concat(randomArrayId2);
}


//////////////////////////////////////////////////////////////


let allCards = document.querySelectorAll('.card');


function turnOverCard(event) {
    const cardSide = event.currentTarget; 
    //const id = event.target.dataset.id;

    if (!cardSide.classList.contains('on')) {
        cardSide.classList.remove('off');
		cardSide.classList.add('on');
	} else if (cardSide.classList.contains('on')) {
		cardSide.classList.remove('on');
		cardSide.classList.add('off');
	}
}


///////////////////////////////////////////////////////////////


let firstCard = '';
let secondCard = '';
let flipCard = false;


function getSearchIdentialCards(event) {
    const card = event.currentTarget;

    if (!flipCard) {
        flipCard = true;
        firstCard = card;
        return;
    } 
    
    secondCard = card;
    matchCards(event)
}


function matchCards(event) {
    if (firstCard.dataset.id === secondCard.dataset.id) {
        deleteCards();
        flipCard = false;
    } else {
        let firstClick = firstCard.children[0].parentNode;
        let secondClick = secondCard.children[0].parentNode;

        setTimeout(() => {
            firstClick.classList.add('border-red');
            secondClick.classList.add('border-red');
        }, 500);

        setTimeout(() => {
            firstClick.classList.remove('on');
            secondClick.classList.remove('on');
            firstClick.classList.remove('border-red');
            secondClick.classList.remove('border-red');
        }, 1000);
        
        flipCard = false;
        firstCard = '';
        secondCard = '';
    } 
}


function deleteCards() {
    let firstClick = firstCard.children[1];
    let secondClick = secondCard.children[1];

    setTimeout(() => {
        firstClick.classList.add('border-green');
        secondClick.classList.add('border-green');
    }, 1000);

    setTimeout(() => {
        firstClick.classList.add('delete');
        secondClick.classList.add('delete');
    }, 1500);

    firstCard = '';
    secondCard = '';
}


function getClickturnOverAndSearch(event) {
    turnOverCard(event);
    getSearchIdentialCards(event);
}


allCards.forEach((card) => card.addEventListener('click', getClickturnOverAndSearch));

