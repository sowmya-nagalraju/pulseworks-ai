
import { externalUsersSchema } from '../schemas/externalUserSchema'
import type { ExternalUser } from '../schemas/externalUserSchema'

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://jsonplaceholder.typicode.com'

export async function fetchUsers(
  signal?: AbortSignal
): Promise<ExternalUser[]> {
  let response: Response

  try {
    response = await fetch(
      `${API_BASE_URL}/users?_limit=5`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        signal,
      }
    )
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error
    }

    throw new Error('Unable to connect to the external API.')
  }

  if (!response.ok) {
    throw new Error(
      `API request failed with status ${response.status}.`
    )
  }

  let responseData: unknown

  try {
    responseData = await response.json()
  } catch {
    throw new Error('The API returned an invalid JSON response.')
  }

  const validationResult = externalUsersSchema.safeParse(responseData)

  if (!validationResult.success) {
    throw new Error(
      'The external API returned data in an unexpected format.'
    )
  }

  return validationResult.data
}
