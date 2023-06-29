import env from '../../env'

export class Api {
  constructor(options) {

  }

  getInitialCards() {
    return fetch(`https://mesto.nomoreparties.co/v1/${env.GROUP_ID}/cards`, {
      method: 'GET',
      headers: {
        authorization: env.TOKEN
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .catch((err) => {
        console.log(err) // выведем ошибку в консоль
      })
  }

  getUserInfo() {
    return fetch(`https://nomoreparties.co/v1/${env.GROUP_ID}/users/me`, {
      method: 'GET',
      headers: {
        authorization: env.TOKEN
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .catch((err) => {
        console.log(err) // выведем ошибку в консоль
      })
  }

  setUserInfo(data) {
    return fetch(`https://nomoreparties.co/v1/${env.GROUP_ID}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: env.TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.username,
        about: data.about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .catch((err) => {
        console.log(err) // выведем ошибку в консоль
      })
  }

  addNewCard(data) {
    return fetch(`https://nomoreparties.co/v1/${env.GROUP_ID}/cards`, {
      method: 'POST',
      headers: {
        authorization: env.TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .catch((err) => {
        console.log(err) // выведем ошибку в консоль
      })
  }

  deleteCard(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/${env.GROUP_ID}/cards/${data}`, {
      method: 'DELETE',
      headers: {
        authorization: env.TOKEN
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .catch((err) => {
        console.log(err) // выведем ошибку в консоль
      })
  }

  addLike(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/${env.GROUP_ID}/cards/${data}/likes`, {
      method: 'PUT',
      headers: {
        authorization: env.TOKEN
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .catch((err) => {
        console.log(err) // выведем ошибку в консоль
      })
  }



  deleteLike(data) {
    return fetch(`https://mesto.nomoreparties.co/v1/${env.GROUP_ID}/cards/${data}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: env.TOKEN
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .catch((err) => {
        console.log(err) // выведем ошибку в консоль
      })
  }

  setUserAvatar(link) {
    return fetch(`https://mesto.nomoreparties.co/v1/${env.GROUP_ID}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: env.TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`)
      })
      .catch((err) => {
        console.log(err) // выведем ошибку в консоль
      })
  }
}