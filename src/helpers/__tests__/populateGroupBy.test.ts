import { KeysFromDataObject, ObjectReduceReturn } from '../../types'
import { populateGroupBy } from '../populateGroupBy'
describe('populateGroupBy', () => {
  const item = {
    url: 'mail.ru',
    spam_score: 1,
    matching_target_indexes: [0],
    matching_source_urls: [],
    domain_authority: 95,
  }

  describe('multiple groupKey', () => {
    it('should update the given empty object with URLs', () => {
      const entireObj = {} as ObjectReduceReturn<KeysFromDataObject>
      const groupKey = [
        'domain_authority',
        'spam_score',
      ] as KeysFromDataObject[]

      expect(entireObj).toEqual({})

      populateGroupBy(entireObj, groupKey, item, 'url')

      expect(entireObj).toEqual({
        spam_score: {
          '1': ['mail.ru'],
        },
        domain_authority: {
          '95': ['mail.ru'],
        },
      })
    })

    it('should update the given filled object with URLs', () => {
      const entireObj = {
        spam_score: {
          '1': ['globo.com.br'],
        },
        domain_authority: {
          '95': ['globo.com.br'],
        },
      } as unknown as ObjectReduceReturn<KeysFromDataObject>
      const groupKey = [
        'domain_authority',
        'spam_score',
      ] as KeysFromDataObject[]

      expect(entireObj).not.toEqual({})

      populateGroupBy(entireObj, groupKey, item, 'url')

      expect(entireObj).toEqual({
        spam_score: {
          '1': ['globo.com.br', 'mail.ru'],
        },
        domain_authority: {
          '95': ['globo.com.br', 'mail.ru'],
        },
      })
    })
  })

  describe('single groupKey', () => {
    it('should update the given empty object with URLs', () => {
      const entireObj = {} as ObjectReduceReturn<KeysFromDataObject>
      const groupKey = ['domain_authority'] as KeysFromDataObject[]

      expect(entireObj).toEqual({})

      populateGroupBy(entireObj, groupKey, item, 'url')

      expect(entireObj).toEqual({
        domain_authority: {
          '95': ['mail.ru'],
        },
      })
    })
    it('should update the filled given object with URLs', () => {
      const entireObj = {
        domain_authority: {
          '95': ['globo.com.br'],
        },
      } as unknown as ObjectReduceReturn<KeysFromDataObject>
      const groupKey = ['domain_authority'] as KeysFromDataObject[]

      expect(entireObj).not.toEqual({})

      populateGroupBy(entireObj, groupKey, item, 'url')

      expect(entireObj).toEqual({
        domain_authority: {
          '95': ['globo.com.br', 'mail.ru'],
        },
      })
    })
  })

  it.todo('create test for `currentKey` as undefined')
  it.todo('create test for invalid item')
})
