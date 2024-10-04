const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true
    },
    friends:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    email: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
})

userSchema.plugin(plm); // plugin for passport local mongoose authentication

const userModel = mongoose.model('User',userSchema);
module.exports = userModel;
