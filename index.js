const openPopup = document.getElementById('open_popup')
const closePopup = document.getElementById('close_popup')
const popupContainer = document.getElementById('popup')

openPopup.addEventListener('click', () => {
  popupContainer.style.display = 'block'
})

closePopup.addEventListener('click', () => {
  popupContainer.style.display = 'none'
})

let formElement = document.querySelector('.popup__container')
let nameInput = document.querySelector('.popup__name')
let jobInput = document.querySelector('.popup__about')

function handleFormSubmit (evt) {
    evt.preventDefault()
    nameV = nameInput.value
    jobV = jobInput.value
    let inputName = document.getElementById('profTitle')
    let inputJob = document.getElementById('profSubtitle')
    inputName.textContent = `${nameV}`
    inputJob.textContent = `${jobV}`
}

formElement.addEventListener('submit', handleFormSubmit)