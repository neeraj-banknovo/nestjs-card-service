import { DataSource, } from 'typeorm';
import { PROVIDERS, } from '../../../common/constants/common.constants';
import { Card, } from '../entity/card.entity';

export const cardProviders = [
  {
    provide: PROVIDERS.CARD_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Card),
    inject: [ 'DATA_SOURCE', ],
  },
];
