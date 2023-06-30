import env from '../../env'

const consts = {
  buttonOpenPopupProfile: document.getElementById('open_edit_popup_button'),
  buttonClosePopupProfile: document.getElementById('button_close_popup_profile'),
  buttonOpenPopupCard: document.getElementById('button_open_popup_card'),
  buttonClosePopupCard: document.getElementById('button_close_popup_card'),
  buttonClosePopupImg: document.getElementById('button_close_popup_img'),
  buttonSavePopupProfile: document.querySelector('.popup__save-button'),
  buttonSavePopupAvatar: document.querySelector('#save_popup-avatar'),
  buttonDeletePopupCard: document.querySelector('#delete_popup-delete'),
  popupProfileContainer: '.popup_type_profile',
  popupCardContainer: document.querySelector('.popup_type_card'),
  popupImgContainer: document.querySelector('.popup_type_img'),
  popupProfileForm: document.querySelector('.popup__form_place_profile'),
  popupCardForm: document.querySelector('.popup__form_place_card'),
  popupImgSelector: '.popup_type_img',
  popupCardSelector: '.popup_type_card',
  popupDeleteSelector: '.popup_type_delete',
  popupAvatarSelector: '.popup_type_avatar',
  formNameInput: document.querySelector('.popup__input_field_name'),
  formJobInput: document.querySelector('.popup__input_field_job'),
  cardNameInput: document.querySelector('.popup__input_field_designation'),
  cardUrlInput: document.querySelector('.popup__input_field_url'),
  profileNameSelector: '.profile__title',
  profileJobSelector: '.profile__subtitle',
  profileImgSelector: '.profile__avatar',
  profileAvatarButton: document.querySelector('.profile__avatar-button'),
  cardTemplate: document.querySelector('#template'),
  cardsContainer: '.elements',
  imgPlace: document.querySelector('.popup__img'),
  imgTitle: document.querySelector('.popup__img-title'),
  popups: document.querySelectorAll('.popup'),
  buttonSavePopup: document.getElementById('save_popup-card'),
  baseUrl: `https://mesto.nomoreparties.co/v1/${env.GROUP_ID}`,
  headers: {
    authorization: env.TOKEN,
    'Content-Type': 'application/json'
  },
  objValidate: {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  },
  objForms: document.querySelectorAll('.popup__form')
}

export default consts