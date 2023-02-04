import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../Service/global.service';
import { SucursalService } from '../../Service/sucursal.service';
import { MensajeseleccionarsucursalModalComponent } from '../../components/mensajeseleccionarsucursal-modal/mensajeseleccionarsucursal-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UseriosucursalModalComponent } from '../../components/useriosucursal-modal/useriosucursal-modal.component';

@Component({
  selector: 'toolbar-two',
  templateUrl: './toolbar-two.component.html',
  styleUrls: ['./toolbar-two.component.css']
})
export class ToolbarTwoComponent implements OnInit {

  @Input() selecInput: any;
  @Input() mostrarModalSeleccion!: boolean;
  @Output() GetSucursalEmit: EventEmitter<any>;
  sucSelecPost: any;
  rolClienteNegotis: any;
  roles: any;
  userName: any;
  rolProduccion: any;
  constructor(private router: Router, private global: GlobalService,
    private sucursalServ: SucursalService, public dialog: MatDialog) {
    this.GetSucursalEmit = new EventEmitter();
  }

  ngOnInit() {
    const sucursalSeleccionada = JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
    console.log('sucursalSeleccionada', sucursalSeleccionada)
    this.roles = JSON.parse(localStorage.getItem('roles') ?? '');
    console.log(this.roles);
    this.userName = localStorage.getItem('userName')?.replace('"', '').replace('"', '');
    this.rolClienteNegotis = localStorage.getItem('RolClienteNegotis');
    this.rolProduccion = (this.roles != null && this.roles.Produccion );
    if(this.rolProduccion)
    {
      this.rolClienteNegotis = true;
    }

    if (sucursalSeleccionada == null) {
      let dataUser = { 'idUser': localStorage.getItem('idUser') };
      this.sucursalServ.sucursalSeleccionadaByUsuario(dataUser)
        .subscribe(data => {
          this.sucSelecPost = data;
          this.GetSucursalEmit.emit(this.sucSelecPost);
          if (sucursalSeleccionada == null && this.mostrarModalSeleccion == true) {
            const dialogRef = this.dialog.open(MensajeseleccionarsucursalModalComponent, {
              width: '450px', hasBackdrop: false
            });
          }
        })
    } else {
      this.GetSucursalEmit.emit(sucursalSeleccionada);
      this.sucSelecPost = sucursalSeleccionada;
    }
  }

  openNav() {
    document.getElementById("mySidenav")!.style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav")!.style.width = "0";
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }


  showUserSucursal() {
    let sucursalSelect;
    if (this.selecInput != null) {
      sucursalSelect = this.selecInput;
    } else {
      sucursalSelect = this.sucSelecPost;
    }
    const dialogRef = this.dialog.open(UseriosucursalModalComponent, {
      width: '450px', data: { userName: this.userName, sucursal: sucursalSelect }
    });
  }

}
