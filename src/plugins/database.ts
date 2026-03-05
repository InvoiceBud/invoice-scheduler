import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import postgres from "postgres";

const database: FastifyPluginAsync = async (fastify, opts) => {
  const { PgBoss } = await import("pg-boss");

  const sql = postgres(process.env.DEV_DATABASE_URL!, { max: 20 });

  const boss = new PgBoss({
    connectionString: process.env.DEV_DATABASE_URL!,
  });

  boss.on("error", (error: any) => fastify.log.error(error));
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

// Do not put the import at the top of the file
// export const initBoss = async () => {
//   // Use a dynamic import inside an async block
//   const PgBoss = (await import('pg-boss')).default;

//   const boss = new PgBoss(process.env.DATABASE_URL!);
//   await boss.start();
//   return boss;
// };
