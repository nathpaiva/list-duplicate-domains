import './scss/style.scss'
import { ListController } from './controller'
import { InitialListInterface } from './types'

export const initialList: InitialListInterface = {
  startCreateList: () => {
    const listControllerStart = new ListController(
      ['spam_score', 'domain_authority'],
      'url',
    )

    listControllerStart.createList()
  },
}

window.addEventListener('DOMContentLoaded', () => {
  initialList.startCreateList()
})
