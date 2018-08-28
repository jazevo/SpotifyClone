import {Component, OnInit} from '@angular/core';

import {FilterService} from '../filter.service';
import {SongService} from '../service/song.service'

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  private filteredPlaylists = [];
  private filteredSongs = [];
  private filteredArtists = [];
  private filteredAlbums = [];

  private playsong: string = "";
  private play: number = 0;
  private selectedSong = {title: '', artist: '', album: '', rating: ''};

  constructor(private filterService: FilterService, private songService: SongService) {
    this.filteredPlaylists = filterService.filteredPlaylists;
    this.filteredSongs = filterService.filteredSongs;
    this.filteredArtists = filterService.filteredArtists;
    this.filteredAlbums = filterService.filteredAlbums;
  }

  private playthissong(track) {
    this.playsong = "http://localhost:3000/stream/" + track.filename;
    this.play = 1;
    this.selectedSong = track;
    this.songService.addSelectedSong(track);
  }

  ngOnInit() {
  }

}
