import { KeysFromDataObject, ObjectReduceReturn, Source } from '../types'

export function populateGroupBy<KeyO extends KeysFromDataObject>(
  entireObj: ObjectReduceReturn<KeyO>,
  groupKey: KeyO[],
  item: Source,
  keyToInject?: KeyO,
) {
  const keysClone = [...groupKey]
  const currentKey = keysClone.shift()

  if (!currentKey) return

  // get the reference index to create the groupe
  const itemToSetAsReference = item[currentKey]
  // if do not the key to inject, will add the object item
  const _item = keyToInject ? item[keyToInject] : item

  // create the first level of the groupe
  entireObj[currentKey] = entireObj[currentKey] || {}

  // if don't have reference should stop
  if (!itemToSetAsReference || !_item) return

  if (!entireObj[currentKey][itemToSetAsReference]) {
    // populate the second level
    entireObj[currentKey] = {
      ...entireObj[currentKey],
      [itemToSetAsReference]: [_item],
    }
  } else {
    // add new items to the second level
    entireObj[currentKey][itemToSetAsReference].push(_item)
  }

  // repeat the action if there are more groups to create
  if (keysClone.length > 0) {
    populateGroupBy(entireObj, keysClone, item, keyToInject)
  }
}
