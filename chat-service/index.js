import { mongoDB } from "./models/index.js";
import { createMessage } from "./services/message.service.js";

export const connectDatabase = async () => {
  try {
    await mongoDB.mongoose.connect(mongoDB.url, {
      authSource: "admin",
    });
    console.log("Connected to the database!");
    // createMessage("7a9bfb83-9006-4369-b727-2d7ad85d1166", "670b4304-c8c0-456d-ad0c-5f2c2e3577c6", "Hello")
  } catch (err) {
    console.log("Cannot connect to the database!", err);
    process.exit();
  }
};

// connectDatabase()