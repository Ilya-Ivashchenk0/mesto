//кнопки открытия и закрытия попапов
export const buttonOpenPopupProfile = document.getElementById('open_edit_popup_button')
export const buttonClosePopupProfile = document.getElementById('button_close_popup_profile')
export const buttonOpenPopupCard = document.getElementById('button_open_popup_card')
export const buttonClosePopupCard = document.getElementById('button_close_popup_card')
export const buttonClosePopupImg = document.getElementById('button_close_popup_img')
//контейнеры попапов
export const popupProfileContainer = document.querySelector('.popup_type_profile')
export const popupCardContainer = document.querySelector('.popup_type_card')
export const popupImgContainer = document.querySelector('.popup_type_img')
// Находим форму в DOM
export const popupProfileForm = document.querySelector('.popup__form_place_profile')
export const popupCardForm = document.querySelector('.popup__form_place_card')
// Находим поля форм в DOM
export const formNameInput = document.querySelector('.popup__input_field_name')
export const formJobInput = document.querySelector('.popup__input_field_job')
export const cardNameInput = document.querySelector('.popup__input_field_designation')
export const cardUrlInput = document.querySelector('.popup__input_field_url')
// Выберите элементы, куда должны быть вставлены значения полей
export const profileName = document.querySelector('.profile__title')
export const profileJob = document.querySelector('.profile__subtitle')
export const cardTemplate = document.querySelector('#template')
export const cardsContainer = document.querySelector('.elements')
export const imgPlace = document.querySelector('.popup__img')
export const imgTitle = document.querySelector('.popup__img-title')
export const popups = document.querySelectorAll('.popup')
export const buttonSavePopup = document.getElementById('save_popup-card')
export const objValidate = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}
export const objInputs = [
  document.querySelector('.popup__input_field_name'),
  document.querySelector('.popup__input_field_job'),
  document.querySelector('.popup__input_field_designation'),
  document.querySelector('.popup__input_field_url')
]