const ChatSchema = require('../models/chat.models');

const sendMessage = async (req, res) => {
    const { user, person, msg } = req.body;

    if (!user || !person || !msg) {
        return res.status(400).json({ error: "user, person, and msg are required" });
    }

    const participants = [user, person].sort();
    let chat = await ChatSchema.findOne({ participants });

    const messageObj = {
        text: Array.isArray(msg) ? msg[0] : msg,
        sender: user,
        timestamp: new Date()
    };

    if (chat) {
        chat.msg.push(messageObj);
        chat.updatedAt = new Date();
        await chat.save();
        return res.status(200).json({ message: chat });
    } else {
        const createChat = await ChatSchema.create({
            participants,
            msg: [messageObj],
            createdAt: new Date(),
            updatedAt: new Date()
        });
        return res.status(200).json({
            message: "message send",
            data: createChat
        });
    }
};

const listMessage = async (req, res) => {
    try{
        const { user, person } = req.body;
        const participants = [user, person].sort();
        let chat = await ChatSchema.findOne({ participants });
        res.status(200).json({ messages: chat ? chat.msg : [] });
    } catch(error) {
        console.log("Error while fetching messages ", error);
        res.status(500).json({ message: "Failed to fetch message ", error: error.message });
    }
}

const getLastMessage = async (req, res) => {
  try {
    const { user, person } = req.body;
    const participants = [user, person].sort();
    const chat = await ChatSchema.findOne({ participants });
    if (chat && chat.msg.length > 0) {
      const lastMsg = chat.msg[chat.msg.length - 1];
      res.json({ lastMsg, totalMsgs: chat.msg.length });
    } else {
      res.json({ lastMsg: null, totalMsgs: 0 });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch last message", error: error.message });
  }
};

const ChatController = {
    sendMessage,
    listMessage,
    getLastMessage
};

module.exports = ChatController;