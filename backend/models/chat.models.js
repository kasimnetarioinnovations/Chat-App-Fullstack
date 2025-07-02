const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    person: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    msg: {
        type: [String],
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Chats', ChatSchema);