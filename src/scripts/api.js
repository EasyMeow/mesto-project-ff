const config = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-mag-3',
    headers: {
        authorization: 'afda2a96-77ef-46bf-9ceb-31cfd001e51a',
        'Content-Type': 'application/json'
    }
}

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            return getResponseData(res);
        });
}

const getAuthor = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            return getResponseData(res);
        });
}

const editAccount = (nameVar, aboutVar) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: nameVar,
            about: aboutVar
        })
    })
        .then(res => {
            return getResponseData(res);
        });
}

const editAvatar = (avatarUrl) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
        .then(res => {
            return getResponseData(res);
        });
}

const addPlace = (nameVar, linkVar) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: nameVar,
            link: linkVar
        })
    })
        .then(res => {
            return getResponseData(res);
        });
}

const deletePlace = (idPlace) => {
    return fetch(`${config.baseUrl}/cards/${idPlace}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(res => {
            return getResponseData(res);
        });
}

const like = (idLike) => {
    return fetch(`${config.baseUrl}/cards/likes/${idLike}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then(res => {
            return getResponseData(res);
        });
}

const disLike = (idLike) => {
    return fetch(`${config.baseUrl}/cards/likes/${idLike}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then(res => {
            return getResponseData(res);
        });
}

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

export {getInitialCards, getAuthor, editAccount, editAvatar, addPlace, deletePlace, like, disLike}