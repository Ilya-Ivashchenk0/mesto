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
api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo({ username: data.name, about: data.about })
    userInfo.setUserAvatar(data.avatar)
    Object.assign(userData, data)
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
console.log(userData)
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
  api.addNewCard(enterInfo)
    .then(() => {
      animation.start()
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      setTimeout(() => {
        popupAdd.close()
        animation.stop()
        createCard(enterInfo)
      }, 1000)
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
  api.setUserInfo(formData)
    .then(() => {
      animation.start()
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      setTimeout(() => {
        popupProfile.close()
        animation.stop()
        userInfo.setUserInfo(formData)
      }, 1000)
    })
}

// изменение аватара пользователя
const popupWithAvatar = new PopupWithForm(consts.popupAvatarSelector, handlePopupAvatar)
function handlePopupAvatar (link) {
  const animation = dots(consts.buttonSavePopupAvatar)
  api.setUserAvatar(link.url)
    .then(() => {
      animation.start()
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      setTimeout(() => {
        userInfo.setUserAvatar(link.url)
        popupWithAvatar.close()
        animation.stop()
      }, 1000)
    })
}
consts.profileAvatarButton.addEventListener('click', () => {
  popupWithAvatar.open()
  popupWithAvatar.setEventListeners()
})

// загрузка карточек
const section = new Section({
  items: [],
  renderer: (data) => {
    createCard(data)
  }
}, consts.cardsContainer)

api.getInitialCards()
  .then((cards) => {
    section.rendererItems(cards)
  })
  .catch(err => console.log(`Ошибка: ${err}`))

function createCard (enterInfo) {
  const card = new Card(enterInfo, userData._id, consts.cardTemplate, handleCardClick, handlePopupDelete, addLike, deleteLike)
  const cardElement = card.createCard()
  section.addItem(cardElement)
}

// попап удаления карточки
const popupWithDelete = new PopupWithDelete(consts.popupDeleteSelector)
function handlePopupDelete (id, handleCardDelete) {
  popupWithDelete.open()
  popupWithDelete.setEventListeners()
  consts.buttonDeletePopupCard.addEventListener('click', () => {
    api.deleteCard(id)
      .catch(err => console.log(`Ошибка: ${err}`))
      .finally(() => {
        handleCardDelete()
        popupWithDelete.close()
      })
  })
}

function addLike (id, likesLenth, likeButton) {
  api.addLike(id)
    .then((data) => {
      this._likes = data.likes
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      likesLenth.textContent = Number(this._likesLenth.textContent) + 1
      likeButton.classList.toggle('element__button_color_black')
    })
}

function deleteLike (id, likesLenth, likeButton) {
  api.deleteLike(id)
    .then((data) => {
      this._likes = data.likesА
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => {
      likesLenth.textContent = Number(this._likesLenth.textContent) - 1
      likeButton.classList.toggle('element__button_color_black')
    })
}