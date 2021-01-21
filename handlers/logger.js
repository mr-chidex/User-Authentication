const { createLogger, transports, format } = require("winston");

const logger = createLogger({
    transports: [
        new transports.File({
            level: 'info',
            format: format.combine(format.json(), format.timestamp()),
            filename: "info.log"
        }),
        new transports.Console({
            level: 'info',
            format: format.combine(format.json(), format.timestamp())
        }),
        new transports.File({
            level: 'error',
            format: format.combine(format.json(), format.timestamp()),
            filename: "error.log"
        })
    ]
})

module.exports = logger;