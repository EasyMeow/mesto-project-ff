import './pages/index.css';
import {getInitialCards, getAuthor} from "./scripts/api";
import {createCard, removeCard, likeCard} from "./scripts/card";
import {openModal, closeModal, closeByCrossOrOverlay} from "./scripts/modal";
import {enableValidation, clearValidation} from "./scripts/validation";

const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newImagePopup = document.querySelector('.popup_type_image');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = editProfilePopup.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

const placesForm = newCardPopup.querySelector('.popup__form');
const placesNameInput = document.querySelector('.popup__input_type_card-name');
const placesUrlInput = document.querySelector('.popup__input_type_url');

const popupImage = newImagePopup.querySelector('.popup__image');
const popupCaption = newImagePopup.querySelector('.popup__caption');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

let idAuthor = '';

editProfilePopup.classList.add('popup_is-animated');
newCardPopup.classList.add('popup_is-animated');
newImagePopup.classList.add('popup_is-animated');

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(editProfilePopup);
}

function handlePlacesFormSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: placesNameInput.value,
        link: placesUrlInput.value,
    };

    placesList.prepend(createCard(newCard, removeCard, openCardPopup, likeCard))
    placesForm.reset();
    closeModal(newCardPopup);
}

const openCardPopup = (cardInfo) => {
    popupImage.src = cardInfo.link;
    popupCaption.textContent = cardInfo.name;
    openModal(newImagePopup);
}

editProfilePopup.addEventListener('click', evt => closeByCrossOrOverlay(evt, editProfilePopup));
newCardPopup.addEventListener('click', evt => closeByCrossOrOverlay(evt, newCardPopup));
newImagePopup.addEventListener('click', evt => closeByCrossOrOverlay(evt, newImagePopup));

editButton.addEventListener('click', evt => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(profileForm, validationConfig);
    openModal(editProfilePopup);
});

newCardButton.addEventListener('click', evt => {
    clearValidation(newCardPopup, validationConfig);
    openModal(newCardPopup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);

placesForm.addEventListener('submit', handlePlacesFormSubmit);

Promise.all([getInitialCards(), getAuthor()])
    .then(([cardList, authorData]) => {
        idAuthor = authorData._id;
        profileTitle.textContent = authorData.name;
        profileDescription.textContent = authorData.about;
        cardList.forEach((cardData) => {
            placesList.append(createCard(cardData, removeCard, openCardPopup, likeCard));
        });
    })
    .catch((err) => {
        console.log(err);
    });

enableValidation(validationConfig);
