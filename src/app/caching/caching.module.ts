import { CacheModule, Module, OnModuleInit, } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { cachingConfig, } from '../config/config';
import { LoggerService, } from '../shared/services/logger.service';
import { CachingService, } from './caching.service';

@Module({
  imports: [ CacheModule.register({
    store: redisStore,
    host: cachingConfig().host,
    port: cachingConfig().port,
    ttl: cachingConfig().ttl,
    max: cachingConfig().max_item,
  }), ],
  providers: [ CachingService, ],
  exports: [ CachingService, ],
})
export class CachingModule implements OnModuleInit {
  private readonly logger = new LoggerService(CachingModule.name);

  constructor() { }

  onModuleInit() {
    this.logger.log('Initiated and ready');
  }
}
