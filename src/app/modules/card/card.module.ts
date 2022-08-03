import { Module, OnModuleInit, Provider } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { LoggerService } from '../../shared/services/logger.service';
import { SharedModule } from '../../shared/shared.module';
import { CardController } from './card.controller';
import { cardProviders } from './card.provider';
import { CardService } from './card.service';
import { Card1Module, SomeExistingClass } from './card1.module';

export interface ObjectMethods { 
    hello: (name: string) => void;
}

async function setTimeOut() {
    setTimeout(() => {
        console.log('i was loaded in async mode by UseFactory way');
    }, 5000);
}

const injectableObject: ObjectMethods = {
    hello: (name) => { 
        console.log(`Hello ${name}`);
    }
}

const providers: Provider[] = [
    {
        provide: CardService, // use class -> default
        useClass: CardService,
    },
    {
        provide: 'myObject', // use value
        useValue: injectableObject,
    },
    {
        provide: 'someNickName', // use existing
        useExisting: SomeExistingClass, // here the SomeExisting must be resolved before using in useExisting context
    },
    {
        provide: 'ASYNC_LOADING', // use factory -> used for async injection
        useFactory: async () => {
            const object = await setTimeOut();
            return object;
        },
    }
];

@Module({
    imports: [
        SharedModule,
        DatabaseModule,
        Card1Module
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

// controller | service (providelayer) | repositoty -> DB

// 
