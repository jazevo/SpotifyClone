import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {HttpService} from '../http.service';
import {SongService} from "../service/song.service";
import {FilterService} from '../filter.service';

@Component({
  selector: 'app-songlist',
  templateUrl: './songlist.component.html',
  styleUrls: ['./songlist.component.css']
})
export class SonglistComponent implements OnInit {
  private playsong: string = "";
  private play: number = 0;
  private selectedSong = {title: '', artist: '', album: '', rating: ''};


  constructor(private route: ActivatedRoute,
              private httpService: HttpService,
              private songService: SongService,
              private filterService: FilterService) {

    const filter = this.route.snapshot.params['filter'];
    this.filterService.showSearchComponent = false;

    this.httpService.getSongs().then(() => {
      this.Tracks = this.httpService.songs;
      if (filter != '' && filter != null) {
        console.log(filter);
        this.filterTracks(filter);
      }
      else {
        this.FilteredTracks = this.Tracks;
      }
    });

  }

  private filterTracks(filter) {
    const lowerCaseFilter = filter.toLowerCase();
    for (let index = 0; index < this.Tracks.length; index++) {
      if (this.Tracks[index].title.toLowerCase() == lowerCaseFilter)
        this.FilteredTracks.push(this.Tracks[index]);
      else if (this.Tracks[index].artist.toLowerCase() == lowerCaseFilter)
        this.FilteredTracks.push(this.Tracks[index]);
      else if (this.Tracks[index].album.toLowerCase() == lowerCaseFilter)
        this.FilteredTracks.push(this.Tracks[index]);
    }


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

      for(var i in this.FilteredTracks){
        if(this.FilteredTracks[i].filename==track.filename){
          this.FilteredTracks[i].rating=track.rating+change;
        }
      }

      this.httpService.putSongRating(track.filename,track.title,track.album,track.artist,track.rating).then(()=>{
      });

    }


  }

  ngOnInit() {
  }

  private FilteredTracks = [];

  private Tracks = [];

  dragstart(track) {
    document.getElementsByTagName("META")[0].setAttribute("content", track.filename);
  }

  /*[
   {title: 'Bobby Drop Basses', artist: 'BobbyHard', album: 'BobbyHardBass', rating: '5'},
   {title: 'Bobby Drop Basses, AGAIN!', artist: 'BobbyHard', album: 'BobbyHardBass Vol. 2', rating: '4'},
   {title: 'The Track Of Life The Universe And Everything', artist: 'Schmellock', album: 'Schmellocks 1x1', rating: '2'},
   {title: 'Tetris Theme', artist: 'Tetris Macher', album: 'Nerdy Stuff', rating: '5'},
   {title: 'Pokemon Theme', artist: 'Prof. Samuel Eich', album: 'Eichs Greatest', rating: '4'},
   {title: 'Cheeki Breeki Hard Bass', artist: 'Boris', album: 'Best of Slav Music', rating: '5'},
   {title: '7th Element', artist: 'Vitas', album: 'BLBLBLBLLBBHAHAHAHA', rating: '1'},
   {title: 'Shooterking', artist: 'Gronkh', album: 'Shooter King EP', rating: '3'}
   ];*/

}
