import { Controller, Get, } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get('/health')
  public getHealth(): Record<string, any> {
    return { message: 'Health OK!', };
  }

  @Get()
  public getAppStatus(): Record<string, any> {
    return { message: 'app is up and running!', };
  }
}
