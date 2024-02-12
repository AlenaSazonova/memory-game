
export function getId(card) {
    return card.dataset.id;
}

export function getObjectLength(obj) {
    return Object.keys(obj).length;
}

export function findCards(className) {
    return [...document.querySelectorAll(className)];
}

export function closeCards(cards) {
    setTimeout(() => {
        cards.forEach(card => {
            if (card.classList.contains('on')) {
                card.classList.remove('on');
                card.classList.add('off');
            }
        });
    }, 1500);
}

export function findSameCards(cards, id) {
    return cards.filter(card => card.dataset.id === id)
    };

export function deleteCards(cards) {
    setTimeout(() => {
        cards.forEach(card => {
            card.classList.add('delete');
        });
    }, 1500);
}

export function getIdWithoutPair(openedCards) {
    for (let key in openedCards) {
        if (key !== openedCards['hasPair'] && key !== 'hasPair') {
            return key;
        }
    }
}
