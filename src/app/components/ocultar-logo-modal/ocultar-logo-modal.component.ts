import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from '../../Service/user.service';
import { GeneralService } from '../../Service/general.service';

@Component({
  selector: 'app-ocultar-logo-modal',
  templateUrl: './ocultar-logo-modal.component.html',
  styleUrls: ['./ocultar-logo-modal.component.css']
})
export class OcultarLogoimpresionesModalComponent implements OnInit {

  getStatus: any;
  post: any;
  idSucursal: any=JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');

  constructor(private dialogRef: MatDialogRef<OcultarLogoimpresionesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userServ: UserService,
    private generalServ: GeneralService) { }

  ngOnInit() {
    const loadRef = this.generalServ.loadingModal();
    let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'idSucursal':this.idSucursal.Sucursal.Id };
    this.userServ.getOcultarLogoStatus(data).subscribe(data => {
      this.getStatus = data;
      loadRef.close();
    }, error => { console.log(error); loadRef.close(); })

  }

  cancelar() {
    this.dialogRef.close();
  }

  guardar() {
    const loadRef = this.generalServ.loadingModal();

      let dataPost = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'status': this.getStatus, 'idSucursal': this.idSucursal.Sucursal.Id };
      this.userServ.cambiarOcultarLogoStatus(dataPost).subscribe(data => {
        this.post = data;
        loadRef.close();
      }, error => { console.log(error); loadRef.close(); })
  }

}
