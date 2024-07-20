const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardInfo, remove, openCardPopup, likeCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLike = cardElement.querySelector('.card__like-button');
    const cardTitle = cardElement.querySelector('.card__title');
    const removeButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardInfo.link;
    cardImage.alt = `Фотография: ${cardInfo.name}`;
    cardTitle.textContent = cardInfo.name

    removeButton.addEventListener('click', () => remove(cardElement));
    cardImage.addEventListener('click', () => openCardPopup(cardElement));
    cardLike.addEventListener('click', () => likeCard(cardLike));

    return cardElement;
}

function removeCard(card) {
    card.remove();
}

function likeCard(likeElement) {
    likeElement.classList.toggle('card__like-button_is-active');
}

export {createCard, removeCard, likeCard};