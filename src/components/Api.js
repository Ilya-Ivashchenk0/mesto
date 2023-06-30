export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
      .then(this._getResponseData)
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { method: 'GET', headers: this._headers })
      .then(this._getResponseData)
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.username,
        about: data.about
      })
    })
      .then(this._getResponseData)
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
        likes: []
      })
    })
    .then(this._getResponseData)
  }

  deleteCard(data) {
    return fetch(`${this._baseUrl}/cards/${data}`, { method: 'DELETE', headers: this._headers })
      .then(this._getResponseData)
  }

  addLike(data) {
    return fetch(`${this._baseUrl}/cards/${data}/likes`, { method: 'PUT', headers: this._headers })
      .then(this._getResponseData)
  }

  deleteLike(data) {
    return fetch(`${this._baseUrl}/cards/${data}/likes`, { method: 'DELETE', headers: this._headers })
      .then(this._getResponseData)
  }

  setUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._getResponseData)
  }
}