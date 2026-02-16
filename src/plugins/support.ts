import fp from "fastify-plugin";
import postgres from "postgres";

export interface SupportPluginOptions {}

export default fp<SupportPluginOptions>(async (fastify, opts) => {
  fastify.decorate("someSupport", function () {
    return "hugs";
  });
});

declare module "fastify" {
  export interface FastifyInstance {
    someSupport(): string;
    sql: postgres.Sql<{}>;
  }
}
