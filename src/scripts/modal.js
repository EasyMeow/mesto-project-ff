function closePopupByEscape(evt) {
    if (evt.key === 'Escape') closePopup(document.querySelector('.popup_is-opened'));
}

function openPopup(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEscape);
}

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEscape);
}

function closeByCrossOrOverlay(evt, popup) {
    if(evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
        popup.removeEventListener('click', (evt) => closePopup(evt, popup));
        closePopup(popup);
    }
}
export {openPopup, closePopup, closeByCrossOrOverlay};