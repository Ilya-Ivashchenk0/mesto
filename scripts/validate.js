const objValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// ** функция для наложения обработчиков на поля формы
function setEventListeners (form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const inputs = form.querySelectorAll(inputSelector)
  const submitButton = form.querySelector(submitButtonSelector)

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, inputErrorClass, errorClass)
      toggleSubmitButtonState(inputs, submitButton, inactiveButtonClass)
    })
  })
}

// ** функция для проверки валидности поля
function checkInputValidity (form, input, inputErrorClass, errorClass) {
  const errorPlace = form.querySelector(`#${input.getAttribute('name')}-error`)
  const isValid = input.validity.valid
  toggleErrorMessages(input, errorPlace, errorClass, isValid)
  toggleInputErrorClass(input, inputErrorClass, isValid)
}

// ** функция для включения/выключения класса с ошибкой для поля ввода
function toggleInputErrorClass (input, inputErrorClass, isValid) {
  if (isValid) {
    input.classList.remove(inputErrorClass)
  } else {
    input.classList.add(inputErrorClass)
  }
}

// ** функция для включения/выключения сообщений об ошибках
function toggleErrorMessages (input, errorPlace, errorClass, isValid) {
  if (isValid) {
    errorPlace.textContent = ''
    errorPlace.classList.remove(errorClass)
  } else {
    if (input.getAttribute('type') == 'text') {
      errorPlace.textContent = 'Вы пропустили это поле.'
    } else {
      errorPlace.textContent = 'Введите адрес сайта.'
    }
    errorPlace.classList.add(errorClass)
  }
}

// ** функция для включения/выключения кнопки отправки формы
function toggleSubmitButtonState (inputs, submitButton, inactiveButtonClass) {
  const isEveryInputValid = Array.from(inputs).every(input => input.validity.valid)
  toggleButtonState(submitButton, isEveryInputValid, inactiveButtonClass)
}

// ** функция для включения/выключения кнопки отправки формы
function toggleButtonState (button, isEveryInputValid, inactiveButtonClass) {
  if (isEveryInputValid) {
    button.disabled = false
    button.classList.remove(inactiveButtonClass)
  } else {
    button.disabled = true
    button.classList.add(inactiveButtonClass)
  }
}

// ** функция для включения валидации на форме
function enableValidation ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
  const forms = document.querySelectorAll(formSelector)
  forms.forEach(form => {
    form.addEventListener('submit', evt => evt.preventDefault())
    setEventListeners(form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass)
  })
}

function setInitialValidationState (form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass) {
  const inputs = form.querySelectorAll(inputSelector)
  const submitButton = form.querySelector(submitButtonSelector)

  inputs.forEach(input => {
    checkInputValidity(form, input, inputErrorClass)
  })

  toggleSubmitButtonState(inputs, submitButton, inactiveButtonClass)
}

enableValidation(objValidate)






































// const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
//   // *тут код переключения состояния кнопки*
//   if (hasInvalidInput(inputList)) {
//     disableSubmitButton(buttonElement, inactiveButtonClass);
//   } else {
//     enableSubmitButton(buttonElement, inactiveButtonClass);
//   }
// }

// function actionHandlersFields (form) {
//   const inputs = form.querySelectorAll(inputSelector)

//   inputs.forEach(input => {
//     const buttonElement = input.querySelector(submitButtonSelector)
//     input.addEventListener('input', evt => {
//       toggleButtonState(inputList, buttonElement, inactiveButtonClass)
//     })
//   })
// }

// function actionValidationProcess (formSelector) {
//   const forms = document.querySelectorAll(formSelector)
//   forms.forEach(form => {
//     form.addEventListener('submit', evt => evt.preventDefault())
//     actionHandlersFields(form)
//   })
// }







// function enableValidation ({ formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
//   actionValidationProcess(formSelector)
// }

// enableValidation(objValidate)