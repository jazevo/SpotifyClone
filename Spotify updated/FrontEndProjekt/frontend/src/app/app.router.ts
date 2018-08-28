import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SonglistComponent} from './komponenten/songlist/songlist.component';
import {AlbumlistComponent} from './komponenten/albumlist/albumlist.component';
import {ArtistlistComponent} from './komponenten/artistlist/artistlist.component';
import {PlaylistComponent} from './komponenten/playlist/playlist.component';

export const router: Routes = [
  {
   path: '',
   redirectTo: 'song',
   pathMatch: 'full'
   },
  {
    path: 'song',
    component: SonglistComponent
  },
  {
    path: 'artist',
    component: ArtistlistComponent
  },
  {
    path: 'album',
    component: AlbumlistComponent,
  },
  {
    path: 'song',
    children: [{path: ':filter', component: SonglistComponent}]
  },
  {
    path: 'album',
    children: [{path: ':filter', component: AlbumlistComponent}]
  },
  {
    path: 'playlist',
    children: [{path: ':filter', component: PlaylistComponent}]
  }

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
