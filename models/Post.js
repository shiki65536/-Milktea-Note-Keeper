const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'users'
    // },
    title: {
        type: String,
    },
    text: {
        type: String,
        require: true
    },
    star: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = Post = mongoose.model('post', PostSchema)