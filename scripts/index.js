let openPopup = document.getElementById('open_popup')
let closePopup = document.getElementById('close_popup')
let popupContainer = document.querySelector('.popup')
// Находим форму в DOM
let formElement = document.querySelector('.popup__form')
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_field_name')
let jobInput = document.querySelector('.popup__input_field_job')
// Выберите элементы, куда должны быть вставлены значения полей
let profileName = document.querySelector('.profile__title')
let profileAbout = document.querySelector('.profile__subtitle')

function popupOpen () {
  popupContainer.classList.add('popup_opened')
  let profileTitleValue = profileName.textContent
  let profileSubtitleValue = profileAbout.textContent
  nameInput.value = `${profileTitleValue}`
  jobInput.value = `${profileSubtitleValue}`
}

function popupClose () {
  popupContainer.classList.remove('popup_opened')
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault()// Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value
  let nameValue = nameInput.value
  let jobValue = jobInput.value
  // Вставьте новые значения с помощью textContent
  profileName.textContent = `${nameValue}`
  profileAbout.textContent = `${jobValue}`
  popupClose()
}

closePopup.addEventListener('click', popupClose)
openPopup.addEventListener('click', popupOpen)
formElement.addEventListener('submit', handleFormSubmit)