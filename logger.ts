import log4js from 'log4js';
log4js.configure({
  appenders: {
    file: {
      type: 'file',
      filename: 'logs/log.log',
      backups: 3,
      keepFileExt: true,
      maxLogSize: '2M'
    },
    app: { type: 'stdout' }
  },
  categories: {
    default: { appenders: ['file'], level: 'debug' },
    app: { appenders: ['app'], level: 'debug' }
  }
});

const appLogger = log4js.connectLogger(log4js.getLogger('app'), {});
const logger = log4js.getLogger();

export { appLogger, logger };
