const ChatSchema = require('../models/chat.models');

const listMessage = async (req, res) => {
    const user = req.body.userId;
    const person = req.body.personId;

    const checkUserChat = await ChatSchema.findOne({ userId: user});

    if(checkUserChat){
        const { msg } = req.body;
        const chat = await ChatSchema.findByIdAndUpdate(req.params.userId, {msg}, {new: true, runValidators: true});
        res.json({ message: chat });
    } else {
        const createChat = await ChatSchema.create(req.body)
        res.json({
            message: "working",
            data: createChat
        });
    }
}

const ChatController = {
    listMessage
};

module.exports = ChatController;