import Fastify from "fastify";
import { app } from "./src/app"; 

const server = Fastify({
  logger: true,
});

server.get("/", async (_request, reply) => { 
  reply.status(200).send({ hello: "world" }); 
})

server.register(app); 

server.listen({ port: parseInt(process.env.PORT!) || 8000 });

export default server; 
