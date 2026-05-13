const WebSocket = require('ws');
const net = require('net');

const wss = new WebSocket.Server({ port: process.env.PORT || 8081 });

wss.on('connection', function(ws) {
  var tcp = net.createConnection(25565, 'koleliksmp.kum.redstone.tr');
  
  ws.on('message', function(data) { tcp.write(data); });
  tcp.on('data', function(data) { ws.send(data); });
  
  ws.on('close', function() { tcp.destroy(); });
  tcp.on('close', function() { ws.close(); });
  
  ws.on('error', function() { tcp.destroy(); });
  tcp.on('error', function() { ws.close(); });
});

console.log('Proxy calisiyor');
