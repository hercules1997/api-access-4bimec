import app from "./app"
import { networkInterfaces }  from 'os'

const interfaces = networkInterfaces();

// Procura por uma interface de rede não interna com um endereço IPv4
const ip = Object.values(interfaces)
  .flat()
  .find(interfaceInfo => interfaceInfo.family  === 'IPv4' && !interfaceInfo.internal)


if(ip) {
    console.log('endereço de ip', ip.address)
}

export const ipMachine = ip.address
const port = process.env.PORT || 3008;

app.listen(port, console.log(`servidor rodando no endereço de IP: ${ipMachine} na porta: ${port}`))

