const openPopup = document.getElementById('open_popup')
const closePopup = document.getElementById('close_popup')
const popupContainer = document.getElementById('popup')
let formElement = document.querySelector('.popup__container')
let nameInput = document.querySelector('.popup__input_name')
let jobInput = document.querySelector('.popup__input_job')

openPopup.addEventListener('click', () => {
  popupContainer.style.display = 'flex'
})

closePopup.addEventListener('click', () => {
  popupContainer.style.display = 'none'
})



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