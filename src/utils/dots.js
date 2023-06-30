export function dots(buttonElement) {
  let dots = ''
  let intervalId = null

  function start() {
    intervalId = setInterval(() => {
      dots += '.'
      if (dots.length > 3) {
        dots = ''
      }
      buttonElement.textContent = `Сохранение${dots}`
    }, 150)
  }

  function stop() {
    clearInterval(intervalId)
    buttonElement.textContent = 'Сохранить'
  }

  return {
    start,
    stop
  }
}
