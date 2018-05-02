module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // Storecoin Orange (master)
    {
      name      : 'st-orange',
      script    : './bin/storecoin',
      cwd       : '/srv/st-orange/app',
      env: {
        PORT:     3015,
        NODE_ENV: 'production'
      }
    }
  ]

};
