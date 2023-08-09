import { Source } from '../types'

export function getUnifyDuplicated(data: {
  [key in string]: (string | number | Source)[]
}) {
  if (!data) return []

  // get only the items with more then one item in the array
  const result = Object.keys(data).reduce(
    (acc, item) => {
      if (data[item].length > 1) {
        acc.push(...data[item])
      }

      return acc
    },
    [] as (string | number | Source)[],
  )

  // remove duplicated
  return [...new Set(result)]
}
