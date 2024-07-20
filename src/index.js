import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, removeCard, likeCard} from "./scripts/card";
import {openPopup, closePopup, closeByCrossOrOverlay} from "./scripts/modal";

const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = editProfilePopup.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const placesForm = newCardPopup.querySelector('.popup__form');
const placesNameInput = document.querySelector('.popup__input_type_card-name');
const placesUrlInput = document.querySelector('.popup__input_type_url');

editProfilePopup.classList.add('popup_is-animated');
newCardPopup.classList.add('popup_is-animated');
popupImage.classList.add('popup_is-animated');

editProfilePopup.addEventListener('click', evt => closeByCrossOrOverlay(evt, editProfilePopup));
newCardPopup.addEventListener('click', evt => closeByCrossOrOverlay(evt, newCardPopup));

editButton.addEventListener('click', evt => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(editProfilePopup);
});

newCardButton.addEventListener('click', evt => {
    openPopup(newCardPopup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);

placesForm.addEventListener('submit', handlePlacesFormSubmit);


function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(editProfilePopup);
}

function handlePlacesFormSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: placesNameInput.value,
        link: placesUrlInput.value,
    };

    placesList.prepend(createCard(newCard, removeCard, openCardPopup, likeCard))
    placesNameInput.value = '';
    placesUrlInput.value = '';
    closePopup(newCardPopup);
}

const openCardPopup = (card) => {
    popupImage.querySelector('.popup__image').src = card.querySelector('.card__image').src;
    popupImage.querySelector('.popup__caption').textContent = card.querySelector('.card__title').textContent;
    popupImage.addEventListener('click', (evt) => closePopup(popupImage, evt));
    openPopup(popupImage);
}

initialCards.forEach(function (item) {
    placesList.append(createCard(item, removeCard, openCardPopup, likeCard));
});
