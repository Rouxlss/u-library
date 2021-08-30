const {Schema, model} = require('mongoose');

const reservationSchema = new Schema ({
    id_user: {
        required: true,
        type: String
    },
    id_book: {
        required: true,
        type: String
    },
    book: {
        required: true,
        type: String
    },
    author: {
        required: true,
        type: String
    },
    student: {
        required: true,
        type: String
    },
},{
    timestamps: true
});

module.exports = model('Reservation', reservationSchema);