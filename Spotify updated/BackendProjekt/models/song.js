const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SongSchema = new Schema({

    filename: {                  //pfad
        type: String,
        required: true
    },
    title: {                  //songname
        type: String,
        required: true
    },
    artist: {                //künstler
        type: String,
        required: true
    },
    album: {
        type: String,
        default: "single"
    },
    rating: {
        type: Number,
        default: 0
    },
    image: Buffer
});

var SongModel = mongoose.model('Song', SongSchema);

module.exports = SongModel;