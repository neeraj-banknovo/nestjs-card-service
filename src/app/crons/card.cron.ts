import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CRON_EXPRESSION } from './cron.enums';
import { LoggerService } from '../shared/services/logger.service';
import { CardService } from '../modules/card/card.service';
import { UtilService } from '../shared/services/util.service';


@Injectable()
export class CardCronHandler {
  private readonly logger: LoggerService = new LoggerService(CardCronHandler.name);
  constructor(
    private cardService: CardService,
      private utilService: UtilService,
  ) {}

  @Cron(CRON_EXPRESSION.EVERY_5_SECONDS) // shedule(expression, new CardCronHandler().execute())
  async execute() {
    console.log('\n');
    this.logger.log('Cron job started');
    try {
      // cron logic
        this.logger.log('See i am running...');
        this.utilService.greetMe('Neeraj'); // using util provider
        
        const totalCards = await this.cardService.getNumberOfCards() // using cardService provider
        this.logger.log(`Total card(s) => ${totalCards}`);
    } catch (error) {
      this.logger.error('Some error in cron job execution : ', error);
    }
  }
}
