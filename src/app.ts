import 'dotenv/config'
import F from "fastify"
import { registerRoutes } from "./registerRoutes";
import cors from "@fastify/cors"
import fastifyCookies from "@fastify/cookie";
import { getEnv } from "./utils/env";


const logOptions = process.env.NODE_ENV === 'production' ? true : ({
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
    },
  },
  redact: ['req.headers.authorization'],
});

const server = F({
  logger: logOptions
})
server.register(cors, {
  origin: getEnv('CLIENT_URL'),
  credentials: true,
})

server.register(fastifyCookies, {
  secret: getEnv('cookie_secret'),
  hook: 'onRequest',
})
registerRoutes(server);
server.get('/ping', async function() {
  return { status: "OK" };
})

async function main() {
  try {
    const port = Number.parseInt(getEnv('port'));
    await server.listen({ port: port, host: '0.0.0.0' });
    server.log.info(`Server listening on ${port}`)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}

main()
