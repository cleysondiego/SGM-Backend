interface IMailConfig {
  driver: 'ethereal';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'cleyson.dasilva@fatec.sp.gov.br',
      name: 'Sistema Gerenciador de Monitorias - Cleyson',
    },
  },
} as IMailConfig;
