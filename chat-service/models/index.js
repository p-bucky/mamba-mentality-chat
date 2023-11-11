import mongoose from "mongoose";
import messageModel from "./message.model.js";

const mongoDB = {};
mongoDB.mongoose = mongoose;
mongoDB.url = "mongodb://root:1234567890@localhost:27018/chatApp";
mongoDB.messageModel = messageModel(mongoose);

export { mongoDB };
