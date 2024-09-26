import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { User } from './common/decorators/custom.decorator';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { JwtUtilService } from './services/jwt-util.service';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { ValidationService } from './validation/services/ValidationService';
import { validateOrReject } from 'class-validator';
import { WorkflowService } from './workflowtask/services/WorkflowService';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtUtilService: JwtUtilService,
    private readonly validationService: ValidationService,
    private readonly workflowService: WorkflowService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user-data')
  @UseGuards(JwtAuthGuard)
  getUserProfile(@User() user: any) {
    return { message: `Bienvenido ${user.name}` };
  }

  @Get('generate-token')
  generateJwtToken() {
    const payload = { id: 1, name: 'Miguel', lastname: 'Faubla' };
    const token = this.jwtUtilService.generateToken(payload);
    return { token };
  }

  @Post('/validation-pipe')
  @UsePipes(new ValidationPipe())
  createProduct(@Body('name') name: string) {
    return { message: `Producto creado: ${name}` };
  }

  // Validaciones dinamicas
  @Post('/dinamic-validation')
  async createEntity(@Query('entity') entity: string, @Body() body: any) {
    const DynamicDto = await this.validationService.createDynamicDto(entity);

    const dtoInstance = new DynamicDto();

    Object.assign(dtoInstance, body);

    console.log(dtoInstance);

    try {
      await validateOrReject(dtoInstance);
    } catch (errors) {
      throw new BadRequestException(errors);
    }

    return { message: 'Validación y persistencia exitosa' };
  }

  @Get('/workflow-dinamic/:id')
  async executeTask(@Param('id') taskId: number) {
    const result = await this.workflowService.executeTask(taskId);
    return result;
  }
}
