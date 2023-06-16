export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector)
    this._jobElement = document.querySelector(jobSelector)
  }

  getUserInfo() {
    const userData = {
      username: this._nameElement.textContent,
      about: this._jobElement.textContent
    }
    return userData
  }

  setUserInfo({ username, about }) {
    this._nameElement.textContent = username
    this._jobElement.textContent = about
  }
}