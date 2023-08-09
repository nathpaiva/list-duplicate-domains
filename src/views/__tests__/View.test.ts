import { screen } from '@testing-library/dom'

import { View } from '../'

describe('View', () => {
  it('should render a list with no data', () => {
    document.body.innerHTML = `
      <main class="container">
        <ul class="list" id="spam_scores"></ul>
        <ul class="list" id="domain_authority"></ul>
      </main>
    `
    const container = document.getElementById('spam_scores') as HTMLElement
    const view = new View(container, 'My title')

    view.update()

    expect(screen.getByText('My title')).toBeTruthy()
    expect(screen.getByText('Has no data to render.')).toBeTruthy()
  })

  it('should render a list given and string array', () => {
    document.body.innerHTML = `
      <main class="container">
        <ul class="list" id="spam_scores"></ul>
        <ul class="list" id="domain_authority"></ul>
      </main>
    `

    const container = document.getElementById('spam_scores') as HTMLElement
    const view = new View(container, 'My title')

    view.update(['globo.com.br', 'mail.ru'])

    expect(screen.getByText('My title')).toBeTruthy()
    expect(screen.getByText('globo.com.br')).toBeTruthy()
    expect(screen.getByText('mail.ru')).toBeTruthy()
    expect(screen.queryByText('Has no data to render.')).toBeFalsy()
  })

  it('should render a list given and object', () => {
    document.body.innerHTML = `
      <main class="container">
        <ul class="list" id="spam_scores"></ul>
        <ul class="list" id="domain_authority"></ul>
      </main>
    `

    const container = document.getElementById('spam_scores') as HTMLElement
    const view = new View(container, 'My title')

    view.update([
      {
        domain_authority: 99,
        spam_score: 1,
        url: 'globo.com.br',
        matching_source_urls: [],
        matching_target_indexes: [1],
      },
    ])

    expect(screen.getByText('My title')).toBeTruthy()
    expect(screen.getByText('99 1 globo.com.br')).toBeTruthy()
    expect(screen.queryByText('Has no data to render.')).toBeFalsy()
  })
})
