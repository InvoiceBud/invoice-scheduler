import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import {
  WORKER_CREATE_INVOICE,
  WORKER_DAILY_INVOICE_OVERDUE,
  WORKER_INVOICE_OVERDUE_EMAIL_NOTIFICATION,
} from "../constants";
import { SchedulerRepository } from "../repositories/scheduler-repository";
import SchedulerService from "../services/scheduler";
import { EmailPayload, OverdueEmailData } from "../types/invoice";

const workers: FastifyPluginAsync = async (fastify, opts) => {
  const boss = fastify.boss;

  const schedulerRepository = new SchedulerRepository(fastify); 
  const schedulerService = new SchedulerService(schedulerRepository);

  await boss.work(WORKER_DAILY_INVOICE_OVERDUE, async () => {
    const result = await schedulerService.updateSentInvoiceToOverdueOnExpiryTime();

    for (let invoice of result) {
      const payload: OverdueEmailData = {
        invoice_id: invoice.id,
        user_id: invoice.user_id,
      };
      boss.send(WORKER_INVOICE_OVERDUE_EMAIL_NOTIFICATION, payload);
    }
  });

  await boss.work(WORKER_INVOICE_OVERDUE_EMAIL_NOTIFICATION, async ([job]) => {
    const data = job.data as OverdueEmailData;

    await schedulerService.sendEmailNotification(data); 
  });

  await boss.work(WORKER_CREATE_INVOICE, async ([job]) => { 
    const data = job.data as EmailPayload;
    
    await schedulerService.sendEmailCreateInvoice(data); 
  })
};

export default fp(workers);
