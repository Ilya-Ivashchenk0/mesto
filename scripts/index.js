import { initialCards } from './initialCards.js';
import { Card } from './Card.js'


//кнопки открытия и закрытия попапов
const buttonOpenPopupProfile = document.getElementById('open_edit_popup_button')
const buttonClosePopupProfile = document.getElementById('button_close_popup_profile')
const buttonOpenPopupCard = document.getElementById('button_open_popup_card')
const buttonClosePopupCard = document.getElementById('button_close_popup_card')
const buttonClosePopupImg = document.getElementById('button_close_popup_img')
const overlayClosePopupImg = document.getElementById('button_close_popup_img')
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
const cardTemplate = document.querySelector('#template')
const cardsContainer = document.querySelector('.elements')
const imgPlace = document.querySelector('.popup__img')
const imgTitle = document.querySelector('.popup__img-title')
const popups = document.querySelectorAll('.popup')
const buttonSavePopup = document.getElementById('save_popup-card')

function openPopup (data) {
  data.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape)
}

function closePopup (data) {
  data.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape)
}

function enterProfileInfo () {
  const profileTitleValue = profileName.textContent
  const profileSubtitleValue = profileJob.textContent
  formNameInput.value = `${profileTitleValue}`
  formJobInput.value = `${profileSubtitleValue}`
  openPopup(popupProfileContainer)
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit (evt) {
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

const renderCard = (data) => {
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(data)
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const enterInfo = {
    name: `${cardNameInput.value}`,
    link: `${cardUrlInput.value}`,
  };
  const card = new Card(enterInfo, "#template", handleCardClick);
  const cardElement = card.createCard();
  renderCard(cardElement);
  closePopup(popupCardContainer);
  evt.target.reset();
}

// закрытие попапов при нажатии на esc
function closeByEscape (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

function handleCardClick(link, name) {
  imgPlace.src = link
  imgPlace.alt = name
  imgTitle.textContent = name
  openPopup(popupImgContainer)
}

initialCards.forEach((item) => {
  const card = new Card(item, cardTemplate, handleCardClick)
  const cardElement = card.createCard()
  renderCard(cardElement)
})



//кнопки попапа профиля
buttonOpenPopupProfile.addEventListener('click', enterProfileInfo)
buttonClosePopupProfile.addEventListener('click', function() {closePopup(popupProfileContainer)})
//кнопки попапа карточек
buttonOpenPopupCard.addEventListener('click', function() {
  openPopup(popupCardContainer)
  buttonSavePopup.setAttribute('disabled', 'disabled')
  buttonSavePopup.classList.add('popup__save-button_disabled')
})

buttonClosePopupCard.addEventListener('click', function() {closePopup(popupCardContainer)})
//кнопки попапа картинки
buttonClosePopupImg.addEventListener('click', function() {closePopup(popupImgContainer)})
//кнопки форм
popupProfileForm.addEventListener('submit', handleProfileFormSubmit)
popupCardForm.addEventListener('submit', handleCardFormSubmit)
// закрытие попапов при нажатии на оверлей
popups.forEach(popup => {
  popup.addEventListener('click', event => {
    if (event.target === popup) {
      closePopup(popup)
    }
  })
})