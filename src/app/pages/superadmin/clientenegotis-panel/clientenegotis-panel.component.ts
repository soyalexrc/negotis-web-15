import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResetPasswordModalComponent } from '../../../components/reset-password-modal/reset-password-modal.component';
import { GeneralService } from '../../../Service/general.service';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientenegotis-panel',
  templateUrl: './clientenegotis-panel.component.html',
  styleUrls: ['./clientenegotis-panel.component.css']
})
export class ClientenegotisPanelComponent implements OnInit {

  cleinteList: any;
  totalClientes: any;
  filtroDescripcionUsuario: string = "";
  gastronomico: any = null;
  constructor(private userService: UserService, private dialog: MatDialog, private generalServ: GeneralService,private route: ActivatedRoute,) {

  }

  async ngOnInit() {
    let user = localStorage.getItem('idUser');
    let dataUser = { 'idUser': user };
    const result = await  this.userService.getUserById(dataUser).subscribe((data: any) => {
      this.gastronomico = data.User.VerSocios;
      this.buscar();
    }, (error: any) => { console.log(error); this.generalServ.goToNoEncontrado();})

    if (this.route.snapshot.queryParams['filter'] != null || this.gastronomico != null) {
      this.filtroDescripcionUsuario = this.route.snapshot.queryParams['filter'];
      this.buscar();
    }
    else
    {
      this.cargarClientes();
    }



  }

  cargarClientes() {
    const loading = this.generalServ.loadingModal();
    this.userService.getListClientesNegotis()
      .subscribe(data => { this.cleinteList = data; this.totalClientes = this.cleinteList.length; loading.close(); },
        error => { console.log(error); loading.close(); }
      );
  }

  limpiar() {
    this.filtroDescripcionUsuario="";
    this.gastronomico = null;
  }
  buscar() {

    const loadRef = this.generalServ.loadingModal();
    const dataFiltro = {
      'filtro': this.filtroDescripcionUsuario,
      'gastronomico':this.gastronomico

    };
    this.userService.getListClientesNegotisById(dataFiltro).subscribe((data: any) => {
      this.cleinteList = data;
      this.totalClientes = this.cleinteList.length;
      loadRef.close();
    }, (error: any) => { console.log(error); loadRef.close(); });
  }

  resetPasswordModal(value: any) {
    const dialogRef = this.dialog.open(ResetPasswordModalComponent, {
      width: '450px', data: { idUser: value.Id, nombres: value.Nombres, apellidos: value.Apellidos, userName: value.UserName },
    });
  }

  toogleEnable(value: any) {
    const loading = this.generalServ.loadingModal();
    let request = { 'idUser': value.Id, 'bloqueado': !value.Bloqueado };
    this.userService.activarDesactivar(request).subscribe(response => {
      if (response) {
        this.cargarClientes();
      }
      loading.close();
    }, error => {
      console.log(error);
      loading.close();
    });
  }

  Remove(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === true) {
        const loading = this.generalServ.loadingModal();
        this.userService.deleteClienteNegotis(value.Id).subscribe((response: any) => {
          if (response) {
            this.cargarClientes();
          }
          loading.close();
        }, (error: any) => {
          console.log(error);
          loading.close();
        });
      }
    });
  }

}
