import { Component, Inject, HostListener } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from '../../Service/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-imprimir-egreso-modal',
  templateUrl: './imprimir-egreso-modal.component.html',
  styleUrls: ['./imprimir-egreso-modal.component.css']
})
export class ImprimirEgresoModal {


  token: any;
  idClienteNegotis: any = localStorage.getItem('idClienteNegotis');

  constructor(public dialogRef: MatDialogRef<ImprimirEgresoModal>,
    @Inject(MAT_DIALOG_DATA) public data: any, public globalServ: GlobalService, private router: Router) {
    this.token = localStorage.getItem('token');

  }
  ngOnInit() {


    const roles = JSON.parse(localStorage.getItem('roles') ?? '');
    const tieneRolClienteNegotis = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;

  }
  cerrar() {
    this.dialogRef.close();
  }

  generar() {
    this.dialogRef.close();
  }

  afip() {

  }


  @HostListener('window:keyup', ['$event'])
  Listener(event: any) {
    if (event.keyCode === 27) {
      this.cerrar();
    }
  }

}
