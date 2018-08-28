import { Component } from '@angular/core';
import {HttpService} from '../http.service';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";


export interface ConfirmModel {
  name:string;
}

@Component({
  selector: 'app-playlistpopup',
  templateUrl: './playlistpopup.component.html',
  styleUrls: ['./playlistpopup.component.css']
})
export class PlaylistpopupComponent extends DialogComponent<ConfirmModel, string> implements ConfirmModel {

  name: string;

  constructor(dialogService: DialogService, private httpService: HttpService) {
    super(dialogService);

  }

  confirm() {
      this.result = this.name;
      this.close();
      this.httpService.getPlaylists().then(()=>{

        var alreadyexists=false;
        for(var i in this.httpService.playlists){
          if(this.httpService.playlists[i].name==this.result){
            alreadyexists=true;
          }
        }

        if(!alreadyexists){
          this.httpService.postPlaylist(this.result);
        }

      });

  }

}
