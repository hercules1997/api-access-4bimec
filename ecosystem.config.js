module.exports = {
  apps: [
    {
      name: "api-access-4bimec",
      script: "node ./dist/server.js",
      watch: true,
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'production',
        HTTPS: true,
        SSL_KEY_FILE: '/home/backendacesso/api-acesso/api-access-4bimec/ssl-cert-snakeoil.key',
        SSL_CERT_FILE: '/home/backendacesso/api-acesso/api-access-4bimec/ssl-cert-snakeoil.pem',

      }
    }
  ]
};
