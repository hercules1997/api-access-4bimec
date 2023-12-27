import app from "./app"

  import https from "https"
  const fs = require('fs');
//  // Criar servidor HTTPS
 const options = {
   key: fs.readFileSync('/etc/ssl/private/ssl-cert-snakeoil.key'),
   cert: fs.readFileSync('/etc/ssl/certs/ssl-cert-snakeoil.pem'),
 };

 const httpsServer = https.createServer(options, app);

  const httpsPort = process.env.HTTPS_PORT || 3008;

// const port = process.env.PORT || 3008;

  httpsServer.listen(httpsPort, () => {
    console.log(`Servidor HTTPS rodando na porta ${httpsPort}`);
  });

//app.listen(port, console.log(`servidor rodando na porta: ${port}`))


