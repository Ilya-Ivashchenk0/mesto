const consts = {
  buttonOpenPopupProfile: document.getElementById('open_edit_popup_button'),
  buttonClosePopupProfile: document.getElementById('button_close_popup_profile'),
  buttonOpenPopupCard: document.getElementById('button_open_popup_card'),
  buttonClosePopupCard: document.getElementById('button_close_popup_card'),
  buttonClosePopupImg: document.getElementById('button_close_popup_img'),
  popupProfileContainer: document.querySelector('.popup_type_profile'),
  popupCardContainer: document.querySelector('.popup_type_card'),
  popupImgContainer: document.querySelector('.popup_type_img'),
  popupProfileForm: document.querySelector('.popup__form_place_profile'),
  popupCardForm: document.querySelector('.popup__form_place_card'),
  formNameInput: document.querySelector('.popup__input_field_name'),
  formJobInput: document.querySelector('.popup__input_field_job'),
  cardNameInput: document.querySelector('.popup__input_field_designation'),
  cardUrlInput: document.querySelector('.popup__input_field_url'),
  profileName: document.querySelector('.profile__title'),
  profileJob: document.querySelector('.profile__subtitle'),
  cardTemplate: document.querySelector('#template'),
  cardsContainer: document.querySelector('.elements'),
  imgPlace: document.querySelector('.popup__img'),
  imgTitle: document.querySelector('.popup__img-title'),
  popups: document.querySelectorAll('.popup'),
  buttonSavePopup: document.getElementById('save_popup-card'),
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