export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector)
    this._jobElement = document.querySelector(jobSelector)
    this._nameInput = document.querySelector('.popup__input_field_name')
    this._jobInput = document.querySelector('.popup__input_field_job')
  }

  getUserInfo() {
    const userData = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    }
    this._nameInput.value = userData.name
    this._jobInput.value = userData.job
    return userData
  }

  setUserInfo({ name, job }) {
    this._nameElement.textContent = name
    this._jobElement.textContent = job
  }
}