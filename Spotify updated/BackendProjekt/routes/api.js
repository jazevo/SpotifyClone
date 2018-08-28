const songModel = require('../models/song.js');
const playlistModel = require('../models/playlist.js');
const express = require('express');
const fileSystem = require('fs-extra');
const nodeID3 = require('node-id3');

const songFolder = './songs/';
const maxFileBuffer = 50331641;


// songs

// Nur zu Debugzwecken. Kann gelöscht werden, wenn nicht mehr gebraucht!
exports.deleteAllSongs = (req, res) => {

    songModel.remove({})
        .then(() => {
            res.status(200);
            res.send('All songs are gone!');
        })
        .catch((err) => {
            console.log(err);
            res.status(400).end();
        })
};

exports.initSongs = (req, res) => {
    fileSystem.readdir(songFolder, (err, item) => {

        for (let i = 0; i < item.length; i++) {
            const readFile = nodeID3.read(songFolder + item[i]);

            if(readFile.image.imageBuffer.length === maxFileBuffer) {
                readFile.image.imageBuffer = null;
            }

            const newsong = new songModel({
                filename: item[i],
                title: readFile.title,
                artist: readFile.artist,
                album: readFile.album,
                image: readFile.image.imageBuffer
            });

            songModel.findOne({
                    filename: item[i]
                },
                (err, item) => {
                    if (err) {
                        console.log('error')
                    }
                    else if (item === null) {
                        newsong.save();
                        console.log("song existiert noch nicht");
                    }
                    else {
                        console.log('song existiert bereits');
                    }
                })
        }
    });

    res.end('Ok!');
};

// FERTIG
exports.getSongs = (req, res) => {

    songModel.find({})
        .then((songs) => {
            res.status(200);
            res.json(songs);
        })
        .catch((err) => {
            res.status(404);
            res.send(err);
        })
};  // alle songs

// FERTIG
exports.getSong = (req, res) => {
    songModel.find({filename: req.params.id})
        .then(song => {
            res.status(200);
            res.json(song);
        })
        .catch(err => {
            res.status(400);
            res.send(err);
        });
};   // ein song mit filenamen in :id

// FERTIG
exports.postSong = (req, res) => {

    const newsong = new songModel(req.body);

    newsong.save()
        .then((song) => {
            res.json(song);
            res.status(200);
        })
        .catch((err) => {
            res.status(400);
            res.send(err);
        })
};   // erstellt song (verknüpft mit mp3)

// FERTIG
exports.deleteSong = (req, res) => {
    songModel.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204);
            res.send('');
        })
        .catch((err) => {
            res.status(400);
            res.send(err);
        })
};   // löscht song mit filenamen in :id

// FERTIG
exports.putSong = (req, res) => {
    songModel.findOneAndUpdate({filename: req.params.id}, req.body, {new: true})
        .then(song => {
            res.status(200);
            res.json(song);
        })
        .catch(err => {
            res.status(400);
            res.send(err);
        });
};   // aendert song mit filenamen in :id

// FERTIG
exports.streamAudio = (req, res) => {

    const file = req.params.id;
    const filePath = './songs/' + file;

    try {
        const stat = fileSystem.statSync(filePath);

        res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': stat.size
        });

        const readStream = fileSystem.createReadStream(filePath);
        readStream.pipe(res);

    } catch (err) {
        res.status(400).send();
        console.log(err);
    }

};   // streamt song mit filenamen in :id und download des files

// artists

exports.getArtists = (req, res) => {

    songModel.find({})
        .then((songs) => {
            res.status(200);
            var artists = [];

            for (let song of songs) {
                var alreadyinarray = false;
                for (let artist of artists) {
                    if (song.artist == artist.artist) {
                        alreadyinarray = true;
                    }
                }
                if (!alreadyinarray) artists.push({artist: song.artist});
            }
            res.json(artists);
        })
        .catch((err) => {
            res.status(404);
            res.send(err);
        })
};   // läd alle artists als liste

// albums

// FERTIG
exports.getAlbums = (req, res) => {

    songModel.find({})
        .then((songs) => {
            res.status(200);
            var albums = [];

            for (let song of songs) {
                var alreadyinarray = false;
                for (let album of albums) {
                    if (song.album == album.album) {
                        alreadyinarray = true;
                    }
                }

                if (!alreadyinarray) albums.push({album: song.album, artist: song.artist});

            }
            res.json(albums);
        })
        .catch((err) => {
            res.status(404);
            res.send(err);
        })
};   // läd alle alben als liste

// playlists

// FERTIG
exports.getPlaylists = (req, res) => {

    playlistModel.find({})
        .then((playlist) => {
            res.status(200);
            res.json(playlist);
        })
        .catch((err) => {
            res.status(404);
            res.send(err);
        })
};   // alle playlists

// FERTIG
exports.getPlaylist = (req, res) => {

    playlistModel.find({name: req.params.id})
        .then((playlist) => {
            res.status(200);
            res.json(playlist);
        })
        .catch((err) => {
            res.status(404);
            res.send(err);
        })
};   // eine playlist mit namen in :id

// FERTIG
exports.postPlaylist = (req, res) => {

    const newplaylist = new playlistModel(req.body);
    newplaylist.save()
        .then((playlist) => {
            res.json(playlist);
            res.status(200);
        })
        .catch((err) => {
            res.status(400);
            res.send(err);
        })

};   // erstellt playlist

// FERTIG
exports.deletePlaylist = (req, res) => {

    playlistModel.findOneAndRemove({name: req.params.id})
        .then(() => {
            res.status(204);
            res.send('');
        })
        .catch((err) => {
            res.status(400);
            res.send(err);
        })
};   // löscht playlist mit namen in :id

// FERTIG
exports.putPlaylist = (req, res) => {


    var body = req.body
    playlistModel.findOneAndUpdate({name: req.params.id}, body, {new: true})
        .then(playlist => {
            res.status(200);
            res.json(playlist);
        })
        .catch((err) => {
            res.status(400);
            res.send(err);
        })
};   // aendert playlist mit namen in :id


exports.deleteAllPlaylists = (req, res) => {

    playlistModel.remove({})
        .then(() => {
            res.status(200);
            res.send('All playlists are gone!');
        })
        .catch((err) => {
            console.log(err);
            res.status(400).end();
        })
};