module.exports = {
  apps: [ {
    name: 'NestJs_app',
    timestamp: 'YYYY-MM-DD HH:mm Z',
    script: 'dist/main.js',
    watch: true,
    instances: 'max', // use only for cluster mode and set value from (1 - CPU_COUNT), putting max will automatically take the max cou count number
    exec_mode: 'cluster',

    // environments
    env_development: {
      NODE_ENV: 'development',
    },
    env_stage: {
      NODE_ENV: 'stage',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }, ],
};

/*  PM2 config file
    Commands
      1. pm2 start -> To start the server using pm2
      2. pm2 logs <process_id> -> To get logs of process
      3. pm2 stop <process_id> -> To stop the process
*/
