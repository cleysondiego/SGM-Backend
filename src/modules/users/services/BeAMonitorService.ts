import { injectable, inject } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IMonitoringRepository from '@modules/monitoring/repositories/IMonitoringRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  monitoring_id: string;
  name: string;
  zip_code: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  email: string;
  phone: string;
  hours_available: number;
  agency: string;
  account: string;
}

@injectable()
class BeAMonitorService {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('MonitoringRepository')
    private monitoringRepository: IMonitoringRepository,
  ) {}

  public async execute({
    monitoring_id,
    name,
    zip_code,
    street,
    neighborhood,
    city,
    state,
    email,
    phone,
    hours_available,
    agency,
    account,
  }: IRequest): Promise<void> {
    const monitoring = await this.monitoringRepository.findById(monitoring_id);

    if (!monitoring) {
      throw new AppError('Monitoring not found');
    }

    const beAMonitorTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'be_a_monitor.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: 'Adminstração',
        email: 'secretaria@fatecid.com.br',
      },
      subject: `[SGM - FatecID] Novo candidato à monitoria: ${monitoring.name}`,
      templateData: {
        file: beAMonitorTemplate,
        variables: {
          monitoria: monitoring.name,
          name,
          zip_code,
          street,
          neighborhood,
          city,
          state,
          email,
          phone,
          hours_available,
          agency,
          account,
        },
      },
    });
  }
}

export default BeAMonitorService;
