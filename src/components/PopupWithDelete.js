import { Popup } from './Popup.js'

export class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popup = document.querySelector(popupSelector)
    this._deleteButton = this._popup.querySelector('#delete_popup-card')
  }

  setEventListeners(handleCardDelete) {
    super.setEventListeners()
    this._deleteButton.addEventListener('click', () => {
      handleCardDelete()
      this.close()
    })
  }
}