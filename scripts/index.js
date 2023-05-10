import { initialCards } from './initialCards.js'
import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import consts from './consts.js'

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
