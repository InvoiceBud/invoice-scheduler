import { FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async (request, reply) => {
    return reply.status(200).send({ hello: "world" });
  });

  fastify.get("/health", async (_request, reply) => {
    return reply.status(200).send({ status: "ok" });
  });
};

export default root;
