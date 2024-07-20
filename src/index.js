import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, removeCard} from "./scripts/card";
import {openPopup, closePopup, closeByCrossOrOverlay} from "./scripts/modal";

const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = editProfilePopup.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');


const placesForm = newCardPopup.querySelector('.popup__form');
const placesNameInput = document.querySelector('.popup__input_type_card-name');
const placesUrlInput = document.querySelector('.popup__input_type_url');

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

    placesList.prepend(createCard(newCard, removeCard, openCardPopup))
    placesNameInput.value = '';
    placesUrlInput.value = '';
    closePopup(newCardPopup);
}

const openCardPopup = (card) => {
    const popup = document.querySelector('.popup_type_image');
    popup.querySelector('.popup__image').src = card.querySelector('.card__image').src;
    popup.querySelector('.popup__caption').textContent = card.querySelector('.card__title').textContent;
    popup.addEventListener('click', (evt) => closePopup(popup, evt));
    openPopup(popup);
}

initialCards.forEach(function (item) {
    placesList.append(createCard(item, removeCard, openCardPopup));
});
