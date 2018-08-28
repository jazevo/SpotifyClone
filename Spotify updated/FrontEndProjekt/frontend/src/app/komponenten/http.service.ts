import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {
  public songs:any[];
  public song:any;        //derzeitiger song
  public artists:any[];
  public albums:any[];
  public playlists:any[];
  public playlist:any;    //derzeitige playlist
  public artistinfo:any[];

  constructor(private http:Http) {
    this.songs=[];
    this.artists=[];
    this.albums=[];
    this.playlists=[];
  }

  init(){
    return new Promise((resolve,reject)=>{
      this.http.get('http://localhost:3000/initSongs')
        .map(response => response.json()).subscribe(
        (responseItems: any) => {
        resolve();
        },err=>{if(err.status==0)alert("Datenbank nicht erreichbar!"); }
      )

    });
  }

  getArtistInfo(artist){
    return new Promise((resolve,reject)=>{
      this.http.get('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=Michael Jackson&api_key=0f33c00efbd1daaca148c523abef67f7&format=json')
        .map(response => response.json()).subscribe(
        (responseItems: any) => {
this.artistinfo=responseItems;
          console.log(responseItems.artist.bio.summary);
          resolve();
        },err=>{if(err.status==0)alert("Datenbank nicht erreichbar!"); }
      )
    });
  }

  getSongs(){
    return new Promise((resolve,reject)=>{
      this.http.get('http://localhost:3000/songs')
        .map(response => response.json()).subscribe(
        (responseItems: any) => {
          this.songs=[];
          for(let item of responseItems){
            this.songs.push(item);
          }
          resolve();
        },err=>{if(err.status==0)alert("Datenbank nicht erreichbar!"); }
      )
    });
  }

  getSong(filename){
    return new Promise((resolve,reject)=>{
      this.http.get('http://localhost:3000/song/'+filename)
        .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.song=responseItem;
          resolve();
        },err=>{if(err.status==0){alert("Datenbank nicht erreichbar!"); }else if(err.status==400){
          alert("Song nicht gefunden!");
        }}
      )
    });
  }

  putSongRating(filename,title,album,artist,rating){
    return new Promise((resolve,reject)=>{
      var body=JSON.stringify({
        title: title,
        album: album,
        artist: artist,
        rating: rating
      })

      var headers=new Headers();
      headers.append('content-type', 'application/json');
      var options = new RequestOptions({headers: headers});

      this.http.put('http://localhost:3000/song/'+filename, body, options)
        .map(res => res.json()).subscribe(
        (responseItem: any) => {

          resolve();
        }, err => {
          if (err.status == 400) {
            alert("keine gültige Eingabe!")
          } else if (err.status == 0) {
            alert("Datenbank nicht erreichbar!")
          }
        }
      )

    });
  }

  getArtists(){
    return new Promise((resolve,reject)=>{
      this.http.get('http://localhost:3000/artists')
        .map(response => response.json()).subscribe(
        (responseItems: any) => {
          this.artists=[];
          for(let item of responseItems){
            this.artists.push(item);
          }
          resolve();
        },err=>{if(err.status==0)alert("Datenbank nicht erreichbar!"); }
      )
    });
  }

  getAlbums(){
    return new Promise((resolve,reject)=>{
      this.http.get('http://localhost:3000/albums')
        .map(response => response.json()).subscribe(
        (responseItems: any) => {
          this.albums=[];
          for(let item of responseItems){
            this.albums.push(item);
          }
          resolve();
        },err=>{if(err.status==0)alert("Datenbank nicht erreichbar!"); }
      )
    });
  }

  getPlaylists(){
    return new Promise((resolve,reject)=>{
      this.http.get('http://localhost:3000/playlists')
        .map(response => response.json()).subscribe(
        (responseItems: any) => {
          this.playlists=[];
          for(let item of responseItems){
            this.playlists.push(item);
          }
          resolve();
        },err=>{if(err.status==0)alert("Datenbank nicht erreichbar!"); }
      )
    });
  }

  getPlaylist(name){
    return new Promise((resolve,reject)=>{
      this.http.get('http://localhost:3000/playlist/'+name)
        .map(response => response.json()).subscribe(
        (responseItem: any) => {
          this.playlist=responseItem;
          resolve();
        },err=>{if(err.status==0){alert("Datenbank nicht erreichbar!"); }else if(err.status==400){
          alert("Playlist nicht gefunden!");
        }}
      )
    });
  }

  //erstellt leere Playlist
  postPlaylist(pname){
    return new Promise((resolve,reject)=> {
      var body = JSON.stringify({
        name: pname
      });

      var headers = new Headers();
      headers.append('content-type', 'application/json');
      var options = new RequestOptions({headers: headers});

      this.http.post('http://localhost:3000/playlist', body, options)
        .map(res => res.json()).subscribe(
        (responseItem: any) => {
          this.playlists.push(responseItem);
          this.playlist=responseItem;
          resolve();
        }, err => {
          if (err.status == 400) {
            alert("keine gültige Eingabe!")
          } else if (err.status == 0) {
            alert("Datenbank nicht erreichbar!")
          }
        }
      )
    });

  }

  //ersetzt songs array der playlist und updatet playlists array
  putPlaylist(name, songfilenames){
    return new Promise((resolve,reject)=>{
      var body=JSON.stringify({
        songs: songfilenames
      })

      var headers=new Headers();
      headers.append('content-type', 'application/json');
      var options = new RequestOptions({headers: headers});

      this.http.put('http://localhost:3000/playlist/'+name, body, options)
        .map(res => res.json()).subscribe(
        (responseItem: any) => {
          for(var i in this.playlists){
            if(this.playlists[i].name==name){
              this.playlists[i]=responseItem;
            }
          }

          this.playlist=responseItem;
          resolve();
        }, err => {
          if (err.status == 400) {
            alert("keine gültige Eingabe!")
          } else if (err.status == 0) {
            alert("Datenbank nicht erreichbar!")
          }
        }
      )

    });
  }

  deletePlaylist(name){
    return new Promise((resolve,reject)=>{
      var link='http://localhost:3000/playlist/'+name;
      this.http.delete(link).map(()=>{}).subscribe( ()=>{
        alert("Playlist gelöscht!");
        resolve();
      },err=>{
        if(err.status=0){
          alert("Datenbank nicht erreichbar! \nDaten sind veraltet. \nAktualisieren Sie die Seite.")
        }
      })
    });

  }

}

