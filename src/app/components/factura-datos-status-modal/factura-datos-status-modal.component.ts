import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from '../../Service/user.service';
import { GeneralService } from '../../Service/general.service';

@Component({
  selector: 'app-factura-datos-status-modal',
  templateUrl: './factura-datos-status-modal.component.html',
  styleUrls: ['./factura-datos-status-modal.component.css']
})
export class FacturaDatosStatusModalComponent implements OnInit {


  getStatus: any;
  post: any;

  constructor(private dialogRef: MatDialogRef<FacturaDatosStatusModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userServ: UserService,
    private generalServ: GeneralService) { }

  ngOnInit() {
    const loadRef = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.userServ.getMostrarDatosFacturaStatus(data).subscribe(data => {
      this.getStatus = data;
      loadRef.close();
    }, error => { console.log(error); loadRef.close(); })
  }

  cancelar() {
    this.dialogRef.close();
  }

  guardar() {
    const loadRef = this.generalServ.loadingModal();
    let dataPost = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'status': this.getStatus };
    this.userServ.cambiarMostrarDatosFacturaStatus(dataPost).subscribe(data => {
      this.post = data;
      loadRef.close();
    }, error => { console.log(error); loadRef.close(); })
  }

}
