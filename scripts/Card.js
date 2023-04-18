export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name
    this._link = data.link
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
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

  _handleCardLike() {
    this._likeButton.classList.toggle('element__button_color_black')
  }

  _handleCardImgClick() {
    this._handleCardClick(this._link, this._name)
  }


  _setEventListener() {
    this._likeButton.addEventListener('click', () => {
      this._handleCardLike()
    })

    this._trashButton.addEventListener('click', () => {
      this._handleCardDelete()
    })

    this._cardImg.addEventListener('click', () => {
      this._handleCardImgClick()
    })
  }

  createCard() {
    this._element = this._getTemplate()
    this._cardImg = this._element.querySelector('.element__mask-img')
    this._cardImg.src = this._link
    this._cardImg.alt = this._name
    this._element.querySelector('.element__title').textContent = this._name
    this._likeButton = this._element.querySelector('.element__button')
    this._trashButton = this._element.querySelector('.element__trash')

    this._setEventListener()

    return this._element
  }
}
