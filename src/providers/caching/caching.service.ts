import { CACHE_MANAGER, Inject, Injectable, } from '@nestjs/common';
import { Cache, } from 'cache-manager';
import { cachingConfig, } from '../../config/config';

const defaultTTL = cachingConfig().ttl;

@Injectable()
export class CachingService {
  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get(key: string): Promise<any> {
    return this.cache.get(key);
  }

  async set(key: string, value: any) {
    return this.cache.set(key, value, defaultTTL);
  }

  async reset() {
    return this.cache.reset();
  }

  async del(key: string) {
    return this.cache.del(key);
  }
}
