import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector)
    this._form = this._popup.querySelector('.popup__form')
    this._inputList = this._form.querySelectorAll('.popup__input')
    this._formSubmitHandler = formSubmitHandler
  }

  _getInputValues() {
    const inputValues = {}
    this._inputList.forEach(input => inputValues[input.name] = input.value)
    return inputValues
  }

  setInputValues(inputValues) {
    this._inputList.forEach(input => input.value = inputValues[input.name])
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