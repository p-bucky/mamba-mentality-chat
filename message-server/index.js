import express, { Router } from "express";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = 3001;

(() => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const VIEWS_DIR = resolve(__dirname, "./views");
  const ASSETS_DIR = resolve(__dirname, "./assets");

  app.set("view engine", "pug");
  app.set("views", VIEWS_DIR);
  app.use("/chatApp/static", express.static(ASSETS_DIR));

  const router = Router();

  router.get("/", (req, res) => {
    res.render("chat-screen.pug");
  });

  app.use("/chat", router);

  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });
})();
