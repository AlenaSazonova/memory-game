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
let thirdCard = '';
let flipCard = false;


function getSearchIdentialCards(event) {
    const card = event.currentTarget;

    if (!flipCard) {
        flipCard = true;
        firstCard = card;
        return;
    } 

    secondCard = card;
    thirdCard = card;

    matchCards(event);
}


function matchCards(event) {
    let firstClick = firstCard.children[0].parentNode;
    console.log('firstClick', firstClick);
    let secondClick = secondCard.children[0].parentNode;
    console.log('secondClick', secondClick);
    let thirdClick = thirdCard.children[0].parentNode;
    console.log('thirdClick', thirdClick);


    let firstClickImg = firstCard.children[1];
    console.log('firstClickImg', firstClickImg);
    let secondClickImg = secondCard.children[1];
    console.log('secondClickImg', secondClickImg);
    let thirdClickImg = secondCard.children[1];
    console.log('thirdClickImg', thirdClickImg);


    if (firstCard.dataset.id === secondCard.dataset.id) {
        console.log('firstCard', firstCard);
        console.log('secondCard', secondCard);
        console.log('thirdCard', thirdCard);
        setTimeout(() => {
            firstClickImg.classList.add('border-green');
            secondClickImg.classList.add('border-green');
            thirdClickImg.classList.add('border-red');
        }, 1000);

        setTimeout(() => {
            firstClickImg.classList.add('delete');
            secondClickImg.classList.add('delete');
            thirdClickImg.classList.remove('on');
            firstClickImg.classList.remove('border-green');
            secondClickImg.classList.remove('border-green');
            thirdClickImg.classList.remove('border-red');
        }, 1500);
        flipCard = false;
        
    } else if (firstCard.dataset.id === thirdCard.dataset.id) {
        setTimeout(() => {
            firstClickImg.classList.add('border-green');
            secondClick.classList.add('border-red');
            thirdClickImg.classList.add('border-green');
        }, 1000);

        setTimeout(() => {
            firstClickImg.classList.add('delete');
            secondClick.classList.remove('on');
            thirdClickImg.classList.add('delete');
            firstClickImg.classList.remove('border-green');
            secondClick.classList.remove('border-red');
            thirdClickImg.classList.remove('border-green');
        }, 1500);
        flipCard = false;

    } else if (secondCard.dataset.id === thirdCard.dataset.id) {
        setTimeout(() => {
            firstClick.classList.add('border-red');
            secondClickImg.classList.add('border-green');
            thirdClickImg.classList.add('border-green');
        }, 1000);

        setTimeout(() => {
            firstClick.classList.remove('on');
            secondClickImg.classList.add('delete');
            thirdClickImg.classList.add('delete');
            firstClick.classList.remove('border-red');
            secondClickImg.classList.remove('border-green');
            thirdClickImg.classList.remove('border-green');
        }, 1500);
        flipCard = false;
    } 
        flipCard = false;
        firstCard = '';
        secondCard = '';
        thirdCard = '';

}



function getClickturnOverAndSearch(event) {
    turnOverCard(event);
    getSearchIdentialCards(event);
}


allCards.forEach((card) => card.addEventListener('click', getClickturnOverAndSearch));


