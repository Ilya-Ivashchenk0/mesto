import { Popup } from './Popup.js'

export class PopupWithAvatar extends Popup {
  constructor(popupSelector, handlePopupAvatar) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form')
    this._input = this._form.querySelector('.popup__input')
    this._handlePopupAvatar = handlePopupAvatar
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      console.log(this._input.value)
      this._handlePopupAvatar(this._input.value)
      this.close()
    })
  }
}