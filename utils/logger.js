const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(
      (param) => `${param.timestamp} ${param.level}: ${param.message}`
    )
  ),
  transports: [
    new transports.File({ filename: `${__dirname}/../logs/wcffutmx.log` })
  ]
});
