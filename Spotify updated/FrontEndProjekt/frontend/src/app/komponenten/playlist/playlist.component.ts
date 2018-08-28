import {Component, OnInit, SimpleChanges} from '@angular/core';
import {HttpService} from '../http.service';
import {ActivatedRoute, Params} from '@angular/router';
import {log} from "util";
import set = Reflect.set;
import {SongService} from "../service/song.service";
import {FilterService} from '../filter.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  private Playlist: any;
  private Tracks = [];
  private allsong = [];
  private filtered = [];
  private name: string;
  private rel: boolean = false;
  private filter: any;
  private playsong: string = "";
  private play: number = 0;
  private selectedSong = {title: '', artist: '', album: '', rating: ''};

  constructor(private route: ActivatedRoute, private httpService: HttpService, private songService: SongService, private filterService: FilterService) {
    this.filterService.showSearchComponent = false;

    this.route.params.subscribe(params => {
      this.filter = params['filter'];

      this.load();

    });
  }

  load() {
    this.Tracks = [];
    this.filtered = [];

    this.filter = this.route.snapshot.params['filter'];

    this.httpService.getSongs().then(() => {
      this.allsong = this.httpService.songs;

      this.httpService.getPlaylist(this.filter).then(() => {
      this.Playlist = this.httpService.playlist;

      this.name = this.Playlist[0].name;
      var sizeofsongs = this.Playlist[0].songs.length;


      for (let filename of  this.Playlist[0].songs) {

        this.Tracks.push(filename);


        for (let song of this.allsong) {

          if (song.filename == filename) {

            this.filtered.push(song);

          }

        }

      }
    });

    });



  }

  deletesong(filename) {

    let playlistname = this.Playlist[0].name;
    let songs = [];
    var sizeofsongs = this.Playlist[0].songs.length;
    var count=0;

    let currentsongs = this.Playlist[0].songs;

    for (let song of currentsongs) {

      if (song != filename ) {
        songs.push(song);
      }else{
        count++;
      }
      if (count>1){
        songs.push(song);
      }
    }

    this.httpService.putPlaylist(playlistname, songs).then(() => {

      this.Playlist = this.httpService.playlist;
      this.load();
    });


  }

  private playthissong(track) {
    this.playsong = "http://localhost:3000/stream/" + track.filename;
    this.play = 1;
    this.selectedSong = track;
    this.songService.addSelectedSong(track);
  }

  changeRating(track,change){

    if(track.rating<1&&change<0 || track.rating>9&&change>0){
      // rating nicht ändern wenn <0 oder >10
    }else{

      for(var i in this.filtered){
        if(this.filtered[i].filename==track.filename){
          this.filtered[i].rating=track.rating+change;
          break;
        }
      }

      this.httpService.putSongRating(track.filename,track.title,track.album,track.artist,track.rating).then(()=>{
      });

    }


  }

  ngOnInit() {
  }

}
