import './pages/index.css';
import {getInitialCards, getAuthor, editAccount, editAvatar, addPlace} from "./scripts/api";
import {createCard, removeCard, likeCard} from "./scripts/card";
import {openModal, closeModal, closeByCrossOrOverlay} from "./scripts/modal";
import {enableValidation, clearValidation} from "./scripts/validation";

const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const newImagePopup = document.querySelector('.popup_type_image');
const editAvatarButton = document.querySelector('.profile__image-cover');
const profileTitle = document.querySelector('.profile__title');

const profileDescription = document.querySelector('.profile__description');

const avatarUrlInput = avatarPopup.querySelector('.popup__input_type_url');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatar = document.querySelector('.profile__image');

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
    editAccount(nameInput.value, jobInput.value)
        .then(() => {
            profileTitle.textContent = nameInput.value;
            profileDescription.textContent = jobInput.value;
            closeModal(editProfilePopup);
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        });
}

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    editAvatar(avatarUrlInput.value)
        .then(() => {
            avatar.style['background-image'] = `url('${avatarUrlInput.value}')`;
            closeModal(avatarPopup);
            avatarUrlInput.value = '';
        })
        .catch((err) => {
            console.log(err);
        })
}

function handlePlacesFormSubmit(evt) {
    evt.preventDefault();
    const newCard = {
        name: placesNameInput.value,
        link: placesUrlInput.value,
    };

    addPlace(placesNameInput.value, placesUrlInput.value)
        .then((cardData) => {
            placesList.prepend(createCard(cardData, removeCard, openCardPopup, likeCard, idAuthor))
            placesForm.reset();
            closeModal(newCardPopup);
        })
        .catch((err) => {
            console.log(err); // выводим ошибку в консоль
        })
}

const openCardPopup = (cardInfo) => {
    popupImage.src = cardInfo.link;
    popupCaption.textContent = cardInfo.name;
    openModal(newImagePopup);
}

editProfilePopup.addEventListener('click', evt => closeByCrossOrOverlay(evt, editProfilePopup));
avatarPopup.addEventListener('click', (evt) => closeByCrossOrOverlay(evt, avatarPopup));
newCardPopup.addEventListener('click', evt => closeByCrossOrOverlay(evt, newCardPopup));
newImagePopup.addEventListener('click', evt => closeByCrossOrOverlay(evt, newImagePopup));

editButton.addEventListener('click', evt => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearValidation(profileForm, validationConfig);
    openModal(editProfilePopup);
});

editAvatarButton.addEventListener('click', evt => {
    avatarUrlInput.value = '';
    clearValidation(avatarForm, validationConfig);
    openModal(avatarPopup);
})

newCardButton.addEventListener('click', evt => {
    placesNameInput.value = '';
    placesUrlInput.value = '';
    clearValidation(newCardPopup, validationConfig);
    openModal(newCardPopup);
});

profileForm.addEventListener('submit', handleProfileFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit)
placesForm.addEventListener('submit', handlePlacesFormSubmit);

Promise.all([getInitialCards(), getAuthor()])
    .then(([cardList, authorData]) => {
        idAuthor = authorData._id;
        profileTitle.textContent = authorData.name;
        profileDescription.textContent = authorData.about;
        avatar.style['background-image'] = `url('${authorData.avatar}')`;
        cardList.forEach((cardData) => {
            placesList.append(createCard(cardData, removeCard, openCardPopup, likeCard, idAuthor));
        });
    })
    .catch((err) => {
        console.log(err);
    });

enableValidation(validationConfig);
