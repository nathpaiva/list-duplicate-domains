export interface InitialListInterface {
  startCreateList: () => void
}

export interface Source {
  url: string
  spam_score?: number
  matching_target_indexes: number[]
  matching_source_urls: {
    url: string
    page_authority: number
  }[]
  domain_authority: number
}

export type DataResponse = {
  idina_response: {
    sources: Source[]
  }
} | null

export type KeysFromDataObject = keyof Pick<
  Source,
  'url' | 'spam_score' | 'domain_authority'
>

export type ObjectReduceReturn<K extends KeysFromDataObject> = {
  [firstLevel in K]: {
    [secondLevel: string | number]: (string | number | Source)[]
  }
}

// TODO: review this type
export type KeysFromDataObjectToResponse =
  | keyof Pick<Source, 'url' | 'spam_score'>
  | 'domain_authoritie'

export type ResponseDataToRender = (string | number | Source)[]

export type DuplicatedResponse = Partial<
  Record<`duplicate_${KeysFromDataObjectToResponse}s`, ResponseDataToRender>
> | null
