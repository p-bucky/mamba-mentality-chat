import express, { Router } from "express";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { getMessages } from "../chat-service/services/message.service.js";
import { connectDatabase } from "../chat-service/index.js";

const app = express();
const port = 3001;

(async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const VIEWS_DIR = resolve(__dirname, "./views");
  const ASSETS_DIR = resolve(__dirname, "./assets");

  await connectDatabase();
  app.set("view engine", "pug");
  app.set("views", VIEWS_DIR);
  app.use("/chatApp/static", express.static(ASSETS_DIR));

  const router = Router();

  router.get("/", async (req, res) => {
    try {
      let data = {};
      const senderId = req.query.personId;
      const receiverId = req.query.receiverId;

      const messages = await getMessages(senderId, receiverId);
      data.messages = messages.items;

      res.render("chat-screen.pug", { data });
      
    } catch (err) {
      res.json({ message: "Something went wrong" }).status(500);
    }
  });

  app.use("/chat", router);

  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
})();

// http://localhost:3001/chat?receiverId=670b4304-c8c0-456d-ad0c-5f2c2e3577c6&personId=7a9bfb83-9006-4369-b727-2d7ad85d1166
// http://localhost:3001/chat?personId=670b4304-c8c0-456d-ad0c-5f2c2e3577c6&receiverId=7a9bfb83-9006-4369-b727-2d7ad85d1166