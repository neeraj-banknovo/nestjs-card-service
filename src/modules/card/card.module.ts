import { Module, OnModuleInit, Provider, } from '@nestjs/common';
import { CachingModule, } from '../../providers/caching/caching.module';
import { DatabaseModule, } from '../../providers/database/database.module';
import { LoggerService, } from '../../shared/services/logger.service';
import { SharedModule, } from '../../shared/shared.module';
import { cardProviders, } from './providers/card.provider';
import { CardService, } from './providers/card.service';
import { CardResolver, } from './resolver/card.resolver';

const providers: Provider[] = [
  CardService,
];

@Module({
  imports: [
    SharedModule,
    DatabaseModule,
    CachingModule,
  ],
  providers: [ CardResolver, ...cardProviders, ...providers, ],
  exports: [ CardService, ],
})
export class CardModule implements OnModuleInit {
  private readonly logger: LoggerService;

  constructor() {
    this.logger = new LoggerService(CardModule.name);
  }

  onModuleInit() {
    this.logger.log('Module initiated and ready');
  }
}
