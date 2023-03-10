//кнопки открытия и закрытия попапов
const buttonOpenPopupProfile = document.getElementById('open_edit_popup_button')
const buttonClosePopupProfile = document.getElementById('button_close_popup_profile')
const buttonOpenPopupCard = document.getElementById('button_open_popup_card')
const buttonClosePopupCard = document.getElementById('button_close_popup_card')
const buttonClosePopupImg = document.getElementById('button_close_popup_img')
//контейнеры попапов
const popupProfileContainer = document.querySelector('.popup_type_profile')
const popupCardContainer = document.querySelector('.popup_type_card')
const popupImgContainer = document.querySelector('.popup_type_img')
// Находим форму в DOM
const popupProfileForm = document.querySelector('.popup__form_place_profile')
const popupCardForm = document.querySelector('.popup__form_place_card')
// Находим поля форм в DOM
const formNameInput = document.querySelector('.popup__input_field_name')
const formJobInput = document.querySelector('.popup__input_field_job')
const cardNameInput = document.querySelector('.popup__input_field_designation')
const cardUrlInput = document.querySelector('.popup__input_field_url')
// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__title')
const profileJob = document.querySelector('.profile__subtitle')
const cardTemplate = document.querySelector('#template').content
const cardsContainer = document.querySelector('.elements')

let imgInfo

function openPopup (data) {
  if (data == popupProfileContainer) {
    data.classList.add('popup_opened')
    const profileTitleValue = profileName.textContent
    const profileSubtitleValue = profileJob.textContent
    formNameInput.value = `${profileTitleValue}`
    formJobInput.value = `${profileSubtitleValue}`
  } else if (data == imgInfo) {
    popupImgContainer.classList.add('popup__place_img')
    const imgPlace = popupImgContainer.querySelector('.popup__img')
    popupImgContainer.classList.add('popup_opened')
    imgPlace.setAttribute('src', data.src)
    imgPlace.setAttribute('alt', data.alt)
    popupImgContainer.querySelector('.popup__title_place_img').textContent = data.title
  } else {
    data.classList.add('popup_opened')
  }
}

function closePopup (data) {
  data.classList.remove('popup_opened')
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault()// Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value
  const nameValue = formNameInput.value
  const jobValue = formJobInput.value
  // Вставьте новые значения с помощью textContent
  profileName.textContent = `${nameValue}`
  profileJob.textContent = `${jobValue}`
  closePopup(popupProfileContainer)
}

const createCard = (data) => {
  // Клонируем шаблон, наполняем его информацией из объекта data, навешиваем всякие обработчики событий, о которых будет инфа ниже
  const cardCopy = cardTemplate.cloneNode(true)
  cardCopy.querySelector('.element__title').textContent = data.name
  cardCopy.querySelector('.element__mask-img').src = data.link
  const trashButton = cardCopy.querySelector('.element__trash')
  trashButton.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove()
  })
  const likesButton = cardCopy.querySelector('.element__button')
  likesButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_color_black')
  })
  const cardCopyImg = cardCopy.querySelector('.element__mask-img')
  cardCopyImg.addEventListener('click', function (evt) {
    const thisCardImg = evt.target.closest('.element__mask-img')
    imgInfo = {
      src: thisCardImg.getAttribute('src'),
      alt: thisCardImg.getAttribute('alt'),
      title: evt.target.closest('.element').querySelector('.element__title').textContent
    }
    openPopup(imgInfo)
  })
  // Возвращаем получившуюся карточку
  return cardCopy
}

const renderCard = (data) => {
  // Создаем карточку на основе данных
  const cardElement = createCard(data)
  // Вешаем событие
  const cardElemntPlace = cardElement.querySelector('.element__trash')
  cardElemntPlace.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove()
  })
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement)
}

function handleCardFormSubmit (evt) {
  evt.preventDefault()
  const enterInfo = {
    name: `${cardNameInput.value}`,
    link: `${cardUrlInput.value}`
  }
  renderCard(enterInfo)
  closePopup(popupCardContainer)
}

initialCards.forEach(card => { renderCard(card) })

//кнопки попапа профиля
buttonOpenPopupProfile.addEventListener('click', function() {openPopup(popupProfileContainer)})
buttonClosePopupProfile.addEventListener('click', function() {closePopup(popupProfileContainer)})
//кнопки попапа карточек
buttonOpenPopupCard.addEventListener('click', function() {openPopup(popupCardContainer)})
buttonClosePopupCard.addEventListener('click', function() {closePopup(popupCardContainer)})
//кнопки попапа картинки
buttonClosePopupImg.addEventListener('click', function() {openPopup(popupImgContainer)})
buttonClosePopupImg.addEventListener('click', function() {closePopup(popupImgContainer)})
//кнопки форм
popupProfileForm.addEventListener('submit', handleFormSubmit)
popupCardForm.addEventListener('submit', handleCardFormSubmit)