import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from '../../shared/shared.constants';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { ICard } from './card.interface';
import { CreateCardDto } from './card.dto';
import { UtilService } from 'src/app/shared/services/util.service';

@Injectable()
export class CardService {
    constructor(@Inject(PROVIDERS.CARD_REPOSITORY)
    private readonly cardRepository: Repository<Card>,
    private readonly utilService: UtilService) { }

    public async listCards(user_id: string, account_id: string): Promise<[ICard[], number]> {
        return this.cardRepository.findAndCount({
            where: {
                user_id,
                account_id
            }
        })
    }
    
    public async getCard(card_id: string): Promise<ICard> {
        return this.cardRepository.findOne({
            where: {
                id: card_id
            }
        });
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
}
