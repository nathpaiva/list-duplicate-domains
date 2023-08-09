import { getDuplicated } from '../'
import { KeysFromDataObject } from '../../types'
describe('getDuplicated', () => {
  const groupKey = ['domain_authority', 'spam_score'] as KeysFromDataObject[]
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
  it('should return the duplicated domains', () => {
    const data = getDuplicated(dataToFormat, groupKey, keyToInject)

    expect(data?.duplicate_domain_authorities).toBeTruthy()
    expect(data?.duplicate_domain_authorities).toBeTruthy()
  })

  it('should return the duplicated domains', () => {
    const data = getDuplicated(dataToFormat, 'spam_score', keyToInject)

    expect(data?.duplicate_domain_authorities).toBeTruthy()
    expect(data?.duplicate_domain_authorities).toBeTruthy()
  })
})
