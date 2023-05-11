const mongoose = require ('mongoose');

const menuModel = new mongoose.Schema({
    name: String,
    owner: String,
    color: String,
    price: Number
});

const Menu = mongoose.model('Menu', menuModel);

module.exports = Menu;