import axios from "axios";
import { getEnv } from "../../../utils/env";
import { prisma } from "../../../utils/prisma";
import { Integrations } from "@prisma/client";
import { ProjectSourceType } from "../../../../types/enums";

/**
 * Returns the access token from the code
 * */
export async function exchangeCode(code: string) {
  const params = {
    client_id: getEnv('gh_client_id'),
    client_secret: getEnv('gh_client_secret'),
    code,
  };
  const searchParams = new URLSearchParams(params);
  const url = `https://github.com/login/oauth/access_token?${searchParams.toString()}`;

  const response = await axios.post(url)
  const parsed = new URLSearchParams(response.data)

  return parsed.get('access_token') as string
}

export async function createGithubConfig(userId: string, accessToken: string) {
  const intergration = await prisma.integrations.create({
    data: {
      userId,
      platform: ProjectSourceType.GITHUB,
      config: {
        accessToken
      }
    }
  })
  return intergration
}

export async function upsertGithubConfig(userId: string, accessToken: string) {
  const integration = await prisma.integrations.upsert({
    where: {
      userId_platform: {
        userId,
        platform: ProjectSourceType.GITHUB
      }
    },
    update: {
      config: {
        accessToken
      }
    },
    create: {
      userId,
      platform: ProjectSourceType.GITHUB,
      config: {
        accessToken
      }
    }
  })
  return integration
}

interface GithubIntegration extends Integrations {
  config: {
    accessToken: string
  }
}
export async function getGithubConfig(userId: string) {
  const integration = await prisma.integrations.findUnique({
    where: {
      userId_platform: {
        userId,
        platform: ProjectSourceType.GITHUB
      }
    }
  })
  return integration as GithubIntegration
}
