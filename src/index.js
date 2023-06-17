import './index.css'
import consts from './utils/consts.js'
import { initialCards } from './utils/initialCards.js'
import { Card } from './components/Card.js'
import { FormValidator } from './components/FormValidator.js'
import { Section } from './components/Section.js'
import { PopupWithImage } from './components/PopupWithImage.js'
import { PopupWithForm } from './components/PopupWithForm.js'
import { UserInfo } from './components/UserInfo.js'

const section = new Section({
  items: initialCards,
  renderer: (data) => {
    createCard(data)
  }
}, consts.cardsContainer)
section.rendererItems()

const profileFormValidator = new FormValidator(consts.objValidate, consts.popupProfileForm)
profileFormValidator.enableValidation()

const cardFormValidator = new FormValidator(consts.objValidate, consts.popupCardForm)
cardFormValidator.enableValidation()

const popupImage = new PopupWithImage(consts.popupImgSelector)
popupImage.setEventListeners()

const popupAdd = new PopupWithForm(consts.popupCardSelector, handleCardFormSubmit)
popupAdd.setEventListeners()

const popupProfile = new PopupWithForm(consts.popupProfileContainer, handleProfileFormSubmit)
popupProfile.setEventListeners()

const userInfo = new UserInfo({
  nameSelector: consts.profileNameSelector,
  jobSelector: consts.profileJobSelector
})

function createCard (enterInfo) {
  const card = new Card(enterInfo, consts.cardTemplate, handleCardClick)
  const cardElement = card.createCard()
  section.addItem(cardElement)
}

function enterProfileInfo () {
  popupProfile.setInputValues(userInfo.getUserInfo())
  popupProfile.open()
}

function handleProfileFormSubmit (formData) {
  userInfo.setUserInfo(formData)
  popupProfile.setInputValues(formData)
}

function handleCardFormSubmit(formData) {
  const enterInfo = {
    name: formData.name,
    link: formData.url
  }
  createCard(enterInfo)
}

function handleCardClick(link, name) {
  popupImage.open(link, name)
}

consts.buttonOpenPopupProfile.addEventListener('click', () => {
  enterProfileInfo()
})
consts.buttonOpenPopupCard.addEventListener('click', () => {
  popupAdd.open()
  cardFormValidator.resetValidation()
  cardFormValidator.disableSubmitButton()
})