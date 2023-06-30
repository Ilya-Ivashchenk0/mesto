export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._cards = items
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  rendererItems(cards) {
    this._cards = cards
    this._cards.forEach(item => {
      this._renderer(item)
    })
  }

  addItem(element) {
    this._container.prepend(element)
  }
}
