import { screen } from '@testing-library/dom'

import { ListController } from '../'

const MOCK = {
  idina_response: {
    sources: [
      {
        url: 'privacyshield.gov',
        matching_target_indexes: [0],
        matching_source_urls: [],
        domain_authority: 42,
      },
      {
        url: 'newsweek.com',
        spam_score: 3,
        matching_target_indexes: [0],
        matching_source_urls: [],
        domain_authority: 93,
      },
      {
        url: 'ft.com',
        spam_score: 4,
        matching_target_indexes: [0],
        matching_source_urls: [],
        domain_authority: 93,
      },
    ],
  },
}

describe('ListController', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should render the list successfully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(MOCK),
      }),
    ) as jest.Mock
    document.body.innerHTML = `
      <main class="container">
        <ul class="list" id="spam_scores"></ul>
        <ul class="list" id="domain_authority"></ul>
      </main>
    `

    const list = new ListController(['spam_score', 'domain_authority'], 'url')

    await list.createList()

    expect(
      screen.getByText('Domains list of duplicated domain authorities'),
    ).toBeTruthy()
    expect(screen.getByText('newsweek.com')).toBeTruthy()
    expect(screen.getByText('ft.com')).toBeTruthy()
  })

  it.todo('should render an error message')
})
