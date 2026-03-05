import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { PgBoss } from "pg-boss";
import postgres from "postgres";

const database: FastifyPluginAsync = async (fastify, opts) => {
  const sql = postgres(process.env.DEV_DATABASE_URL!, { max: 20 });

  const boss = new PgBoss({
    connectionString: process.env.DEV_DATABASE_URL!,
  });

  boss.on("error", (error) => fastify.log.error(error));
  await boss.start();

  fastify.log.info(`Scheduler connected successfully to Db`);

  fastify.decorate("boss", boss);
  fastify.decorate("sql", sql);

  fastify.addHook("onClose", async () => {
    await sql.end();
    await boss.stop();
  });
};

export default fp(database);
