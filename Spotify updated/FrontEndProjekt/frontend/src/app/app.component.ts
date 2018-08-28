import {Component} from '@angular/core';
import {PlaylistpopupComponent} from './komponenten/playlistpopup/playlistpopup.component';
import {HttpService} from './komponenten/http.service';
import {log} from 'util';
import {DialogService} from "ng2-bootstrap-modal";
import {Observable} from 'rxjs/Rx';

import {SearchResultsComponent} from './komponenten/search-results/search-results.component'
import {FilterService} from './komponenten/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FilterService, SearchResultsComponent]
})
export class AppComponent {
  private Playlists = [];
  private Songs = [];
  private Artists = [];
  private Albums = [];
  private Playlist: any;
  private map: any;
  artistFound = false;
  albumFound = false;
  songFound = false;
  playlistFound = false;
  public filter = '';

  constructor(private dialogService: DialogService, private httpService: HttpService, private filterService: FilterService) {
    this.map = new Map();   // gelöschte playlists
    this.httpService.getPlaylists().then(() => {
      this.Playlists = this.httpService.playlists;
      this.httpService.getSongs().then(() => {
        this.Songs = this.httpService.songs;
        this.httpService.getArtists().then(() => {
          this.Artists = this.httpService.artists;
          this.httpService.getAlbums().then(() => {
            this.Albums = this.httpService.albums;

            Observable.interval(5000).subscribe(() => {   //alle 5s wird auf neue songs im backend getestet
              this.httpService.init();
            });

          });
        });
      });
    });
  }

  filterThings() {
    this.filterService.filteredArtists.length = 0;
    this.filterService.filteredAlbums.length = 0;
    this.filterService.filteredSongs.length = 0;
    this.filterService.filteredPlaylists.length = 0;

    this.filterArtists();
    this.filterAlbums();
    this.filterSongs();
    this.filterPlaylists();

    if (this.artistFound === true || this.albumFound === true || this.songFound === true || this.playlistFound === true)
      this.filterService.showSearchComponent = true;
    else
      this.filterService.showSearchComponent = false;
  }

  getArtistBySubstring(filter, cb) {
    for (let i = 0; i < this.Artists.length; i++) {
      if (this.Artists[i].artist.toLowerCase().includes(filter) === true) {
        this.filterService.filteredArtists.push(this.Artists[i]);
      }
    }

    cb();
  }

  getAlbumsBySubstring(filter, cb) {
    for (let i = 0; i < this.Albums.length; i++) {
      if (this.Albums[i].album.toLowerCase().includes(filter) === true) {
        this.filterService.filteredAlbums.push(this.Albums[i]);
      }
    }

    cb();
  }

  getSongsBySubstring(filter, cb) {
    for (let i = 0; i < this.Songs.length; i++) {
      if (this.Songs[i].title.toLowerCase().includes(filter) === true) {
        this.filterService.filteredSongs.push(this.Songs[i]);
      }
    }

    cb();
  }

  getPlaylistBySubstring(filter, cb) {
    for (let i = 0; i < this.Playlists.length; i++) {
      if (this.Playlists[i].name.toLowerCase().includes(filter) === true) {
        this.filterService.filteredPlaylists.push(this.Playlists[i]);
      }
    }

    cb();
  }

  filterArtists() {
    if (this.filter === '') {
      this.artistFound = false;
      this.filterService.filteredArtists.length = 0;
    }
    else {
      const filter = this.filter.toLowerCase();
      this.getArtistBySubstring(filter, () => {
        if (this.filterService.filteredArtists.length > 0) {
          this.artistFound = true;
        }
        else {
          this.artistFound = false;
          this.filterService.filteredArtists.length = 0;
        }
      });
    }
  }

  filterAlbums() {
    if (this.filter === '') {
      this.albumFound = false;
      this.filterService.filteredAlbums.length = 0;
    }
    else {
      const filter = this.filter.toLowerCase();
      this.getAlbumsBySubstring(filter, () => {
        if (this.filterService.filteredAlbums.length > 0) {
          this.albumFound = true;
        }
        else {
          this.albumFound = false;
          this.filterService.filteredAlbums.length = 0;
        }
      });
    }
  }

  filterSongs() {
    if (this.filter === '') {
      this.songFound = false;
      this.filterService.filteredSongs.length = 0;
    }
    else {
      const filter = this.filter.toLowerCase();
      this.getSongsBySubstring(filter, () => {
        if (this.filterService.filteredSongs.length > 0) {
          this.songFound = true;
        }
        else {
          this.songFound = false;
          this.filterService.filteredSongs.length = 0;
        }
      });
    }
  }

  filterPlaylists() {
    if (this.filter === '') {
      this.playlistFound = false;
      this.filterService.filteredPlaylists.length = 0;
    }
    else {
      this.getPlaylistBySubstring(this.filter.toLowerCase(), () => {
        if (this.filterService.filteredPlaylists.length > 0) {
          this.playlistFound = true;
        }
        else {
          this.playlistFound = false;
          this.filterService.filteredPlaylists.length = 0;
        }
      });
    }
  }

  deleteplaylist(name, index) {
    console.log("name: " + name);

    this.map.set(index, name);

    this.httpService.deletePlaylist(name).then(() => {

      this.httpService.getPlaylists().then(() => {
        this.Playlists = this.httpService.playlists;
      });

    });

    return false;
  }

  openDialog() {

    this.dialogService.addDialog(PlaylistpopupComponent, {name: ''})
      .subscribe((result) => {

        if (result != '' && typeof(result) != "undefined") {

          this.map.forEach((value, key) => {   // aktualisiere map (damit z.b. playlist1 wieder angelegt werden kann, nach dem sie gelöscht wurde, muss sie aus der map um angezeigt zu werden)
            if (value === result) {
              this.map.delete(key);
            }
          }, this.map);


          this.httpService.getPlaylists().then(() => {
            this.Playlists = this.httpService.playlists;
          });

        }

      });

  }

  allowDrop($event) {
    event.preventDefault();
  }

  drop(playlistname) {
    console.log('file: ' + playlistname);
    event.preventDefault();
    const content = document.getElementsByTagName('META')[0].getAttribute('content');

    this.httpService.getPlaylist(playlistname).then(() => {
      this.Playlist = this.httpService.playlist;

      const songs = this.Playlist[0].songs;
      songs.push(content);

      this.httpService.putPlaylist(playlistname, songs).then(() => {
        }
      );

    });

  }


}
