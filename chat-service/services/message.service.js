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

export const getMessages = async (senderId, receiverId) => {
  try {
    let data = {};
    const messages = await Message.find({
      $or: [
        {
          $and: [
            {
              sender_id: senderId,
            },
            {
              receiver_id: receiverId,
            },
          ],
        },
        {
          $and: [
            {
              receiver_id: senderId,
            },
            {
              sender_id: receiverId,
            },
          ],
        },
      ],
    });

    data.items = messages.map((_) => ({
      senderId: _.sender_id,
      receiverId: _.receiver_id,
      text: _.message,
      timestamp: _.createdAt,
    }));

    return data;
  } catch (err) {
    console.log("getMessages: ", err);
    return null;
  }
};