//so werden die Funktionen/Promises benutzt:

/*this.httpserv.getSongs().then(()=>{
 console.log("Songs:");
 console.log(JSON.stringify(this.httpserv.songs));
 });
 this.httpserv.getSong("1.mp3").then(()=>{
 console.log("Song:");
 console.log(JSON.stringify(this.httpserv.song));
 });
 this.httpserv.getArtists().then(()=>{
 console.log("Artists:");
 console.log(JSON.stringify(this.httpserv.artists));
 });
 this.httpserv.getAlbums().then(()=>{
 console.log("Albums:");
 console.log(JSON.stringify(this.httpserv.albums));
 });
 this.httpserv.postPlaylist("rock").then(()=>{
 console.log("POST Playlist rock");
 console.log(this.httpserv.playlist);
 });
 this.httpserv.getPlaylists().then(()=>{
 console.log("Playlists");
 console.log(JSON.stringify(this.httpserv.playlists));
 });
 this.httpserv.getPlaylist("rock").then(()=>{
 console.log("Playlist rock");
 console.log(JSON.stringify(this.httpserv.playlist));
 });

 var rockarr=["gimmeshelter.mp3","rocksong2.mp3","rocksong3.mp3"];

 this.httpserv.getPlaylists().then(()=>{
 console.log("Playlists davor");
 console.log(JSON.stringify(this.httpserv.playlists));


 this.httpserv.putPlaylist("rock",rockarr).then(()=>{
 console.log("geänderte playlist:");
 console.log(JSON.stringify(this.httpserv.playlist));

 console.log("Playlists danach:");
 console.log(JSON.stringify(this.httpserv.playlists));
 });

 });

 this.httpserv.deletePlaylist("rock").then(()=>{
 console.log("Playlist rock gelöscht");
 this.httpserv.getPlaylists();
 })
 */
