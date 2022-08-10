import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PROVIDERS } from '../../shared/shared.constants';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { ICard } from './card.interface';
import { CreateCardDto } from './card.dto';
import { UtilService } from '../../shared/services/util.service';
import { LoggerService } from '../../shared/services/logger.service';

@Injectable()
export class CardService {
    private logger: LoggerService = new LoggerService(CardService.name);
    constructor(
        @Inject(PROVIDERS.CARD_REPOSITORY) private readonly cardRepository: Repository<Card>,
        private readonly utilService: UtilService,
    ) { }

    public async listCards(user_id: string, account_id: string): Promise<[ICard[], number]> {
        return this.cardRepository.findAndCount({
            where: {
                user_id,
                account_id
            }
        })
    }
    
    public async getCard(card_id: string): Promise<ICard> {
        try {
            const card = await this.cardRepository.findOne({
                where: {
                    id: card_id
                }
            });
            if (!card) throw new NotFoundException('Card not found');                
            return card;
        } catch (error) {
            throw error;
        }
    }
    
    public async createCard(data: CreateCardDto): Promise<Record<string, any>> {
        const { account_id, user_id, nick_name } = data;
        const card = this.utilService.generateCard();
        const cardData: Card = {
            account_id,
            user_id,
            nick_name,
            ...card
        } as any;
        const newCard = await this.cardRepository.save(cardData);
        return {
            id: newCard.id,
            last_four: newCard.last_four
        };
    }

    public async getNumberOfCards(): Promise<number> {
        return this.cardRepository.count();
    }

    public templateFunction<T>(value: T): T { 
        return value;
    }
}
