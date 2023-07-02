import '../pages/index.css'
import consts from '../utils/consts.js'
import { dots } from '../utils/dots.js'
import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { PopupWithDelete } from '../components/PopupWithDelete.js'
import { UserInfo } from '../components/UserInfo.js'
import { Api } from '../components/Api.js'

const userData = {}

// инициализация класса апи
const api = new Api({baseUrl: consts.baseUrl, headers: consts.headers})

// валидация форм
const profileFormValidator = new FormValidator(consts.objValidate, consts.popupProfileForm)
profileFormValidator.enableValidation()
const cardFormValidator = new FormValidator(consts.objValidate, consts.popupCardForm)
cardFormValidator.enableValidation()

// информация о пользователе
const userInfo = new UserInfo({
  nameSelector: consts.profileNameSelector,
  jobSelector: consts.profileJobSelector,
  imgSelector: consts.profileImgSelector
})

// загрузка карточек
const section = new Section({
  items: [],
  renderer: (data) => {
    createCard(data)
  }
}, consts.cardsContainer)

Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
])
  .then(([data, cards]) => {
    userInfo.setUserInfo({ username: data.name, about: data.about })
    userInfo.setUserAvatar(data.avatar)
    Object.assign(userData, data)

    section.rendererItems(cards)
  })
  .catch(err => console.log(`Ошибка: ${err}`))

// попап картинки карточки
const popupImage = new PopupWithImage(consts.popupImgSelector)
popupImage.setEventListeners()
function handleCardClick (link, name) {
  popupImage.open(link, name)
}

// попап добавления новой карточки
const popupAdd = new PopupWithForm(consts.popupCardSelector, handleCardFormSubmit)
popupAdd.setEventListeners()
consts.buttonOpenPopupCard.addEventListener('click', () => {
  popupAdd.open()
  cardFormValidator.resetValidation()
  cardFormValidator.disableSubmitButton()
})
function handleCardFormSubmit (formData) {
  const enterInfo = {
    name: formData.name,
    link: formData.url,
    likes: [],
    owner: {
      _id: userData._id
    }
  }
  const animation = dots(consts.buttonSavePopup)
  animation.start()
  api.addNewCard(enterInfo)
    .then((response) => {
      popupAdd.close()
      createCard(response)
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      animation.stop()
    })
}

// попап редактирования информации профиля
const popupProfile = new PopupWithForm(consts.popupProfileContainer, handleProfileFormSubmit)
popupProfile.setEventListeners()
function enterProfileInfo () {
  popupProfile.setInputValues(userInfo.getUserInfo())
  popupProfile.open()
}
consts.buttonOpenPopupProfile.addEventListener('click', () => {
  enterProfileInfo()
})
function handleProfileFormSubmit (formData) {
  const animation = dots(consts.buttonSavePopupProfile)
  animation.start()
  api.setUserInfo(formData)
    .then(() => {
      popupProfile.close()
      userInfo.setUserInfo(formData)
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      animation.stop()
    })
}

// изменение аватара пользователя
const popupWithAvatar = new PopupWithForm(consts.popupAvatarSelector, handlePopupAvatar)
function handlePopupAvatar (link) {
  const animation = dots(consts.buttonSavePopupAvatar)
  animation.start()
  api.setUserAvatar(link.url)
    .then(() => {
      userInfo.setUserAvatar(link.url)
      popupWithAvatar.close()
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      animation.stop()
    })
}
consts.profileAvatarButton.addEventListener('click', () => {
  popupWithAvatar.open()
  popupWithAvatar.setEventListeners()
})

function createCard (enterInfo) {
  const card = new Card(enterInfo, userData._id, consts.cardTemplate, handleCardClick, handlePopupDelete, addLike, deleteLike)
  const cardElement = card.createCard()
  section.addItem(cardElement)
}

// попап удаления карточки
const popupWithDelete = new PopupWithDelete(consts.popupDeleteSelector)
popupWithDelete.setEventListeners()
function handlePopupDelete(id, handleCardDelete) {
  popupWithDelete.open(() => {
    return api.deleteCard(id)
      .then(() => {
        handleCardDelete()
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  })
}

function addLike (id) {
  return api.addLike(id)
}

function deleteLike (id) {
  return api.deleteLike(id)
}
