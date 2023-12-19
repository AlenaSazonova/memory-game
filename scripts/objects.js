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
    let img1 = (cards.find((el) => randomArr[index] === el.id)).img;
    index++

    let id1 = (cards.find((el) => randomArr[index - 1] === el.id)).id;
    console.log(randomArr)
    console.log(id1)


    let img2 = (cards.find((el) => randomArr[index] === el.id)).img;
    index++

    let id2 = (cards.find((el) => randomArr[index - 1] === el.id)).id;
    console.log(id2)

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
    //console.log(id)

    if (!cardSide.classList.contains('on')) {
        cardSide.classList.remove('off');
		cardSide.classList.add('on');
	} else if (cardSide.classList.contains('on')) {
		cardSide.classList.remove('on');
		cardSide.classList.add('off');
	}
}


///////////////////////////////////////////////////////////////


let firstClickCard = '';
let secondClickCard = '';
let flipCard = false;


function getSearchIdentialCards(event) {
    const card = event.currentTarget;
    //console.log(card)
    //console.log(flipCard)
    //console.log(firstClickCard)
    //console.log(secondClickCard)

    if (!flipCard) {
        flipCard = true;
        secondClickCard = card;
        return;
    } 
    
    firstClickCard = card;
    matchCards(event)

    console.log('!')
    
}


function matchCards(event) {
    //console.log(event.target.dataset.side)
    console.log(firstClickCard.dataset.id)
    console.log(secondClickCard.dataset.id)
    console.log(firstClickCard)
    console.log(secondClickCard)


    if (firstClickCard.dataset.id === secondClickCard.dataset.id) {
        deleteCards();
        
    } else {
        firstClickCard.classList.remove('on');
        secondClickCard.classList.remove('on');
        firstClickCard.classList.add('off');
        secondClickCard.classList.add('off');
        
    }

    //flipCard = false;
    //firstClickCard = '';
    //secondClickCard = '';
}


function getCard(event) {
    

}
getCard()



function deleteCards() {
    

    setTimeout(() => {
        console.log(firstClickCard)
        let classFirstClick = firstClickCard.querySelector('.card');
        console.log(classFirstClick)
        //firstClickCard.parentNode.classList.add('delete');
        
        //secondClickCard.parentNode.classList.add('delete');
    }, 1000);
}


function getClickturnOverAndSearch(event) {
    turnOverCard(event);
    getSearchIdentialCards(event);
}


allCards.forEach((card) => card.addEventListener('click', getClickturnOverAndSearch));











































/*
const randomId = getRandomId();
console.log(randomId);
let index = 0;


function renderHandler() {
    cards.map((el) => templateImg(el['id'], el['imgBack']) ).join('');
}
renderHandler();


function templateImg(id, imgBack) {

    let img1 = (cards.find((el) => randomId[index] === el.id)).img
    index += 1;
    console.log(img1)


    let img2 = (cards.find((el) => randomId[index] === el.id)).img
    index += 1;
    console.log(img2)

    const col = document.createElement('div');
    col.classList.add('col');
    col.insertAdjacentHTML('afterbegin', `
        <div class="card">
            <img class="card-img card-back off" data-side="back" data-id=${id} src=${imgBack}>
            <img class="card-img card-front on" data-side="front" data-id=${id} src=${img1}>
        </div>
        <div class="card">
            <img class="card-img card-back off" data-side="back" data-id=${id} src=${imgBack}>
            <img class="card-img card-front on" data-side="front" data-id=${id} src=${img2}>
        </div>
    `)

    const menu = document.querySelector('.menu');
    menu.append(col);
}


let allCards = document.querySelectorAll('.card');


function turnOverCard(event) {
    const sideCard = event.currentTarget;
    //console.log(sideCard)

    if (!sideCard.classList.contains('on')) {
        sideCard.classList.remove('off');
		sideCard.classList.add('on');
	} else if (sideCard.classList.contains('on')) {
		sideCard.classList.remove('on');
		sideCard.classList.add('off');
	}
}


allCards.forEach((card) => card.addEventListener('click', turnOverCard));


////////////////////////////////////////

function shuffle() {
    const id = cards.map((el) => el.id);
    //console.log(id)

    for (let i = id.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [id[i], id[j]] = [id[j], id[i]];
    }

    return id
}
shuffle()


function getRandomId() {
    const randomIdFirst = shuffle();
    //console.log(randomIdFirst);

    const randomIdSecond = shuffle();
    //console.log(randomIdSecond);

    const randomId = randomIdFirst.concat(randomIdSecond);
    //console.log(randomId);

    return randomId
}

*/





