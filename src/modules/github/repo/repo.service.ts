import axios from 'axios'
import { Octokit } from 'octokit'

export async function getRepositories(accessToken: string) {
  const octokit = new Octokit({ auth: accessToken })

  const { data } = await octokit.rest.repos.listForAuthenticatedUser()

  return data.map(repo => {
    return {
      name: repo.name,
      visibility: repo.visibility,
      owner: repo.owner.login,
      id: repo.id,
      language: repo.language,
    }
  })
}

export async function getRepository(accessToken: string, repoId: number) {
  const octokit = new Octokit({ auth: accessToken })

  const res = await octokit.request('GET /repositories/{repoId}', {
    repoId
  })
  return res.data as { full_name: string, owner: { login: string }, id: number, name: string };
}

export type GH_Branch = {
  name: string
}
export async function getRepositoryBranches(accessToken: string, repoId: number) {
  const octokit = new Octokit({ auth: accessToken })

  const branches = await octokit.request(`GET /repositories/${repoId}/branches`)
  return branches.data.map((b: GH_Branch) => ({
    name: b.name,
  }))
}

const noRedirectsInstance = axios.create({
  maxRedirects: 0,
  validateStatus: () => true
});


export async function getRepositoryDownloadLink({
  accessToken,
  owner,
  repo,
  branch
}: {
  accessToken: string
  owner: string
  repo: string
  branch: string
}) {

  const res = await noRedirectsInstance.get(`https://api.github.com/repos/${owner}/${repo}/tarball/${branch}`, {
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': 'Bearer ' + accessToken,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  return res.headers.location
}
