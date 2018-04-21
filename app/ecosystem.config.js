module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // Storecoin Production (master)
    {
      name      : 'storecoin',
      script    : './bin/storecoin',
      cwd       : '/srv/happycoin/app',
      instances : 'max',
      exec_mode : 'cluster',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]

};
