import { KeysFromDataObject } from '../../types'
import { groupBy } from '../groupBy'
describe('groupBy', () => {
  const keyToInject = 'url'
  const dataToFormat = [
    {
      url: 'mail.ru',
      spam_score: 1,
      matching_target_indexes: [0],
      matching_source_urls: [],
      domain_authority: 95,
    },
    {
      url: 'line.me',
      spam_score: 5,
      matching_target_indexes: [0],
      matching_source_urls: [],
      domain_authority: 95,
    },
    {
      url: 'pt.wikipedia.org',
      spam_score: 16,
      matching_target_indexes: [0],
      matching_source_urls: [],
      domain_authority: 95,
    },
  ]
  it('should return an object grouped with multiples group', () => {
    const groupKey = ['domain_authority', 'spam_score'] as KeysFromDataObject[]
    const data = groupBy(dataToFormat, groupKey, keyToInject)

    expect(data).toEqual({
      domain_authority: { '95': ['mail.ru', 'line.me', 'pt.wikipedia.org'] },
      spam_score: {
        '1': ['mail.ru'],
        '5': ['line.me'],
        '16': ['pt.wikipedia.org'],
      },
    })
  })

  it('should return an object grouped with single group', () => {
    const groupKey = 'spam_score'
    const data = groupBy(dataToFormat, groupKey, keyToInject)

    expect(data).toEqual({
      spam_score: {
        '1': ['mail.ru'],
        '5': ['line.me'],
        '16': ['pt.wikipedia.org'],
      },
    })
  })
})
