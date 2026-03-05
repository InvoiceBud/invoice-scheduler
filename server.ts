import Fastify from "fastify";
import { app } from "./src/app"; 

const server = Fastify({
  logger: true,
});

server.register(app); 

server.listen({ port: parseInt(process.env.PORT!) || 8000 });

export default server; 
