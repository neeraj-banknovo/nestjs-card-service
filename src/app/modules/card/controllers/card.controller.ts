import { Body, Controller, Get, Param, Post, } from '@nestjs/common';
import { CreateCardPayload, GetCardParamsDto, GetCardsParamsDto, } from '../dto/card.dto';
import { ICard, } from '../card.interface';
import { CardService, } from '../providers/card.service';

@Controller('card')
export class CardController {
  constructor(
    private readonly cardService: CardService
  ) {}

  @Get(':userId/list')
  getAllCards(@Param() params: GetCardsParamsDto): Promise<[ICard[], number]> {
    const { userId, } = params;
    return this.cardService.listCards(userId);
  }

  @Get(':id')
  findOneDocument(@Param() params: GetCardParamsDto): Promise<ICard> {
    return this.cardService.getCard(params.id);
  }

  @Post()
  createCard(@Body() body: CreateCardPayload): Promise<Record<string, any>> {
    return this.cardService.createCard(body.data);
  }
}
