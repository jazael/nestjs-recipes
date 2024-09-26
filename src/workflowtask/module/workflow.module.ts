import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkflowTask } from '../model/WorkflowTask';
import { WorkflowService } from '../services/WorkflowService';

@Module({
  imports: [SequelizeModule.forFeature([WorkflowTask])], // Asegúrate de tener esto
  providers: [WorkflowService],
  exports: [WorkflowService], // Si necesitas exportarlo a otros módulos
})
export class WorkflowModule {}
