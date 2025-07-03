const ChatSchema = require('../models/chat.models');

const listMessage = async (req, res) => {
    const { user, person, msg } = req.body;

    if (!user || !person || !msg) {
        return res.status(400).json({ error: "user, person, and msg are required" });
    }

    let chat = await ChatSchema.findOne({ user, person });

    if (chat) {
        chat.msg.push(...(Array.isArray(msg) ? msg : [msg]));
        await chat.save();
        return res.json({ message: chat });
    } else {
        const createChat = await ChatSchema.create({
            user,
            person,
            msg: Array.isArray(msg) ? msg : [msg]
        });
        return res.json({
            message: "message send",
            data: createChat
        });
    }
};

const ChatController = {
    listMessage
};

module.exports = ChatController;