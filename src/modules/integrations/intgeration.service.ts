import { IntegrationPlatform } from "../../../types/enums";
import { prisma } from "../../utils/prisma";

interface getIntegrationByPlatform {
  userId: string,
  platform: IntegrationPlatform
}
export async function getIntegrationByPlatform({
  userId,
  platform
}: getIntegrationByPlatform) {
  return await prisma.integrations.findUnique({
    where: {
      userId_platform: {
        userId,
        platform
      }
    }
  })
}