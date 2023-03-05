const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    steps: [],
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;