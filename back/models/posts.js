const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: String,
    likes: {
        type: Number,
        defaultValue: 0
    }
})

postSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Post', postSchema);