module.exports = {
  apps: [
    {
      name: 'angular',
      script: 'ng',
      args: 'serve --host 0.0.0.0 --disable-host-check --port 4200',
      env: {
        NODE_ENV: 'development'
      }
    },
    {
      name: 'server',
      script: 'server/server.js',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      }
    }
  ]
}; 