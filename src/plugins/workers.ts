import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import {
  WORKER_DAILY_INVOICE_OVERDUE,
  WORKER_INVOICE_OVERDUE_EMAIL_NOTIFICATION,
} from "../constants";
import SchedulerService from "../services/scheduler";
import { OverdueEmailData } from "../types/invoice";

const workers: FastifyPluginAsync = async (fastify, opts) => {
  const boss = fastify.boss;

  const schedulerService = new SchedulerService(fastify);

  boss.work(WORKER_DAILY_INVOICE_OVERDUE, async () => {
    const result =
      await schedulerService.updateSentInvoiceToOverdueOnExpiryTime();
    fastify.log.info(`Daily invoice overdue updated`);

    for (let invoice of result) {
      const payload: OverdueEmailData = {
        invoice_id: invoice.id,
        user_id: invoice.user_id,
      };
      boss.send(WORKER_INVOICE_OVERDUE_EMAIL_NOTIFICATION, payload);
    }
  });

  boss.work(WORKER_INVOICE_OVERDUE_EMAIL_NOTIFICATION, async ([job]) => {
    const data = job.data as OverdueEmailData;

    await schedulerService.invoiceForEmailNotification(data); 
  });
};

export default fp(workers);
