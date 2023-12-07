"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);
var _os = require('os');
var _http = require('http'); var _http2 = _interopRequireDefault(_http);
var _https = require('https'); var _https2 = _interopRequireDefault(_https);
const fs = require('fs');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;


const interfaces = _os.networkInterfaces.call(void 0, );


_app2.default.use(redirectToHTTPS());

// Criar servidor HTTP
const httpServer = _http2.default.createServer(_app2.default);

// Criar servidor HTTPS
const options = {
  key: fs.readFileSync('/home/backendacesso/api-acesso/api-access-4bimec/chave-privada.pem'),
  cert: fs.readFileSync('/home/backendacesso/api-acesso/api-access-4bimec/certificado.pem'),
};


const httpsServer = _https2.default.createServer(options, _app2.default);

const httpPort = process.env.HTTP_PORT || 3007;
const httpsPort = process.env.HTTPS_PORT || 3008;
// Procura por uma interface de rede não interna com um endereço IPv4
const ip = Object.values(interfaces)
  .flat()
  .find(interfaceInfo => interfaceInfo.family  === 'IPv4' && !interfaceInfo.internal)


if(ip) {
    console.log('endereço de ip', ip.address)
}

 const ipMachine = ip.address; exports.ipMachine = ipMachine
const port = process.env.PORT || 3008;

httpServer.listen(httpPort, () => {
  console.log(`Servidor HTTP rodando na porta ${httpPort}`);
});

httpsServer.listen(httpsPort, () => {
  console.log(`Servidor HTTPS rodando na porta ${httpsPort}`);
});

//app.listen(port, console.log(`servidor rodando no endereço de IP: ${ipMachine} na porta: ${port}`))

