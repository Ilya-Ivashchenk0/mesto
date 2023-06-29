import env from '../../env'

export class Card {
  constructor(data, templateSelector, handleCardClick, handlePopupDelete, addLike, deleteLike) {
    this._name = data.name
    this._link = data.link
    this._likes = data.likes
    this._ownerId = data.owner ? data.owner._id : null
    this._cardId = data._id
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._handlePopupDelete = handlePopupDelete
    this._addLike = addLike
    this._deleteLike = deleteLike
  }

  _getTemplate() {
    const cardElement = this._templateSelector
      .content
      .querySelector('.element')
      .cloneNode(true)
    return cardElement
  }

  _handleCardDelete() {
    this._element.remove()
  }

  _handleCardLike(id) {
    console.log(this._likeButton.classList)
    if (this._likeButton.classList.contains('element__button_color_black')) {
      this._deleteLike(id)
      this._likesLenth.textContent = Number(this._likesLenth.textContent) - 1
    } else {
      this._addLike(id)
      this._likesLenth.textContent = Number(this._likesLenth.textContent) + 1
    }
    this._likeButton.classList.toggle('element__button_color_black')
  }

  _handleCardImgClick() {
    this._handleCardClick(this._link, this._name)
  }

  _setEventListener() {
    this._likeButton.addEventListener('click', () => {
      this._handleCardLike(this._cardId)
    })

    this._trashButton.addEventListener('click', () => {
      this._handlePopupDelete(this._cardId, () => this._handleCardDelete())
    })

    this._cardImg.addEventListener('click', () => {
      this._handleCardImgClick()
    })
  }

  createCard() {
    this._element = this._getTemplate()
    this._likesLenth = this._element.querySelector('.element__likes-lenth')
    this._cardImg = this._element.querySelector('.element__mask-img')
    this._cardImg.src = this._link
    this._cardImg.alt = this._name
    if(this._likes) {
      this._likesLenth.textContent = this._likes.length
    } else {
      this._likesLenth.textContent = 0
    }
    this._element.querySelector('.element__title').textContent = this._name
    this._likeButton = this._element.querySelector('.element__button')
    this._trashButton = this._element.querySelector('.element__trash')
    const myLike = this._likes ? this._likes.some(like => like._id === env.MY_ID) : false
    if (myLike) {
      this._likeButton.classList.add('element__button_color_black')
    }
    if (env.MY_ID !== this._ownerId) {
      this._trashButton.remove()
    }
    this._setEventListener()
    return this._element
  }
}
