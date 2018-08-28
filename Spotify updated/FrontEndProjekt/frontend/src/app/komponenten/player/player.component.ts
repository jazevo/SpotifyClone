import { Component, OnInit } from '@angular/core';
import {SongService} from "../service/song.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  private playsong: string="";
  private play:number=0;

  constructor(private songService: SongService) {
  }

  ngOnInit() {
    this.songService.SongSubject.subscribe(
      data => this.playSong(data)
  );
  }

  private playSong(data){
    this.playsong = "http://localhost:3000/stream/" + data.filename;
    this.play = 1;
  }

}
