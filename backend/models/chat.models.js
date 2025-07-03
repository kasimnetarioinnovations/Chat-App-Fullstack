const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    participants: [String],
    msg: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Chats', ChatSchema);