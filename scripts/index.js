const openPopup = document.getElementById('open_popup')
const closePopup = document.getElementById('close_popup')
const popupContainer = document.getElementById('popup_conteiner')
let formElement = document.querySelector('.popup')
let nameInput = document.querySelector('.popup__input_name')
let jobInput = document.querySelector('.popup__input_job')

function popupOpen () {
  popupContainer.style.display = 'flex'
}

openPopup.addEventListener('click', popupOpen)

function popupClose () {
  popupContainer.style.display = 'none'
}

openPopup.addEventListener('click', popupClose)



function handleFormSubmit (evt) {
    evt.preventDefault()
    nameValue = nameInput.value
    jobValue = jobInput.value
    let inputName = document.getElementById('profTitle')
    let inputJob = document.getElementById('profSubtitle')
    inputName.textContent = `${nameValue}`
    inputJob.textContent = `${jobValue}`
}

formElement.addEventListener('submit', handleFormSubmit)