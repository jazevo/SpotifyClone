import { Injectable } from '@angular/core';

@Injectable()
export class FilterService {

  public filteredPlaylists: any[];
  public filteredSongs: any[];
  public filteredArtists: any[];
  public filteredAlbums: any[];
  public showSearchComponent = false;

  constructor() {
    this.filteredPlaylists = [];
    this.filteredSongs = [];
    this.filteredArtists = [];
    this.filteredAlbums = [];
  }

}
