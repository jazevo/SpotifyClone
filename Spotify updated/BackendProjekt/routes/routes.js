module.exports = (app) => {
    const api = require('./api');

    // Songs
    app.route('/song')
        .post(api.postSong);

    app.route('/song/:id')
        .get(api.getSong)
        .delete(api.deleteSong)
        .put(api.putSong);

    app.route('/songs')
        .get(api.getSongs);

    app.route('/stream/:id')
        .get(api.streamAudio);

    app.route('/deleteAllSongs')
        .delete(api.deleteAllSongs);

    // Artists
    app.route('/artists')
        .get(api.getArtists);

    // Albums
    app.route('/albums')
        .get(api.getAlbums);

    // Playlists
    app.route('/playlist')
        .post(api.postPlaylist);

    app.route('/playlist/:id')
        .get(api.getPlaylist)
        .delete(api.deletePlaylist)
        .put(api.putPlaylist);

    app.route('/playlists')
        .get(api.getPlaylists);

    app.route('/deleteAllPlaylists')
        .delete(api.deleteAllPlaylists);

    // Nur zum debuggen
    app.route('/initSongs')
        .get(api.initSongs)
};
