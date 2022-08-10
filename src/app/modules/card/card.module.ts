import { MiddlewareConsumer, Module, NestModule, OnModuleInit, Provider, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { LoggerService } from '../../shared/services/logger.service';
import { SharedModule } from '../../shared/shared.module';
import { CardController } from './card.controller';
import { cardProviders } from './card.provider';
import { CardService } from './card.service';

const providers: Provider[] = [
    CardService,
];

@Module({
    imports: [
        SharedModule,
        DatabaseModule,
    ],
    controllers: [CardController],
    providers: [...cardProviders, ...providers], 
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