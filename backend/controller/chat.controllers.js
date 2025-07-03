const ChatSchema = require('../models/chat.models');

const sendMessage = async (req, res) => {
    const { user, person, msg } = req.body;

    if (!user || !person || !msg) {
        return res.status(400).json({ error: "user, person, and msg are required" });
    }

    let chat = await ChatSchema.findOne({ user, person });

    if (chat) {
        chat.msg.push(...(Array.isArray(msg) ? msg : [msg]));
        await chat.save();
        return res.status(200).json({ message: chat });
    } else {
        const createChat = await ChatSchema.create({
            user,
            person,
            msg: Array.isArray(msg) ? msg : [msg]
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
        let chat = await ChatSchema.findOne({ user, person });
        res.status(200).json({ messages: chat ? chat.msg : [] });
    } catch(error) {
        console.log("Error while fetching messages ", error);
        res.status(500).json({ message: "Failed to fetch message ", error: error.message });
    }
}

const ChatController = {
    sendMessage,
    listMessage
};

module.exports = ChatController;