import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {createCard, removeCard} from "./scripts/card";

const placesList = document.querySelector('.places__list');

initialCards.forEach(function (item) {
    placesList.append(createCard(item, removeCard));
});
