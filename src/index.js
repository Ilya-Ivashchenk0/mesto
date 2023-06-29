import './index.css'
import consts from './utils/consts.js'
import { Card } from './components/Card.js'
import { FormValidator } from './components/FormValidator.js'
import { Section } from './components/Section.js'
import { PopupWithImage } from './components/PopupWithImage.js'
import { PopupWithForm } from './components/PopupWithForm.js'
import { PopupWithDelete } from './components/PopupWithDelete.js'
import { PopupWithAvatar } from './components/PopupWithAvatar.js'
import { UserInfo } from './components/UserInfo.js'
import { Api } from './components/Api.js'

const api = new Api()
const initialCards = await api.getInitialCards()

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

const popupWithDelete = new PopupWithDelete(consts.popupDeleteSelector)
const popupWithAvatar = new PopupWithAvatar(consts.popupAvatarSelector, handlePopupAvatar)

const userInfo = new UserInfo({
  nameSelector: consts.profileNameSelector,
  jobSelector: consts.profileJobSelector,
  imgSelector: consts.profileImgSelector
})

const userProfileInfo = await api.getUserInfo()
userInfo.setUserInfo({username: userProfileInfo.name, about: userProfileInfo.about})
userInfo.setUserAvatar(userProfileInfo.avatar)

function createCard (enterInfo) {
  const card = new Card(enterInfo, consts.cardTemplate, handleCardClick, handlePopupDelete, addLike, deleteLike)
  const cardElement = card.createCard()
  section.addItem(cardElement)
}

function enterProfileInfo () {
  popupProfile.setInputValues(userInfo.getUserInfo())
  popupProfile.open()
}

function handleProfileFormSubmit (formData) {
  api.setUserInfo(formData)
  userInfo.setUserInfo(formData)
  popupProfile.setInputValues(formData)
}

function handleCardFormSubmit (formData) {
  const enterInfo = {
    name: formData.name,
    link: formData.url
  }
  api.addNewCard(enterInfo)
  createCard(enterInfo)
}

function addLike (id) {
  api.addLike(id)
}

function deleteLike (id) {
  api.deleteLike(id)
}

function handleCardClick (link, name) {
  popupImage.open(link, name)
}

function handlePopupDelete (id, handleCardDelete) {
  popupWithDelete.open()
  popupWithDelete.setEventListeners(handleCardDelete)
  api.deleteCard(id)
}

function handlePopupAvatar (link) {
  api.setUserAvatar(link)
}

consts.buttonOpenPopupProfile.addEventListener('click', () => {
  enterProfileInfo()
})
consts.buttonOpenPopupCard.addEventListener('click', () => {
  popupAdd.open()
  cardFormValidator.resetValidation()
  cardFormValidator.disableSubmitButton()
})
consts.profileAvatar.addEventListener('click', () => {
  popupWithAvatar.open()
  popupWithAvatar.setEventListeners()
})