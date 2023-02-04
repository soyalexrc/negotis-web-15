import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SucursalService } from '../../../Service/sucursal.service';
import { GeneralService } from '../../../Service/general.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeshabilitarSucursalModalComponent } from '../../../components/deshabilitar-sucursal-modal/deshabilitar-sucursal-modal.component';
import { ErrorforaneaModalComponent } from 'src/app/components/errorforanea-modal/errorforanea-modal.component';
import { EliminarModalComponent } from 'src/app/components/eliminar-modal/eliminar-modal.component';

@Component({
  selector: 'app-sucursal-panel',
  templateUrl: './sucursal-panel.component.html',
  styleUrls: ['./sucursal-panel.component.css']
})
export class SucursalPanelComponent implements OnInit {


  idUser: any;
  idCliente: any;
  data: any;
  postDeshabilitar: any;

  constructor(private route: ActivatedRoute, private sucursalServ: SucursalService,
    private generalServ: GeneralService, public dialog: MatDialog) {
    route.params.subscribe(params => { this.idUser = params['iduser']; });
    route.params.subscribe(params => { this.idCliente = params['idcliente']; });
    if (this.idUser == null) { this.idUser = null }
    if (this.idCliente == null) { this.idCliente = 0 }
  }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let dataUser = { 'IdUser': this.idUser, 'idCliente': this.idCliente, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.sucursalServ.getSucursalesByUsuario(dataUser)
      .subscribe(data => {
        this.data = data;
        if (this.data.ListSucursal == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loading.close(); });
  }

  deshabilitar(value: any) {
    let accion;
    if (value.Deshabilitar == null) {
      accion = 'Deshabilitar';
    } else {
      accion = 'Habilitar';
    }
    const modal = this.dialog.open(DeshabilitarSucursalModalComponent, {
      width: '450px',data: { accion: accion }
    });

    modal.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let data = { 'idSucursal': value.Id }
        this.sucursalServ.deshabilitar(data)
          .subscribe(data => {
            this.postDeshabilitar = data;
            if (value.Deshabilitar == null) {
              value.Deshabilitar = true;
            } else {
              value.Deshabilitar = null;
            }
            loadRef.close();
          }, error => { console.log(error); loadRef.close(); })
      }
    });
  }

  borrar(value: any) {
    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        this.sucursalServ.borrar(value.Id)
          .subscribe((data: any) => {
            if (data){
              this.data.ListSucursal = this.data.ListSucursal.filter((x: any) => x.Id != value.Id);
            }else {
              this.dialog.open(ErrorforaneaModalComponent, {
                width: '450px'
              });
            }
            loadRef.close();
          }, (error: any) => { console.log(error); loadRef.close(); })
      }
    });
  }
}
