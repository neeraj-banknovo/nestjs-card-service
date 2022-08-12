import { Injectable } from '@nestjs/common';
const cluster = require('cluster');
import * as os from 'os';
import { LoggerService } from './shared/services/logger.service';

const env: NodeJS.ProcessEnv = process.env;

const CPU_COUNT = os.cpus().length;
env['UV_THREADPOOL_SIZE'] = String(CPU_COUNT);

@Injectable()
export class ClusterService {
    private static readonly logger = new LoggerService(ClusterService.name);
    static scale(callback: Function): void {
        if (cluster.isMaster) {
            this.logger.log(`Master cluster setting up ${CPU_COUNT} workers....`);
            for (let i = 0; i < CPU_COUNT; i++) {
                cluster.fork();
            }

            cluster.on('online', (worker: any) => {
                this.logger.log(`Worker ${worker.process.pid} online`);
            });

            cluster.on('exit', (worker: any) => {
                this.logger.log(`Worker ${worker.process.pid} died`);
                ClusterService.respawnWorker;
            });
        } else {
            callback();
        }
    }

    static respawnWorker(code: any, signal: any) {
        this.logger.log(`Worker exited with code=${code} signal=${signal}`);
        this.logger.log(`Starting new worker...`);
        cluster.fork();
    }
}