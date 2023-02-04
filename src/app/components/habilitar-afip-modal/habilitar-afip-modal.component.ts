import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from '../../Service/user.service';
import { GeneralService } from '../../Service/general.service';

@Component({
  selector: 'app-habilitar-afip-modal',
  templateUrl: './habilitar-afip-modal.component.html',
  styleUrls: ['./habilitar-afip-modal.component.css']
})
export class HabilitarAfipModalComponent implements OnInit {

  getStatus: any;
  post: any;
  soloAfip: any;
  soloInformal: any;
  afipInformal: any;

  constructor(private dialogRef: MatDialogRef<HabilitarAfipModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userServ: UserService,
    private generalServ: GeneralService) { }

  ngOnInit() {
    const loadRef = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.userServ.getHabilitarAfipStatus(data).subscribe(data => {
      this.getStatus = data;
      this.soloAfip=this.getStatus.SoloAfip;
      this.soloInformal=this.getStatus.SoloInformal;
      this.afipInformal=this.getStatus.AfipInformal;
      loadRef.close();
    }, error => { console.log(error); loadRef.close(); })
  }

  cancelar() {
    this.dialogRef.close();
  }

  guardar() {
    const loadRef = this.generalServ.loadingModal();
    let dataPost = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
    'soloAfip': this.soloAfip,'soloInformal': this.soloInformal,'afipInformal': this.afipInformal };
    this.userServ.cambiarHabilitarAfipStatus(dataPost).subscribe(data => {
      this.post = data;
      loadRef.close();
    }, error => { console.log(error); loadRef.close(); })
  }

  soloAfipFunc(){
    this.soloAfip=true;
    this.soloInformal=null;
    this.afipInformal=null;
  }

  soloInformalFunc(){
    this.soloAfip=null;
    this.soloInformal=true;
    this.afipInformal=null;
  }

  afipInfomalFunc(){
    this.soloAfip=null;
    this.soloInformal=null;
    this.afipInformal=true;
  }

}
