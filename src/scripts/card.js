const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardInfo, remove, openCardPopup) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__title').textContent = cardInfo.name;

    cardImage.src = cardInfo.link;
    cardImage.alt = `Фотография: ${cardInfo.name}`;

    const removeButton = cardElement.querySelector('.card__delete-button');
    removeButton.addEventListener('click', () => remove(cardElement));

    cardImage.addEventListener('click', evt => {
        openCardPopup(cardElement);
    })

    return cardElement;
}

function removeCard(card) {
    card.remove();
}

export {createCard, removeCard};