import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkflowTask } from '../model/WorkflowTask';
import { WorkflowService } from '../services/WorkflowService';

@Module({
  imports: [SequelizeModule.forFeature([WorkflowTask])],
  providers: [WorkflowService],
  exports: [WorkflowService],
})
export class WorkflowModule {}
