let openPopup = document.getElementById('open_popup')
let closePopup = document.getElementById('close_popup')
let popupContainer = document.querySelector('.popup')
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

closePopup.addEventListener('click', popupClose)



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