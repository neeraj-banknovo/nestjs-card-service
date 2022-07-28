import { Module, OnModuleInit } from '@nestjs/common';
import { DatabaseModule } from 'src/app/database/database.module';
import { LoggerService } from '../../shared/services/logger/logger.service';
import { SharedModule } from '../../shared/shared.module';
import { CardController } from './card.controller';
import { cardProviders } from './card.provider';
import { CardService } from './card.service';

@Module({
    imports: [
        SharedModule,
        DatabaseModule,
    ],
    controllers: [CardController],
    providers: [...cardProviders, CardService],
    exports: [CardService],
})
export class CardModule implements OnModuleInit {
    private readonly logger: LoggerService;
    constructor() {
        this.logger = new LoggerService(CardModule.name);
    }

    onModuleInit() {
        this.logger.log('Module initiated and ready');
    }
}
