import {Component, OnInit} from '@angular/core';
import {SongService} from "../service/song.service";
import {Http, Headers, Response, RequestOptions} from '@angular/http';

@Component({
  selector: 'app-song-info',
  templateUrl: './song-info.component.html',
  styleUrls: ['./song-info.component.css']
})
export class SongInfoComponent implements OnInit {

  private selectedSong = {title: '', artist: '', album: '', rating: '', filename: ''};
  private artistinfo;
  private artistinfocollapsed;
  private show = false;
  private image;

  constructor(private songService: SongService, private http: Http) {

    this.songService.SongSubject.subscribe(data => {
        this.selectedSong = data;

        if(data.image!=null){
          this.image = btoa(String.fromCharCode.apply(null, new Uint8Array(data.image.data)));
          console.log("not null");
        }else{
          this.image=null;
          console.log("null");
        }
        //this.image = data.image.data;

        this.getArtistInfo(data.artist).then(() => {
          if (typeof(this.artistinfo) != "undefined") {

            if (this.artistinfo.length != 0) {
              console.log("length: " + this.artistinfo.length);
              this.show = true;
              console.log("true");
            } else {
              this.show = false;
              console.log("false");
            }

          } else {
            console.log("undefined");
          }

        });
      }
    );
  }

  getArtistInfo(artist) {
    var getstring = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + artist + '&api_key=0f33c00efbd1daaca148c523abef67f7&format=json';

    return new Promise((resolve, reject) => {
      this.http.get(getstring)
        .map(response => response.json()).subscribe(
        (responseItems: any) => {

          if (typeof(responseItems.artist) != "undefined") {
            this.artistinfo = responseItems.artist.bio.summary;
            this.artistinfo = this.artistinfo.substring(0, this.artistinfo.length - (62 + artist.length));
            this.artistinfocollapsed = this.artistinfo.substring(0, 40) + '...';
          } else {
            this.artistinfo = "";
          }

          resolve();
        }, err => {
          if (err.status == 0) alert("lastfm Server nicht erreichbar");
        }
      )
    });
  }

  ngOnInit() {
  }

}
