function closePopupByEscape(evt) {
    if (evt.key === 'Escape') closeModal(document.querySelector('.popup_is-opened'));
}

function openModal(popupElement) {
    popupElement.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEscape);
}

function closeModal(popupElement) {
    popupElement.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEscape);
}

function closeByCrossOrOverlay(evt, popupElement) {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
        popupElement.removeEventListener('click', (evt) => closeModal(evt, popupElement));
        closeModal(popupElement);
    }
}

export {openModal, closeModal, closeByCrossOrOverlay};