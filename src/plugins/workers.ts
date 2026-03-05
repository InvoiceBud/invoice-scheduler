// import { FastifyPluginAsync } from "fastify";
// import fp from "fastify-plugin";
// import { WORKER_DAILY_INVOICE_OVERDUE } from "../constants";
// import SchedulerService from "../services/scheduler";

// const workers: FastifyPluginAsync = async (fastify, opts) => {
//   const boss = fastify.boss;
//   const sql = fastify.sql;

//   boss.work(WORKER_DAILY_INVOICE_OVERDUE, async () => {
//     await SchedulerService.updateSentInvoiceToOverdueOnExpiryTime(sql);
//     fastify.log.info(`Daily invoice overdue updated`); 
//   });
// };

// export default fp(workers);