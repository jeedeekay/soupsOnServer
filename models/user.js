const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const favRecSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recipe'
    }
    // recipeId: {
    //     type: String,
    //     required: true
    // }
});

const favArtSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }
});

const userSchema = new Schema({
    firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    favoriteRecipes: [favRecSchema],
    favoriteArticles: [favArtSchema],
    admin: {
        type: Boolean,
        default: false
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);