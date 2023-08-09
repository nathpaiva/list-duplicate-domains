import { ResponseDataToRender } from '../types'

export interface ViewInterface {
  _elem: HTMLElement
  template: (model?: ResponseDataToRender) => string
  update: (model?: ResponseDataToRender) => void
  fallbackMessage: () => void
}
