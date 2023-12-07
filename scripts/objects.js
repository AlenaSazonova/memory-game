'use strict';

const cards = [
    {id: 1, title: 'Cinderella', img: '/assets/Cinderella.PNG', imgBack: '/assets/backSide.PNG'},
    {id: 2, title: 'Elsa', img: '/assets/Elsa.PNG', imgBack: '/assets/backSide.PNG'},
    {id: 3, title: 'Mermaid', img: '/assets/Mermaid.PNG', imgBack: '/assets/backSide.PNG'},
    {id: 4, title: 'SnowWhite', img: '/assets/SnowWhite.PNG', imgBack: '/assets/backSide.PNG'}
]

function renderHandler() {
    cards.map((el) => templateImg(el['img'], el['id'], el['imgBack'])).join('');
}
renderHandler()


function templateImg(img, id, imgBack) {
    const col = document.createElement('div');
    col.classList.add('col');
    col.insertAdjacentHTML('afterbegin', `
        <div class="card">
            <img class="card-img card-back off" data-side="back" data-id=${id} src=${imgBack}>
            <img class="card-img card-front on" data-side="front" data-id=${id} src=${img}>
        </div>
        <div class="card">
            <img class="card-img card-back off" data-side="back" data-id=${id} src=${imgBack}>
            <img class="card-img card-front on" data-side="front" data-id=${id} src=${img}>
        </div>
    `)

    const menu = document.querySelector('.menu');
    menu.append(col);
}


let allCards = document.querySelectorAll('.card');


function turnOverCard(event) {
    const cardSide = event.currentTarget; 
    const id = event.target.dataset.id;
    console.log(id)

    if (!cardSide.classList.contains('on')) {
        cardSide.classList.remove('off');
		cardSide.classList.add('on');
	} else if (cardSide.classList.contains('on')) {
		cardSide.classList.remove('on');
		cardSide.classList.add('off');
	}
}


allCards.forEach((card) => card.addEventListener('click', turnOverCard));

