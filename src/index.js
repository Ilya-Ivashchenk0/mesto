import './index.css'

// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
const add = new URL('./images/add.svg', import.meta.url)
const black_heart = new URL('./images/black_heart.svg', import.meta.url)
const close = new URL('./images/close.svg', import.meta.url)
const EditButton = new URL('./images/EditButton.svg', import.meta.url)
const heart = new URL('./images/heart.svg', import.meta.url)
const logo_black = new URL('./images/logo_black.svg', import.meta.url)
const logo = new URL('./images/logo.svg', import.meta.url)
const sticker = new URL('./images/sticker.webp', import.meta.url)
const trash = new URL('./images/trash.svg', import.meta.url)

const imgs = [
  // меняем исходные пути на переменные
  { name: 'add', link: add },
  { name: 'black_heart', link: black_heart },
  { name: 'close', link: close },
  { name: 'EditButton', link: EditButton },
  { name: 'heart', link: heart },
  { name: 'logo_black', link: logo_black },
  { name: 'logo', link: logo },
  { name: 'sticker', link: sticker },
  { name: 'trash', link: trash }
]

import { initialCards } from './scripts/initialCards.js'
import { Card } from './scripts/Card.js'
import { FormValidator } from './scripts/FormValidator.js'
import consts from './scripts/consts.js'

function createCard(data) {
  const card = new Card(data, consts.cardTemplate, handleCardClick)
  return card.createCard()
}

const profileFormValidator = new FormValidator(consts.objValidate, consts.popupProfileForm)
profileFormValidator.enableValidation()

const cardFormValidator = new FormValidator(consts.objValidate, consts.popupCardForm)
cardFormValidator.enableValidation()

function openPopup (data) {
  data.classList.add('popup_opened')
  document.addEventListener('keydown', closeByEscape)
}

function closePopup (data) {
  data.classList.remove('popup_opened')
  document.removeEventListener('keydown', closeByEscape)
}

function enterProfileInfo () {
  consts.formNameInput.value = consts.profileName.textContent
  consts.formJobInput.value = consts.profileJob.textContent
  openPopup(consts.popupProfileContainer)
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault()
  consts.profileName.textContent = consts.formNameInput.value
  consts.profileJob.textContent = consts.formJobInput.value
  closePopup(consts.popupProfileContainer)
}

const renderCard = (data) => {
  consts.cardsContainer.prepend(data)
}

function handleCardFormSubmit(evt) {
  evt.preventDefault()
  const enterInfo = {
    name: consts.cardNameInput.value,
    link: consts.cardUrlInput.value,
  }
  const cardElement = createCard(enterInfo)
  renderCard(cardElement)
  closePopup(consts.popupCardContainer)
  evt.target.reset()
}

function closeByEscape (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

function handleCardClick(link, name) {
  consts.imgPlace.src = link
  consts.imgPlace.alt = name
  consts.imgTitle.textContent = name
  openPopup(consts.popupImgContainer)
}

initialCards.forEach((item) => {
  const cardElement = createCard(item)
  renderCard(cardElement)
})

consts.buttonOpenPopupProfile.addEventListener('click', enterProfileInfo)
consts.buttonClosePopupProfile.addEventListener('click', function() {closePopup(consts.popupProfileContainer)})
consts.buttonOpenPopupCard.addEventListener('click', function() {
  openPopup(consts.popupCardContainer)
  cardFormValidator.resetValidation()
  cardFormValidator.disableSubmitButton()
})
consts.buttonClosePopupCard.addEventListener('click', function() {closePopup(consts.popupCardContainer)})
consts.buttonClosePopupImg.addEventListener('click', function() {closePopup(consts.popupImgContainer)})
consts.popupProfileForm.addEventListener('submit', handleProfileFormSubmit)
consts.popupCardForm.addEventListener('submit', handleCardFormSubmit)
consts.popups.forEach(popup => {
  popup.addEventListener('click', event => {
    if (event.target === popup) {
      closePopup(popup)
    }
  })
})
