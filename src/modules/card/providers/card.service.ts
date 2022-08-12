import { Inject, Injectable, NotFoundException, } from '@nestjs/common';
import { Repository, } from 'typeorm';
import { PROVIDERS, } from '../../../common/constants';
import { Card, } from '../entity/card.entity';
import { ICard, } from '../card.interface';
import { CreateCardDto, } from '../dto/card.dto';
import { UtilService, } from '../../../shared/services/util.service';
import { LoggerService, } from '../../../shared/services/logger.service';
import { CachingService, } from '../../../providers/caching/caching.service';

@Injectable()
export class CardService {
  private logger: LoggerService = new LoggerService(CardService.name);

  constructor(
    @Inject(PROVIDERS.CARD_REPOSITORY) private readonly cardRepository: Repository<Card>,
    private readonly utilService: UtilService,
    private readonly cachingService: CachingService
  ) { }

  public async listCards(user_id: string): Promise<[ICard[], number]> {
    return this.cardRepository.findAndCount({
      where: {
        user_id,
      },
    });
  }

  public async getCard(card_id: string): Promise<ICard> {
    try {
      const card = await this.cardRepository.findOne({
        where: {
          id: card_id,
        },
      });
      if (!card) throw new NotFoundException('Card not found');
      return card;
    } catch (error) {
      throw error;
    }
  }

  public async createCard(data: CreateCardDto): Promise<Record<string, any>> {
    const { account_id, user_id, nick_name, } = data;
    const card = this.utilService.generateCard();
    const cardData: Card = {
      account_id,
      user_id,
      nick_name,
      ...card,
    } as any;
    const newCard = await this.cardRepository.save(cardData);
    return {
      id: newCard.id,
      last_four: newCard.last_four,
    };
  }

  public async getNumberOfCards(): Promise<number> {
    return this.cardRepository.count();
  }

  public templateFunction<T>(value: T): T {
    return value;
  }
}
