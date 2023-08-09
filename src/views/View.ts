import { ResponseDataToRender } from '../types'
import { ViewInterface } from './types'

export class View implements ViewInterface {
  _elem: HTMLElement
  _title: string

  constructor(elem: HTMLElement, title: string) {
    this._elem = elem
    this._title = title
  }

  fallbackMessage() {
    return `
      <li><strong>${this._title}</strong></li>
      <li>Has no data to render.</li>
    `
  }

  template(model?: ResponseDataToRender): string {
    if (!model) return this.fallbackMessage()

    return model
      .map((item, index) => {
        let addTitle = ''

        // add the title list on top
        if (!index) {
          addTitle = `<li><strong>${this._title}</strong></li>`
        }

        if (typeof item === 'object') {
          return `
            ${addTitle}
            <li>${item.domain_authority} ${item.spam_score} ${item.url}</li>
          `
        }

        return `
          ${addTitle}
          <li>${item}</li>
        `
      })
      .join('')
  }

  update(model?: ResponseDataToRender) {
    this._elem.innerHTML = this.template(model)
  }
}
