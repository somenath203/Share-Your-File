const mongoose = require('mongoose');


const fileUrlSchema = new mongoose.Schema({
    pathOfFile: {
        type: String
    },
    nameOfFile: {
        type: String
    }
});


module.exports = mongoose.model('FileUrl', fileUrlSchema);