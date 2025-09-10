import {like, disLike} from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

function createCard(cardInfo, remove, openCardPopup, likeCard, authorId) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardLike = cardElement.querySelector('.card__like-button');
    const cardTitle = cardElement.querySelector('.card__title');
    const removeButton = cardElement.querySelector('.card__delete-button');
    const likesCount = cardElement.querySelector('.like-count');

    cardImage.src = cardInfo.link;
    cardImage.alt = `Фотография: ${cardInfo.name}`;
    cardTitle.textContent = cardInfo.name
    likesCount.textContent = cardInfo.likes.length;

    const isLiked = cardInfo.likes.some((like) => like._id === authorId);
    if (isLiked) {
        cardLike.classList.add('card__like-button_is-active');
    } else {
        cardLike.classList.remove('card__like-button_is-active');
    }

    removeButton.addEventListener('click', () => remove(cardElement));
    cardImage.addEventListener('click', () => openCardPopup(cardInfo));
    cardLike.addEventListener('click', () => likeCard(cardLike, likesCount, cardInfo));

    return cardElement;
}

function removeCard(card) {
    card.remove();
}

function likeCard(likeElement, likesCount, cardInfo) {
    const hasLike = likeElement.classList.contains('card__like-button_is-active');
    if (!hasLike) {
        like(cardInfo._id)
            .then((result) => {
                likeElement.classList.toggle('card__like-button_is-active');
                likesCount.textContent = result.likes.length;
            })
            .catch((err) => {
                console.log(err); // выводим ошибку в консоль
            });
    } else {
        disLike(cardInfo._id)
            .then((result) => {
                likeElement.classList.toggle('card__like-button_is-active');
                likesCount.textContent = result.likes.length;
            })
            .catch((err) => {
                console.log(err); // выводим ошибку в консоль
            });
    }
}

export {createCard, removeCard, likeCard};