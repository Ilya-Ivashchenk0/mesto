import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, ) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form_place_card')
  }

  _getInputValues() {
    this._inputTitle = this._form.querySelector('.popup__input_field_designation')
    this._inputUrl = this._form.querySelector('.popup__input_field_url')
    const enterInfo = {
      title: this._inputTitle.value,
      link: this._inputUrl.value
    }
    return enterInfo
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._formSubmitHandler(this._getInputValues())
    })
  }

  close() {
    super.close()
    this._form.reset()
  }
}
