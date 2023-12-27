"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);

  var _https = require('https'); var _https2 = _interopRequireDefault(_https);
  const fs = require('fs');
//  // Criar servidor HTTPS
 const options = {
   key: fs.readFileSync('/etc/ssl/private/ssl-cert-snakeoil.key'),
   cert: fs.readFileSync('/etc/ssl/certs/ssl-cert-snakeoil.pem'),
 };

 const httpsServer = _https2.default.createServer(options, _app2.default);

  const httpsPort = process.env.HTTPS_PORT || 3008;

// const port = process.env.PORT || 3008;

  httpsServer.listen(httpsPort, () => {
    console.log(`Servidor HTTPS rodando na porta ${httpsPort}`);
  });

//app.listen(port, console.log(`servidor rodando na porta: ${port}`))


