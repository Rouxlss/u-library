const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI
    ? process.env.MONGODB_URI
    : 'mongodb+srv://newuser:password12345@library.e7whf.mongodb.net/library?retryWrites=true&w=majority';

console.log(URI)

mongoose.connect(URI, {
    useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is connected');
})

