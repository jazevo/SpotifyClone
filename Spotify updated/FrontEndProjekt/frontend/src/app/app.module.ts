import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { AppComponent } from './app.component';
import { routes } from "./app.router";
import { SonglistComponent } from './komponenten/songlist/songlist.component';
import { ArtistlistComponent } from './komponenten/artistlist/artistlist.component';
import { AlbumlistComponent } from './komponenten/albumlist/albumlist.component';
import { HttpService } from './komponenten/http.service';
import { PlayerComponent } from './komponenten/player/player.component'
import {SongService} from "./komponenten/service/song.service";
import { SongInfoComponent } from './komponenten/song-info/song-info.component';
import { PlaylistpopupComponent } from './komponenten/playlistpopup/playlistpopup.component';
import { PlaylistComponent } from './komponenten/playlist/playlist.component';
import { SearchResultsComponent } from './komponenten/search-results/search-results.component';


@NgModule({
  declarations: [
    AppComponent,
    SonglistComponent,
    ArtistlistComponent,
    AlbumlistComponent,
    PlayerComponent,
    SongInfoComponent,
    PlaylistpopupComponent,
    PlaylistComponent,
    SearchResultsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    routes,
    BootstrapModalModule,
  ],
  entryComponents: [
  PlaylistpopupComponent
],
  providers: [HttpService, SongService],
  bootstrap: [AppComponent]
})
export class AppModule { }
