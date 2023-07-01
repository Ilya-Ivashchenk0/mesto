import { Popup } from './Popup.js'

export class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form_type_delete')
    this._deleteCard = null
  }

  open(deleteCard) {
    super.open()
    this._deleteCard = deleteCard
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._deleteCard()
        .then(() => this.close())
        .catch((error) => console.error(`Error: ${error}`))
    })
  }
}
