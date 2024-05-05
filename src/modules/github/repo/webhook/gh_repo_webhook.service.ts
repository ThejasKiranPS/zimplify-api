import { Octokit } from "octokit"

export async function subscribeToGHRepoWebhook({
  accessToken,
  owner,
  repoName,
  webhookUrl
}: {
  accessToken: string
  repoName: string,
  owner: string,
  webhookUrl: string
}) {
  const octokit = new Octokit({ auth: accessToken })
  try {
    await octokit.request('POST /repos/{owner}/{repo}/hooks', {
      owner,
      repo: repoName,
      config: {
        url: webhookUrl,
        content_type: 'json'
      },
      events: ['push']
    })
  } finally {
    return;
  }
}