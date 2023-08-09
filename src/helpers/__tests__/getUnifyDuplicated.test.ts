import { getUnifyDuplicated } from '../getUnifyDuplicated'

describe('getUnifyDuplicated', () => {
  it('should return an array with no duplicated URLs', () => {
    const formatter = getUnifyDuplicated({
      1: ['globo.com.br', 'globo.com.br'],
      2: ['mail.ru', 'globo.com.br'],
    })

    expect(formatter).toEqual(['globo.com.br', 'mail.ru'])
  })
})
