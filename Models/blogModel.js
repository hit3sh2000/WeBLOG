const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    likes: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})



module.exports = mongoose.model('Blog', blogSchema);

