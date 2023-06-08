export class FormValidator {
  constructor (objValidate, formElement) {
    this._formSelector = objValidate.formSelector
    this._inputSelector = objValidate.inputSelector
    this._submitButtonSelector = objValidate.submitButtonSelector
    this._inactiveButtonClass = objValidate.inactiveButtonClass
    this._inputErrorClass = objValidate.inputErrorClass
    this._errorClass = objValidate.errorClass
    this._form = formElement
  }

  _setEventListeners() {
    this._inputs = this._form.querySelectorAll(this._inputSelector)
    this._submitButton = this._form.querySelector(this._submitButtonSelector)

    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input)
        this._toggleSubmitButtonState()
      })
    })
  }

  _checkInputValidity (input) {
    this._errorPlace = this._form.querySelector(`#${input.getAttribute('name')}-error`)
    this._isValid = input.validity.valid
    this._toggleErrorMessages(input)
    this._toggleInputErrorClass(input)
  }

  _toggleInputErrorClass (input) {
    if (this._isValid) {
      input.classList.remove(this._inputErrorClass)
    } else {
      input.classList.add(this._inputErrorClass)
    }
  }

  _toggleErrorMessages (input) {
    if (this._isValid) {
      this._errorPlace.textContent = ''
      this._errorPlace.classList.remove(this._errorClass)
    } else {
      this._errorPlace.textContent = input.validationMessage
      this._errorPlace.classList.add(this._errorClass)
    }
  }

  _toggleSubmitButtonState () {
    this._isEveryInputValid = Array.from(this._inputs).every(input => input.validity.valid)
    this._toggleButtonState()
  }

  _enableSubmitButton () {
    this._submitButton.disabled = false
    this._submitButton.classList.remove(this._inactiveButtonClass)
  }

  disableSubmitButton () {
    this._submitButton.disabled = true
    this._submitButton.classList.add(this._inactiveButtonClass)
  }

  _toggleButtonState() {
    if (!this._submitButton) {
      return
    }
    if (this._isEveryInputValid) {
      this._enableSubmitButton()
    } else {
      this.disableSubmitButton()
    }
  }

  resetValidation() {
    this._inputs.forEach(inputElement => {
      this._errorPlace = this._form.querySelector(`#${inputElement.getAttribute('name')}-error`)
      inputElement.classList.remove(this._inputErrorClass)
      this._errorPlace.textContent = ''
      this._errorPlace.classList.remove(this._errorClass)
    })
  }

  enableValidation() {
    this._form.addEventListener('submit', evt => {
      evt.preventDefault()
    })
    this._setEventListeners()
    this._form.addEventListener('reset', () => {
      this._toggleButtonState()
    })
  }
}