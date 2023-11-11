import { UUID } from "mongodb";

const messageModel = (mongoose) => {
  const Message = mongoose.model(
    "message",
    mongoose.Schema(
      {
        sender_id: {
          type: UUID,
          required: true,
        },
        receiver_id: {
          type: UUID,
          required: true,
        },
        message: {
          type: String,
          require: true,
        },
      },
      { timestamps: true }
    )
  );

  return Message;
};

export default messageModel;
