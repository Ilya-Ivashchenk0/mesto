export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._cards = items
    this._renderer = renderer
    this._container = containerSelector
  }

  rendererItems() {
    this._cards.forEach(item => {
      const element = this._renderer(item)
      this.addItem(element)
    })
  }

  addItem(element) {
    this._container.prepend(element)
  }
}
