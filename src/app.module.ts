import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { JwtUtilService } from './services/jwt-util.service';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CustomLoggerMiddleware } from './common/middleware/customlogger.middleware';
import { SequelizeModule } from '@nestjs/sequelize';
import { FieldValidation } from './validation/model/FieldValidation';
import { ValidationService } from './validation/services/ValidationService';
import { WorkflowService } from './workflowtask/services/WorkflowService';
import { WorkflowTask } from './workflowtask/model/WorkflowTask';
import { WorkflowModule } from './workflowtask/module/workflow.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1314011915.',
      database: 'sistema_matricula',
      models: [FieldValidation, WorkflowTask],
      synchronize: true,
    }),
    JwtModule.register({
      secret:
        'gGZXYBgI4NE4lENxS1qSrWVIM3TPdTaRFDL2ogxJEbz2bEQQRJBuX1EvfsN7aujanKIcIZC4BXWpkJdpsrj1fwMtApnxynBfRVoyhRjeB7McEDd3mp7WSP7MN8RkdXkk',
      signOptions: { expiresIn: '60m' },
    }),
    WorkflowModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtAuthGuard,
    JwtUtilService,
    ValidationService,
    // WorkflowService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer.apply(CustomLoggerMiddleware).forRoutes('*');
  }
}
