const {createLogger, transports, format} = require('winston');

const logger = createLogger({
    format: format.combine(
        format.label({
            label: `🚀`
        }),
        format.timestamp({
           format: 'MMM-DD-YYYY HH:mm:ss'
       }),
        format.printf(info => `[${info.level}]: [${info.label}]: ${[info.timestamp]}: ${info.message}`),
    ),
    level: 'silly',
    transports: [
        new transports.Console(),
        new transports.File({filename: 'api.log'})
    ]
});

module.exports = logger;