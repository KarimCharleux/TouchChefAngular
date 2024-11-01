const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('Nouvelle connexion établie');

  ws.on('message', function incoming(message) {
    console.log('Message reçu:', message.toString());

    // Renvoi le message à tous les clients connectés
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

console.log('Serveur WebSocket démarré sur le port 8080');
