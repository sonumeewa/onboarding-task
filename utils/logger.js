const { createLogger, transports, format } = require('winston');
const customLevels = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  colors: {
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red',
  },
};

const logger = createLogger({
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = logger;
