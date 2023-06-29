export class UserInfo {
  constructor({ nameSelector, jobSelector, imgSelector }) {
    this._nameElement = document.querySelector(nameSelector)
    this._jobElement = document.querySelector(jobSelector)
    this._ImgElement = document.querySelector(imgSelector)
  }

  getUserInfo() {
    const userData = {
      username: this._nameElement.textContent,
      about: this._jobElement.textContent
    }
    return userData
  }

  setUserInfo({ username, about}) {
    this._nameElement.textContent = username
    this._jobElement.textContent = about
  }

  setUserAvatar(url) {
    this._ImgElement.src = url
  }
}