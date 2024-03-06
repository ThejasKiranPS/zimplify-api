import F from "fastify"
import { registerRoutes } from "./registerRoutes";

const server = F()


registerRoutes(server);
server.get('/ping', async function() {
    return { status: "OK" };
})

async function main() {

    try {
        await server.listen({ port: 3001,host: '0.0.0.0' });
        console.log(`Server ready`)
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

main()
