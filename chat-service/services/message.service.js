import { mongoDB } from "../models/index.js";
const Message = mongoDB.messageModel;

export const createMessage = async (senderId, receiverId, message) => {
  try {
    const messageCollection = new Message({
      sender_id: senderId,
      receiver_id: receiverId,
      message: message,
    });
    return await messageCollection.save();
  } catch (err) {
    console.log("createMessage: ", err);
    return null;
  }
};
