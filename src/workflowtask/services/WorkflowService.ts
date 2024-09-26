import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WorkflowTask } from '../model/WorkflowTask';

@Injectable()
export class WorkflowService {
  constructor(
    @InjectModel(WorkflowTask)
    private workflowTaskModel: typeof WorkflowTask,
  ) {}

  async executeTask(taskId: number): Promise<any> {
    const task = await this.workflowTaskModel.findByPk(taskId);
    if (!task) throw new Error('Task not found');

    const nextStep = await this.determineNextStep(task);

    await this.updateTaskStatus(task);

    return {
      currentTask: task.taskname,
      status: task.status,
      nextStep: nextStep?.taskname || null,
    };
  }

  private async determineNextStep(
    task: WorkflowTask,
  ): Promise<WorkflowTask | null> {
    if (!task.nextstep) return null;

    const nextTask = await this.workflowTaskModel.findOne({
      where: { taskname: task.nextstep },
    });

    if (nextTask && this.checkConditions(task.conditions)) {
      return nextTask;
    }

    return null;
  }

  private checkConditions(conditions: any): boolean {
    if (conditions?.condition === 'none') return true;
    return false;
  }

  private async updateTaskStatus(task: WorkflowTask): Promise<void> {
    task.status = 'completed';
    await task.save();
  }
}
