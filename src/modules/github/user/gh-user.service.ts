import { Octokit } from 'octokit'

export async function getAuthenticatedUser(accessToken: string) {
  const octokit = new Octokit({ auth: accessToken })
  const { data } = await octokit.rest.users.getAuthenticated()
  return data
}
