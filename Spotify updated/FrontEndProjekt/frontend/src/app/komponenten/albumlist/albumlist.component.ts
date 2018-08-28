import {Component, OnInit} from '@angular/core';
import {HttpService} from '../http.service';
import {ActivatedRoute, Params} from '@angular/router';
import {FilterService} from '../filter.service';

@Component({
  selector: 'app-albumlist',
  templateUrl: './albumlist.component.html',
  styleUrls: ['./albumlist.component.css']
})
export class AlbumlistComponent implements OnInit {

  private Albums = [];
  private FilteredAlbums = [];

  constructor(private route: ActivatedRoute,
              private httpService: HttpService,
              private filterService: FilterService) {
    this.filterService.showSearchComponent = false;
    const filter = this.route.snapshot.params['filter'];

    this.httpService.getAlbums().then(() => {

      this.Albums = this.httpService.albums;

      if (filter != '' && filter != null )
      {
        console.log(filter);
        this.filterAlbums(filter);
      }
      else
      {
        this.FilteredAlbums = this.Albums;
      }
    });
  }

  private filterAlbums(filter){

    const lowerCaseFilter = filter.toLowerCase();

    for (let index = 0; index < this.Albums.length; index++)
    {
      if ( this.Albums[index].artist.toLowerCase() == lowerCaseFilter )
        this.FilteredAlbums.push(this.Albums[index]);
      else if ( this.Albums[index].album.toLowerCase() == lowerCaseFilter )
        this.FilteredAlbums.push(this.Albums[index]);
    }
  }

  /*private Albums =
    [
      {title: 'Bobby Drop Basses', artist: 'BobbyHard', album: 'BobbyHardBass', rating: '5'},
      {title: 'Bobby Drop Basses, AGAIN!', artist: 'BobbyHard', album: 'BobbyHardBass Vol. 2', rating: '4'},
      {
        title: 'The Track Of Life The Universe And Everything',
        artist: 'Schmellock',
        album: 'Schmellocks 1x1',
        rating: '2'
      },
      {title: 'Tetris Theme', artist: 'Tetris Macher', album: 'Nerdy Stuff', rating: '5'},
      {title: 'Pokemon Theme', artist: 'Prof. Samuel Eich', album: 'Eichs Greatest', rating: '4'},
      {title: 'Cheeki Breeki Hard Bass', artist: 'Boris', album: 'Best of Slav Music', rating: '5'},
      {title: '7th Element', artist: 'Vitas', album: 'BLBLBLBLLBBHAHAHAHA', rating: '1'},
      {title: 'Shooterking', artist: 'Gronkh', album: 'Shooter King EP', rating: '3'}
    ];
*/
  ngOnInit() {
  }

}
