import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._imagePlace = this._popup.querySelector('.popup__img')
    this._titlePlace = this._popup.querySelector('.popup__img-title')
  }

  open(link, name) {
    super.open()
    this._imagePlace.src = link
    this._imagePlace.alt = name
    this._titlePlace.textContent = name
  }
}
