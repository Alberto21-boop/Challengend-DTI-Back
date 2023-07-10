const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'api.log' }),
  ],
});


app.use((req, res, next) => {
  const startTime = new Date();

  res.on('finish', () => {
    const endTime = new Date();
    const elapsedTime = endTime - startTime;

    logger.info(`Request ${req.method} ${req.originalUrl} processed in ${elapsedTime}ms`);
  });

  next();
});
