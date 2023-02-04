import { Component, OnInit } from '@angular/core';
import { AfipService } from '../../../Service/afip.service';
import { GlobalService } from '../../../Service/global.service';
import { ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { MatDialog} from '@angular/material/dialog';
import { ErrorforaneaModalComponent } from '../../../components/errorforanea-modal/errorforanea-modal.component';
import {AfipModel} from '../../../models/AfipModel';

@Component({
  selector: 'app-afip-panel',
  templateUrl: './afip-panel.component.html',
  styleUrls: ['./afip-panel.component.css']
})
export class AfipPanelComponent implements OnInit {

  listAfip:any;
  idUser:any;

  constructor(private afipServ:AfipService,private globalServ:GlobalService, private route: ActivatedRoute,
    private generalServ: GeneralService, public dialog: MatDialog) {
    route.params.subscribe(params => {
      this.idUser= params['iduser'];
    });
   }

  ngOnInit() {
    const loadRef = this.generalServ.loadingModal();
    this.afipServ.getListAfipByIdClienteNegotis(new AfipModel(this.idUser, null, null)).subscribe(data=>{
      this.listAfip=data;
      loadRef.close();
    },error=>{console.log(error);loadRef.close();})
  }

  delete(value:any){

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        var dataAfip = new AfipModel(null, null, value.Id);
        this.afipServ.eliminarAfip(dataAfip).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (let item of this.listAfip) {
              if (item.Id == value.Id) {
                this.listAfip.splice(index, 1)
                break;
              }
              index++;
            }
          }
          if(data == false){
            this.dialog.open(ErrorforaneaModalComponent, {
              width: '450px'
            });
          }
          loadRef.close();
        }, error => { console.log(error); loadRef.close(); })
      }
    });
  }

}
