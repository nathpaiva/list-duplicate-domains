import { getDuplicated } from '../helpers'
import { requestService } from '../services'
import { DuplicatedResponse, KeysFromDataObject } from '../types'
import { View } from '../views'
import { ViewInterface } from '../views/types'

interface IListController {
  _spamScoresContainer: HTMLElement | null
  _domainAuthorityContainer: HTMLElement | null
  _duplicatedSpamScoresListView: ViewInterface | null
  _duplicatedDomainAuthorityListView: ViewInterface | null
  createList: () => void
  _render: (param: DuplicatedResponse) => void
}

export class ListController implements IListController {
  _spamScoresContainer: HTMLElement | null
  _domainAuthorityContainer: HTMLElement | null
  _duplicatedSpamScoresListView: ViewInterface | null
  _duplicatedDomainAuthorityListView: ViewInterface | null
  keysToFilter: KeysFromDataObject | KeysFromDataObject[]
  keyToInject?: KeysFromDataObject

  constructor(
    keysToFilter: KeysFromDataObject | KeysFromDataObject[],
    keyToInject?: KeysFromDataObject,
  ) {
    this.keysToFilter = keysToFilter
    this.keyToInject = keyToInject

    // create a reference to get the elements
    const $ = document.getElementById.bind(document)

    // get list to render the spam_scores
    this._spamScoresContainer = $('spam_scores')
    // get list to render the domain_authority
    this._domainAuthorityContainer = $('domain_authority')

    // create a reference to get the views
    this._duplicatedSpamScoresListView = this._spamScoresContainer
      ? new View(
          this._spamScoresContainer,
          'Domains list of duplicated spam scores',
        )
      : null

    this._duplicatedDomainAuthorityListView = this._domainAuthorityContainer
      ? new View(
          this._domainAuthorityContainer,
          'Domains list of duplicated domain authorities',
        )
      : null
  }

  _render(data: DuplicatedResponse) {
    // TODO: create an error component
    if (!data) {
      throw new Error('could not load the data')
    }

    // renders the spam scores list if it exists in the DOM tree
    this._duplicatedSpamScoresListView &&
      this._duplicatedSpamScoresListView.update(data.duplicate_spam_scores)

    // renders the domain authority list if it exists in the DOM tree
    this._duplicatedDomainAuthorityListView &&
      this._duplicatedDomainAuthorityListView.update(
        data.duplicate_domain_authorities,
      )
  }

  async createList() {
    const data = await requestService()

    // TODO: create an error component
    if (!data) throw new Error('could not load the data')

    const dataFormatted = getDuplicated(
      data.idina_response.sources,
      this.keysToFilter,
      this.keyToInject,
    )
    this._render(dataFormatted)
  }
}
