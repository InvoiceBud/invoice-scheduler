import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import postgres from "postgres";

const database: FastifyPluginAsync = async (fastify, opts) => {
  const sql = postgres(process.env.DATABASE_URL!, { max: 20 });
  
  fastify.decorate("sql", sql);

  fastify.addHook("onClose", async () => {
    await sql.end();
  });
};

export default fp(database);
