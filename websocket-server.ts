import express from 'express';
import * as http from 'http';
import * as path from 'path';
import WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Gérer les connexions WebSocket
wss.on('connection', (ws: WebSocket) => {
  console.log('Nouvelle connexion WebSocket');

  ws.on('message', (message: string) => {
    console.log('Message reçu:', message);
    // Diffuser le message à tous les clients (y compris Unity)
    wss.clients.forEach((client) => {
      console.log('Client URL:', client.url, 'Client readyState:', client.readyState, 'Client same as ws:', client === ws);
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
        console.log('Message diffusé:', message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Connexion WebSocket fermée');
  });
});

// Route catch-all pour l'application Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/touch-chef-angular/index.html'));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
