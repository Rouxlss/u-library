const {Schema, model} = require('mongoose');

const bookSchema = new Schema ({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true
    },
    year: String,
    genre: String
},{
    timestamps: true
});

module.exports = model('Book', bookSchema);