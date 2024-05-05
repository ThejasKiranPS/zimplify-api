import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../../../../utils/prisma";
import { deployProject } from "../../../project/project.service";

export async function GH_RepoWebhookHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  req.log.info('Received webhook event \nheader =>%o  \nbody => %o', req.headers, req.body)
  const event = req.headers['x-github-event']
  if (event === 'ping') {
    req.log.info('Received ping event')
    return res.send('pong')
  } else {
    const repoId = req.body.repository.id;
    req.log.info('Received push event for repo %s', repoId)
    const project = await prisma.project.findFirst({
      where: {
        source: {
          path: ['github', 'repo'],
          equals: repoId
        }
      }
    })

    if (!project) {
      req.log.error('Project not found')
      return res.status(404).send({ message: 'Project not found' })
    }

    req.log.info('Deploying project \n %o', project)
    await deployProject(project);
  }

  res.send('ok')
}