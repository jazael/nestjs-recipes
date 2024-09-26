import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as winston from 'winston';

@Injectable()
export class CustomLoggerMiddleware implements NestMiddleware {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/combined.log' }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error',
        }),
      ],
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    this.logger.info(`Incoming request: ${method} ${originalUrl}`);

    res.on('finish', () => {
      const { statusCode } = res;
      const processingTime = Date.now() - startTime;

      if (statusCode >= 500) {
        this.logger.error(
          `Response for ${method} ${originalUrl} failed with status ${statusCode} in ${processingTime}ms`,
        );
      } else if (statusCode >= 400) {
        this.logger.warn(
          `Response for ${method} ${originalUrl} returned with status ${statusCode} in ${processingTime}ms`,
        );
      } else {
        this.logger.info(
          `Response for ${method} ${originalUrl} succeeded with status ${statusCode} in ${processingTime}ms`,
        );
      }
    });

    next();
  }
}
