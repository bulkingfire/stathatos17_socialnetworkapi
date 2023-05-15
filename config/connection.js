const mongoose = require('mongoose');



mongoose.connect('mongodb://127.0.0.1:8888/socialnetwork-api');



mongoose.set("debug", true);



module.exports = mongoose.connection;