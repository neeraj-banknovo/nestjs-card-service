import { Module, OnModuleInit, Provider, } from '@nestjs/common';
import { ScheduleModule, } from '@nestjs/schedule';
import { LoggerService, } from '../shared/services/logger.service';
import { SharedModule, } from '../shared/shared.module';
import { CardCronHandler, } from './card.cron';
import { CardModule, } from '../modules/card/card.module';

/*
    CRON_JOBS is a collection of all cron jobs to be executed in system
 */

const CRON_JOBS: Provider[] = [
  CardCronHandler,
];

/*
    CRON_JOBS_DEPS is a collection of all cron jobs dependencies.
    Add your dependencies as required
 */

const CRON_JOBS_DEPS = [
  ScheduleModule.forRoot(),
  SharedModule,
  CardModule,
];

@Module({
  imports: [ ...CRON_JOBS_DEPS, ],
  providers: [ ...CRON_JOBS, ],
  exports: [ ...CRON_JOBS, ],
})
export class CronJobModule implements OnModuleInit {
  private readonly logger = new LoggerService(CronJobModule.name);

  constructor() { }

  onModuleInit() {
    this.logger.log('Initiated and ready');
  }
}
