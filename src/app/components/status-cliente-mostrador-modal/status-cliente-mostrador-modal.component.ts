import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from '../../Service/user.service';
import { GeneralService } from '../../Service/general.service';

@Component({
  selector: 'app-status-cliente-mostrador-modal',
  templateUrl: './status-cliente-mostrador-modal.component.html',
  styleUrls: ['./status-cliente-mostrador-modal.component.css']
})
export class StatusClienteMostradorModalComponent implements OnInit {

  getStatus: any;
  getStatus2: any;
  post: any;

  constructor(private dialogRef: MatDialogRef<StatusClienteMostradorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userServ: UserService,
    private generalServ: GeneralService) { }

  ngOnInit() {
    const loadRef = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'nombre':"Mostrador" };
    this.userServ.getClienteMostradorStatus(data).subscribe(data => {
      this.getStatus = data;
      loadRef.close();
    }, error => { console.log(error); loadRef.close(); })
    let data2 = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'nombre':"Mostrador 2" };
    this.userServ.getClienteMostradorStatus(data2).subscribe(data3 => {
      this.getStatus2 = data3;
      loadRef.close();
    }, error => { console.log(error); loadRef.close(); })
  }

  cancelar() {
    this.dialogRef.close();
  }

  async guardar() {
    const loadRef = this.generalServ.loadingModal();


      let dataPost = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'status': this.getStatus };
      const result = await this.userServ.cambiarClienteMostradorStatus(dataPost).subscribe(data =>
        this.post = data);
        let dataPost2 = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'status': this.getStatus2,'mostrador2': true };

        const result2 = await this.userServ.cambiarClienteMostradorStatus(dataPost2).subscribe(data2 =>
          this.post = data2);
          loadRef.close();
/*       this.userServ.cambiarClienteMostradorStatus(dataPost).subscribe(data => {
        this.post = data;
        loadRef.close();
      }, error => { console.log(error); loadRef.close(); }) */


/*
        this.userServ.cambiarClienteMostradorStatus(dataPost2).subscribe(data2 => {
          this.post = data2;
          loadRef.close();
        }, error => { console.log(error); loadRef.close(); }) */








  }

}
