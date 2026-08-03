import { SchedulerRepository } from "../repositories/scheduler-repository";
import { EmailPayload, OverdueEmailData } from "../types/invoice";
import EmailService from "./email";

class SchedulerService {
  constructor(private schedulerRepository: SchedulerRepository) {
    this.schedulerRepository = schedulerRepository; 
  }

  public async updateSentInvoiceToOverdueOnExpiryTime() { 
    return await this.schedulerRepository.updateSentInvoiceToOverdueOnExpiryTime(); 
  }

  public async sendEmailNotification(data: OverdueEmailData) {
    const invoice = await this.schedulerRepository.fetchInvoice(data.invoice_id); 
    const user = await this.schedulerRepository.fetchUser(data.user_id); 

    await EmailService.sendOverdueInvoiceMail(invoice, user);
  }

  public async sendEmailCreateInvoice(data: EmailPayload) { 
    const client = await this.schedulerRepository.fetchClient(data.client_id); 
    const user = await this.schedulerRepository.fetchUser(data.user_id); 

    await EmailService.sendInvoiceToClient(data, client, user); 
  }
}

export default SchedulerService;
