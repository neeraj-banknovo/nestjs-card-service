import { PROVIDERS } from '../../shared/shared.constants';
import { DataSource } from 'typeorm';
import { Card } from './card.entity';

export const cardProviders = [
  {
    provide: PROVIDERS.CARD_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Card),
    inject: ['DATA_SOURCE'],
  },
];