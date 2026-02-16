import { FastifyPluginAsync } from "fastify";
import { RoutePaths } from "../../constants";
import { SchedulerController } from "../../controllers/scheduler-controller";
import { Responses } from "../../schema/response";

const schedulerRoutes: FastifyPluginAsync = async (fastify, _options) => {
  fastify.get(
    RoutePaths.FETCH_ALL_INVOICES,
    {
      schema: {
        response: {
          200: Responses[200],
          400: Responses[400],
          500: Responses[500],
        },
      },
    },
    SchedulerController.fetchInvoices,
  );
};

export default schedulerRoutes;
