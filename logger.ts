import log4js from "log4js";
log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'stdout' }
  },
  categories: {
    default: { appenders: ['out'], level: 'debug' },
    app: { appenders: ['app'], level: 'debug' }
  }
});

const appLogger = log4js.connectLogger( log4js.getLogger('app'), {} )
const logger = log4js.getLogger();

export { appLogger, logger };
