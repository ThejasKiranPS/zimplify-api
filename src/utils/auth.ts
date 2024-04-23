import { FastifyReply } from "fastify/types/reply";
import { FastifyRequest } from "fastify/types/request";

export async function verifySession(req: FastifyRequest, rep: FastifyReply) {
  const cookies = req.cookies;
  const userId = cookies.userId;
  if (!userId) {
    rep.status(401).send({ message: "Not logged in" });
    return;
  }
  req.user = { id: userId };
}
