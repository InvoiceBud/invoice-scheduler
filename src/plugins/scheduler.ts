import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import { PgBoss } from "pg-boss";

const pgBoss: FastifyPluginAsync = async (fastify, opts) => {
  const boss = new PgBoss({
    connectionString: process.env.DATABASE_URL!,
  });

  try {
    boss.on("error", (error) => fastify.log.error(error));

    await boss.start();
    fastify.log.info(`Scheduler connected successfully`);
  } catch (error) {
    fastify.log.error(`Error connecting scheduler to database - ${error}`);
  }
};

export default fp(pgBoss);
