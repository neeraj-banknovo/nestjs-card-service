import { Module, OnModuleInit } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthController } from './health.controller';
import { LoggerService } from '../shared/services/logger.service';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
})
export class HealthTerminusModule implements OnModuleInit {
  private readonly logger: LoggerService;

  constructor() {
    this.logger = new LoggerService(HealthTerminusModule.name);
  }

  onModuleInit() {
    this.logger.log('Initiated and ready');
  }
}
