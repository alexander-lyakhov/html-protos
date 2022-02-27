(function() {
  const list = [
    'AC 1',
    'AC 2',
    'AC 3',
    'AC 4',
    'AC 5',
    'AC 6',
  ]

  class ACList {
    constructor(config = {}) {
      this.data = config.data || []
      this.jsonIsDone = JSON.parse(localStorage.getItem('isDone')) || {}

      this.renderACList()
      this.el = document.querySelector('.ac-list')
      this.header = this.el.querySelector('.ac-list__header')
      this.ul = this.el.querySelector('.ac-list ul')
      this.btnReset = this.el.querySelector('.btn-reset')

      this.init()
    }

    init() {
      this.renderItems().bindEvents()
    }

    renderACList() {
      document.body.insertAdjacentHTML('beforeend', `
        <div class="ac-list">
          <div class="ac-list__header">
            AC List
          </div>
          <div class="ac-list__body">
            <ul></ul>
            <div class="ac-list__body-controls">
              <a href="#" class="btn-reset">Reset</a>
            </div>
          </div>
        </div>
      `)
      return this
    }

    renderItems(cbTemplate) {
      this.data.map(item => {
        const isDone = this.jsonIsDone[item]

        this.ul.insertAdjacentHTML('beforeend', `
          <li class="ac-list__item ${isDone ? 'is-done':''}">
            <span>${item}</span>
            <label class="checkbox">
              <input type="checkbox" ${isDone && 'checked'} />
            </label>
          </li>
        `)
      })

      return this
    }

    bindEvents() {
      [...this.ul.querySelectorAll('.checkbox')].map(el => {
        console.log(el)
        el.addEventListener('change', this.onCheckBoxChange.bind(this))
      })

      this.header.addEventListener('click', e => e.target.parentNode.classList.toggle('collapsed'))
      this.btnReset.addEventListener('click', this.reset.bind(this))

      return this
    }

    onCheckBoxChange(e) {
      const item = e.target.parentNode.parentNode
      const val = e.target.checked
      const key = item.children[0].textContent

      item.classList.toggle('is-done', val)
      this.jsonIsDone[key] = val

      localStorage.setItem('isDone', JSON.stringify(this.jsonIsDone))

      console.log(item, this.jsonIsDone)
    }

    reset(e) {
      const cbs = this.el.querySelectorAll('input[type=checkbox]')
      Array.from(cbs).map(el => el.checked = false)
    }
  }

  const acList = new ACList({
    //el: document.querySelector('.ac-list'),
    data: list,
  })

})()