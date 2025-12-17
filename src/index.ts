import index from '../public/index.html';

const server = Bun.serve({
  port: 3100,
  routes: {
    '/': index,
  },
  fetch(req, server) {
    // upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return; // do not return a Response
    }
    return new Response('Upgrade failed', { status: 500 });
  },
  websocket: {
    message(ws, message) {
      console.log({ ws, message });
    }, // a message is received
    open(ws) {
      console.log('Cliente conectado');
    }, // a socket is opened
    close(ws, code, message) {
      console.log('Cliente desconectado');
    }, // a socket is closed
    // drain(ws) {}, // the socket is ready to receive more data
  }, // handlers
});

console.log(`Escuchando puerto ${server.url}`);
