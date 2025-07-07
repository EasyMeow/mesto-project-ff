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
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`)
        });
}

const getAuthor = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
}

export {getInitialCards, getAuthor}