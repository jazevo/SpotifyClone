const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const Song = require('../models/song');
const server = require('../index');

chai.use(chaiHttp);

describe('Songs', () => {
    beforeEach((done) => {
        Song.remove({}, (err) => {
            done();
        })
    });

    // Test the GET /song/:id route
    describe('GET /song/:id', () => {
        it('it should GET a song by the given name', (done) => {
            let song = new Song({
                filename: 'pikachu',
                title: 'Pikachu Sound',
                artist: 'Pikachu',
                album: 'Pikachus Album',
                rating: 10
            });

            song.save((err, song) => {
                chai.request(server)
                    .get('/song/' + song.filename)
                    .send(song)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body[0].should.be.a('object');
                        res.body[0].should.have.property('filename').eql("pikachu");
                        res.body[0].should.have.property('title').eql("Pikachu Sound");
                        done();
                    });
            });
        });
    });
});