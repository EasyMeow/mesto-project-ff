const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

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

initialCards.forEach(function (item) {
    placesList.append(createCard(item, removeCard));
});
