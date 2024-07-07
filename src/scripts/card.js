const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardInfo, remove) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = cardInfo.link;
    cardElement.querySelector('.card__image').alt = `Фотография: ${cardInfo.name}`;
    cardElement.querySelector('.card__title').textContent = cardInfo.name;

    const removeButton = cardElement.querySelector('.card__delete-button');
    removeButton.addEventListener('click', () => remove(cardElement));

    return cardElement;
}

function removeCard(card) {
    card.remove();
}

export {createCard, removeCard};