import { Injectable, } from '@nestjs/common';
import { Cron, } from '@nestjs/schedule';
import { CRON_EXPRESSION, } from './cron.enums';
import { LoggerService, } from '../shared/services/logger.service';
import { CardService, } from '../modules/card/providers/card.service';

@Injectable()
export class CardCronHandler {
  private readonly logger: LoggerService = new LoggerService(CardCronHandler.name);

  constructor(
    // list your deps here
    private cardService: CardService
  ) {}

  @Cron(CRON_EXPRESSION.EVERY_5_SECONDS) // schedule(expression, new CardCronHandler().execute())
  async execute() {
    this.logger.log('Cron job started');
    try {
      // cron logic
      this.logger.log('See i am running...');

      const totalCards = await this.cardService.getNumberOfCards(); // using cardService provider
      this.logger.log(`Total card(s) => ${totalCards}`);
    } catch (error) {
      this.logger.error('Some error in cron job execution : ', error);
    }
  }
}
