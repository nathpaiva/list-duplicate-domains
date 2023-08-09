import { KeysFromDataObject, ObjectReduceReturn, Source } from '../types'
import { populateGroupBy } from './populateGroupBy'

export function groupBy<KeyO extends KeysFromDataObject>(
  data: Source[],
  groupKey: KeyO | KeyO[],
  keyToInject?: KeyO,
) {
  return data.reduce((acc, item) => {
    if (typeof groupKey === 'string') {
      populateGroupBy(acc, [groupKey], item, keyToInject)
    }

    if (Array.isArray(groupKey)) {
      populateGroupBy(acc, groupKey, item, keyToInject)
    }

    return acc
  }, {} as ObjectReduceReturn<KeyO>)
}
