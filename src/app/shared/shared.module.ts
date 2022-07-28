import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerService } from './services/logger/logger.service';
import { UtilService } from './services/util.service';

@Module({
    imports: [ConfigModule],
    controllers: [],
    providers: [UtilService],
    exports: [ConfigModule, UtilService],
})
export class SharedModule implements OnModuleInit {
    private readonly logger: LoggerService;
    constructor() {
        this.logger = new LoggerService(SharedModule.name);
    }

    onModuleInit() {
        this.logger.log('Module initiated and ready');
    }
}
