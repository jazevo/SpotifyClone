import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class SongService {

  public SongSubject = new Subject<any>()

  constructor() { }

  addSelectedSong(data) {
    this.SongSubject.next(data);
  }
}
