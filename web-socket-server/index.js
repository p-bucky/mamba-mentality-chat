import ws, { WebSocketServer } from "ws";
import url from "node:url";
import wsManager, { managerDB } from "./manager.js";
import { connectDatabase } from "../chat-service/index.js";
import { createMessage } from "../chat-service/services/message.service.js";

const PORT = 3002;

const BEAT_VALUE = 1;

const broadcast = (gatewayId, msg, wss) => {
  for (const client of wss.clients) {
    // console.log(client.readyState === ws.OPEN, client.id);
    if (client.id == gatewayId && client.readyState === ws.OPEN) {
      client.send(msg);
    }
  }
};

const heartbeatCheck = (ws) => {
  let __heartCheckTimeout = null;

  const init = (msg) => {
    if (msg == BEAT_VALUE && ws.readyState === ws.OPEN) {
      __heartCheckTimeout && clearTimeout(__heartCheckTimeout);
      __heartCheckTimeout = setTimeout(() => {
        wsManager.deleteOnlineUser(ws.id);
        ws.close();
        console.log("CONNECTION CLOSED", ws.id);
      }, 5000);
    }
  };

  return {
    init,
  };
};

const startWebsocketServer = () => {
  const wss = new WebSocketServer({ port: PORT }, () => {
    console.log(`[web-socket-server] Running at ${PORT}`);
  });

  wss.on("connection", function connection(ws, req) {
    const location = url.parse(req.url, true);
    const personId = location.query.personId;
    const receiverId = location.query.receiverId;

    ws.id = `CONNECTION_ID_${personId}`;

    // console.log(`Client ${personId} connected by ${ws.id}`);

    wsManager.setOnlineUser(personId, ws.id);

    const heartbeat = heartbeatCheck(ws);

    ws.on("message", async function message(data) {
      heartbeat.init(data);

      if (data != BEAT_VALUE) {
        const _message = data.toString();

        const msg = await createMessage(personId, receiverId, _message);

        ws.send(msg.message);

        if (managerDB[receiverId]) {
          broadcast(managerDB[receiverId], msg.message, wss);
        } else {
          // send notification using kafka
        }
      }
    });
  });

  return wss;
};

(async () => {
  try {
    await connectDatabase();
    startWebsocketServer();
  } catch (err) {
    console.log(`[web-socket-server] Failed to run ${err}`);
  }
})();
