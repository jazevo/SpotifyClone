import { Component, OnInit } from '@angular/core';
import {HttpService} from '../http.service';
import {FilterService} from '../filter.service';

@Component({
  selector: 'app-artistlist',
  templateUrl: './artistlist.component.html',
  styleUrls: ['./artistlist.component.css']
})
export class ArtistlistComponent implements OnInit {

  private Artists = [];

  constructor(private httpService: HttpService, private filterService: FilterService) {
    this.filterService.showSearchComponent = false;

    this.httpService.getArtists().then(() => {
      this.Artists = this.httpService.artists;
      console.log(this.Artists);
    });
  }

  ngOnInit() {
  }

}
