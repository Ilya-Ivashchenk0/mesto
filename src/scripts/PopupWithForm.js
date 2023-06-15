import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form_place_card')
    this._formSubmitHandler = formSubmitHandler
  }

  _getInputValues() {
    const inputValues = {}
    this._form.querySelectorAll('.popup__input').forEach(input => inputValues[input.name] = input.value)
    return inputValues
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._formSubmitHandler(this._getInputValues())
    })
  }

  close() {
    this._form.reset()
    super.close()
  }
}