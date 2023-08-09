import { DuplicatedResponse, KeysFromDataObject, Source } from '../types'
import { getUnifyDuplicated } from './getUnifyDuplicated'
import { groupBy } from './groupBy'

export function getDuplicated(
  data: Source[],
  keyToGroup: KeysFromDataObject | KeysFromDataObject[],
  keyToInject?: KeysFromDataObject,
): DuplicatedResponse {
  const { spam_score, domain_authority } = groupBy(
    data,
    keyToGroup,
    keyToInject,
  )

  return {
    duplicate_spam_scores: getUnifyDuplicated(spam_score),
    duplicate_domain_authorities: getUnifyDuplicated(domain_authority),
  }
}
