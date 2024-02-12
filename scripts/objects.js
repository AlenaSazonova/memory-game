import { getId, getObjectLength, findCards, closeCards, findSameCards, deleteCards, getIdWithoutPair } from "./utils.js";

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
    if (getObjectLength(openedCards) > 2) {
        return;
    }

    const cardSide = event.currentTarget; 

    if (!cardSide.classList.contains('on')) {
        cardSide.classList.remove('off');
		cardSide.classList.add('on');
	} else {
		cardSide.classList.remove('on');
		cardSide.classList.add('off');
	}
}


///////////////////////////////////////////////////////////////


let openedCards = {}


function clickOnCard(event) { 
    const card = event.currentTarget;
    const id = getId(card);

    if (!Object.hasOwn(openedCards, id)) {
        openedCards[id] = card;
    } else { 
        openedCards['hasPair'] = id;
    }

    if (getObjectLength(openedCards) === 3) {
        matchCards();
    } 
}


function matchCards() {
    const cards = findCards('.card');

    if (!Object.hasOwn(openedCards, 'hasPair')) {
        closeCards(cards);
    } else {
        const id = openedCards['hasPair']; //sameId
        const sameCards = findSameCards(cards, id);
        deleteCards(sameCards);

        const idWithoutPair = getIdWithoutPair(openedCards);
        const cardWithoutPair = findSameCards(cards, idWithoutPair);
        closeCards(cardWithoutPair);
    }

    setTimeout(() => {
        openedCards = {};
    }, 2000);
}


function getClick(event) {
    turnOverCard(event);
    clickOnCard(event);
}


allCards.forEach((card) => card.addEventListener('click', getClick));

