import Fastify from "fastify";
import { app } from "./src/app"; 

const server = Fastify({
  logger: true,
});

server.register(app); 

export default server; 

