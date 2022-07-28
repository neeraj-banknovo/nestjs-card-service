import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCardPayload, GetCardParamsDto, GetCardsParamsDto } from './card.dto';
import { ICard } from './card.interface';
import { CardService } from './card.service';

@Controller('card')
export class CardController {
    constructor(
        private readonly cardService: CardService
    ) { }

    @Get(':userId/:accountId')
    getAllCards(@Param() params: GetCardsParamsDto): Promise<[ICard[], number]> {
        const { userId, accountId } = params;
        return this.cardService.listCards(userId, accountId);
    }

    @Get(':id')
    findOneDocument(@Param() params: GetCardParamsDto): Promise<ICard> {
        return this.cardService.getCard(params.id);
    }
    
    @Post()
    @UsePipes(ValidationPipe)
    createCard(@Body() body: CreateCardPayload): Promise<Record<string, any>> {
        return this.cardService.createCard(body.data);
    }
}
