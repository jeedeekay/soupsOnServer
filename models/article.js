const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;