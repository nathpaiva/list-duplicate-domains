import { DataResponse } from '../types'

export async function requestService(): Promise<DataResponse> {
  try {
    const response = await fetch('/assets/data.json')
    const data = await response.json()

    return data
  } catch (error) {
    // create an handle error
    return null
  }
}
