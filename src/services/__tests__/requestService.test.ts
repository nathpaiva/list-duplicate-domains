import { requestService } from '../requestService'

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

describe('requestService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should return the data after fetch', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(MOCK),
      }),
    ) as jest.Mock
    const data = await requestService()

    expect(data).toBeTruthy()
    expect(data).toEqual(MOCK)
  })

  it('should return null after fetch in case has an error', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.reject(),
      }),
    ) as jest.Mock
    const data = await requestService()

    expect(data).toBeFalsy()
    expect(data).toEqual(null)
  })
})
