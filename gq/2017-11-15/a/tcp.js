var debug = require('debug')('gq');
var net = require('net');
const server = net.createServer((socket) => {
  socket.write('请输入你想输入的内容\n');
  socket.on('data', (data) => {
    let Data = data.toString();
    debug(Data);		
    let closeSocket = Buffer.from('closeSocket\r\n');
    let closeServer = Buffer.from('closeServer\r\n');
    if(Buffer.compare(data, closeSocket) === 0){
      socket.end();
    }
    if(Buffer.compare(data, closeServer) === 0){
      socket.end();
      server.close();
    }
  });
});
server.listen(process.env.NODE_POST || 8080, () => {
  debug('TCP开启');
});
