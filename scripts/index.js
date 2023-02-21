let openPopup = document.getElementById('open_popup')
let closePopup = document.getElementById('close_popup')
let popupContainer = document.querySelector('.popup')

let profileName = document.querySelector('.profile__title')
let profileAbout = document.querySelector('.profile__subtitle')

function popupOpen () {
  popupContainer.style.display = 'flex'
  let profileTitleValue = profileName.textContent
  let profileSubtitleValue = profileAbout.textContent
  document.getElementById('username-input').value = `${profileTitleValue}`
  document.getElementById('job-input').value = `${profileSubtitleValue}`
}

openPopup.addEventListener('click', popupOpen)

function popupClose () {
  popupContainer.style.display = 'none'
}

closePopup.addEventListener('click', popupClose)



// Находим форму в DOM
let formElement = document.querySelector('.popup')
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_name')
let jobInput = document.querySelector('.popup__input_job')

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault()// Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  let nameValue = nameInput.value
  let jobValue = jobInput.value
  // Выберите элементы, куда должны быть вставлены значения полей
  let inputName = document.getElementById('profile-title')
  let inputJob = document.getElementById('profile-subtitle')
  // Вставьте новые значения с помощью textContent
  inputName.textContent = `${nameValue}`
  inputJob.textContent = `${jobValue}`
  popupClose()
}

formElement.addEventListener('submit', handleFormSubmit)