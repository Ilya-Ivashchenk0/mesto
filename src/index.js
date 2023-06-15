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
import { Section } from './scripts/Section.js'
import { Popup } from './scripts/Popup.js'
import { PopupWithImage } from './scripts/PopupWithImage.js'
import { PopupWithForm } from './scripts/PopupWithForm.js'
import consts from './scripts/consts.js'

const section = new Section({
  items: initialCards,
  renderer: (data) => {
    const card = new Card(data, consts.cardTemplate, handleCardClick)
    return card.createCard()
  }
}, consts.cardsContainer)
section.rendererItems()

const profileFormValidator = new FormValidator(consts.objValidate, consts.popupProfileForm) // валидация попапа профиля
profileFormValidator.enableValidation()

const cardFormValidator = new FormValidator(consts.objValidate, consts.popupCardForm) // валидация попапа добавления арточек
cardFormValidator.enableValidation()

const popupWithImage = new PopupWithImage(consts.popupImgSelector)

const popupWithForm = new PopupWithForm(consts.popupCardSelector, (evt) => {
  evt.preventDefault()

})

function enterProfileInfo () {
  consts.formNameInput.value = consts.profileName.textContent
  consts.formJobInput.value = consts.profileJob.textContent
  popup.open(consts.popupProfileContainer)
}

function handleProfileFormSubmit (evt) {
  evt.preventDefault()
  consts.profileName.textContent = consts.formNameInput.value
  consts.profileJob.textContent = consts.formJobInput.value
  closePopup(consts.popupProfileContainer)
}

function handleCardFormSubmit() {
  evt.preventDefault()
  const enterInfo = {
    name: consts.cardNameInput.value,
    link: consts.cardUrlInput.value,
  }
  const cardElement = section.renderer(enterInfo)
  section.addItem(cardElement)
  closePopup(consts.popupCardContainer)
  evt.target.reset()
}

function handleCardClick(link, name) {
  popupWithImage.open(link, name)
}

consts.buttonOpenPopupProfile.addEventListener('click', enterProfileInfo)
consts.buttonClosePopupProfile.addEventListener('click', function() {closePopup(consts.popupProfileContainer)})
consts.buttonOpenPopupCard.addEventListener('click', function() {
  popupWithForm.open()
  cardFormValidator.resetValidation()
  cardFormValidator.disableSubmitButton()
})
consts.buttonClosePopupCard.addEventListener('click', () => {
  popupWithForm.close()
})
consts.buttonClosePopupImg.addEventListener('click', () => {
  popupWithImage.close()
})
consts.popupProfileForm.addEventListener('submit', handleProfileFormSubmit)
consts.popupCardForm.addEventListener('submit', handleCardFormSubmit)