class Api {
  constructor() {
    this.baseUrl = "https://mesto.nomoreparties.co/v1/cohort-49";
    this.newBaseUrl = "https://auth.nomoreparties.co";
  }

  //Проверка ответа от сервера
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  //Получение массива исходных карточек
  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        Authorization: "c8e88be4-173c-499a-97f5-515e9331d7ba",
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  //Получение данных пользователя
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        Authorization: "c8e88be4-173c-499a-97f5-515e9331d7ba",
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  //Отправка отредактированных данных пользователя
  setUserInfo(user) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: "c8e88be4-173c-499a-97f5-515e9331d7ba",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: user.name,
        about: user.about,
      }),
    }).then(this._checkResponse);
  }

  //Отправка отредактированного аватара
  setAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: "c8e88be4-173c-499a-97f5-515e9331d7ba",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._checkResponse);
  }

  //Отправка новой созданной карточки на сервер
  setNewCard(card) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        Authorization: "c8e88be4-173c-499a-97f5-515e9331d7ba",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link,
      }),
    }).then(this._checkResponse);
  }

  //Удаление карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: "c8e88be4-173c-499a-97f5-515e9331d7ba",
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  //Установка и снятие лайка
  changeLikeCardStatus(cardId, notLiked) {
    if (notLiked) {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: {
          Authorization: "c8e88be4-173c-499a-97f5-515e9331d7ba",
          "Content-Type": "application/json",
        },
      }).then(this._checkResponse);
    } else {
      return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: {
          Authorization: "c8e88be4-173c-499a-97f5-515e9331d7ba",
          "Content-Type": "application/json",
        },
      }).then(this._checkResponse);
    }
  }

  //Регистрация
  register(password, email) {
    return fetch(`${this.newBaseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    }).then(this._checkResponse);
  }

  //Авторизация
  authorize(password, email) {
    return fetch(`${this.newBaseUrl}/signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password, email }),
    }).then(this._checkResponse);
  }

  //Проверка токена, получение email
  getEmail(token) {
    return fetch(`${this.newBaseUrl}/users/me`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

export const api = new Api();
