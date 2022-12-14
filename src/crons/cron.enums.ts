import { CronExpression, } from '@nestjs/schedule';

export const CRON_EXPRESSION = {
  ...CronExpression,
  EVERY_20_SECONDS: '*/20 * * * * *',
  /*
        Add your custom cron expressions here.

        * * * * * *
        | | | | | |
        | | | | | day of week
        | | | | month
        | | | day of month
        | | hour
        | minute
        second (optional)

        Asterisk (e.g. *)
        Ranges (e.g. 1-3,5)
        Steps (e.g. * / 2)
        
     */
};
