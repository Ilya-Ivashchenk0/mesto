const openPopup = document.getElementById('open_popup')
const openPopupCard = document.getElementById('open_popup-card')
const closePopup = document.getElementById('close_popup')
const closePopupCard = document.getElementById('close_popup-card')
const popupContainer = document.querySelector('.popup')
const popupCardContainer = document.querySelector('.popup-card')
// Находим форму в DOM
const formElement = document.querySelector('.popup__form')
const cardFormElement = document.querySelector('.popup-card__form')
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__input_field_name')
let jobInput = document.querySelector('.popup__input_field_job')

let cardNameInput = document.querySelector('.popup-card__input_field_designation')
let cardUrlInput = document.querySelector('.popup-card__input_field_url')
// Выберите элементы, куда должны быть вставлены значения полей
const profileName = document.querySelector('.profile__title')
const profileAbout = document.querySelector('.profile__subtitle')
const cardTemplate = document.querySelector('#template').content
const cardsContainer = document.querySelector('.elements')
const initialCards = [
  {
    name: 'Мордор',
    link: 'https://upload.wikimedia.org/wikipedia/ru/6/6a/Mordor.png'
  },
  {
    name: 'Минас Тирит',
    link: 'https://static.wikia.nocookie.net/lotr/images/e/e4/Minas_Tirith.jpg/revision/latest?cb=20110408141647&path-prefix=ru'
  },
  {
    name: 'Лес Фангорн',
    link: 'https://pibig.info/uploads/posts/2022-12/1670277718_1-pibig-info-p-les-fangorn-krasivo-2.jpg'
  },
  {
    name: 'Врата Мории',
    link: 'https://i.ibb.co/3rvpNfL/55181515.jpg'
  },
  {
    name: 'Ривенделл',
    link: 'https://gamerwall.pro/uploads/posts/2022-03/1646211822_5-gamerwall-pro-p-gorod-elfov-vlastelin-kolets-rivendell-kra-5.jpg'
  },
  {
    name: 'Шир',
    link: 'https://staskulesh.com/wp-content/uploads/2012/05/nz_hobbiton_IMG_8526-800x533.jpg'
  }

]

function log (a) {
  console.log(a)
}

function popupOpen () {
  popupContainer.classList.add('popup_opened')
  let profileTitleValue = profileName.textContent
  let profileSubtitleValue = profileAbout.textContent
  nameInput.value = `${profileTitleValue}`
  jobInput.value = `${profileSubtitleValue}`
}

function popupClose () {
  popupContainer.classList.remove('popup_opened')
}

function popupCardOpen () {
  popupCardContainer.classList.add('popup-card_opened')
}

function popupCardClose () {
  popupCardContainer.classList.remove('popup-card_opened')
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
  evt.preventDefault()// Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.
  // Получите значение полей jobInput и nameInput из свойства value
  let nameValue = nameInput.value
  let jobValue = jobInput.value
  // Вставьте новые значения с помощью textContent
  profileName.textContent = `${nameValue}`
  profileAbout.textContent = `${jobValue}`
  popupClose()
}

const createCard = (data) => {
  // Клонируем шаблон, наполняем его информацией из объекта data, навешиваем всякие обработчики событий, о которых будет инфа ниже
  const cardCopy = cardTemplate.cloneNode(true)
  cardCopy.querySelector('.element__title').textContent = data.name
  cardCopy.querySelector('.element__mask-img').src = data.link
  // Возвращаем получившуюся карточку
  return cardCopy
}

const renderCard = (data) => {
  // Создаем карточку на основе данных
  const cardElement = createCard(data)
  // Вешаем событие
  let cardElemntPlace = cardElement.querySelector('.element__trash')
  cardElemntPlace.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove()
  })
  // Помещаем ее в контейнер карточек
  cardsContainer.prepend(cardElement)
}

function handleCardFormSubmit (evt) {
  evt.preventDefault()

  let enterInfo = {
    name: `${cardNameInput.value}`,
    link: `${cardUrlInput.value}`
  }

  renderCard(enterInfo)

  popupCardClose()
}

initialCards.forEach(card => { renderCard(card) })


let trashButtons = document.querySelectorAll('.element__trash')

trashButtons.forEach(function (card) {
  card.addEventListener('click', function (evt) {
    evt.target.closest('.element').remove()
  })
})

closePopup.addEventListener('click', popupClose)
openPopup.addEventListener('click', popupOpen)
formElement.addEventListener('submit', handleFormSubmit)

closePopupCard.addEventListener('click', popupCardClose)
openPopupCard.addEventListener('click', popupCardOpen)
cardFormElement.addEventListener('submit', handleCardFormSubmit)