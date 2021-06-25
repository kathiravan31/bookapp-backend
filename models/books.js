const { Schema, model} = require('mongoose');

const BookSchema = new Schema({
    title: String,
    author: String,
    price: String,
    book_image: String,
    description: String,
    buy_links: [],
    createdAt: String,
    username: String,

});

module.exports = model('Books',BookSchema);