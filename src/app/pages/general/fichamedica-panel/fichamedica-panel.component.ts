import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SucursalService } from '../../../Service/sucursal.service';
import { GeneralService } from '../../../Service/general.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeshabilitarSucursalModalComponent } from '../../../components/deshabilitar-sucursal-modal/deshabilitar-sucursal-modal.component';
import { ErrorforaneaModalComponent } from 'src/app/components/errorforanea-modal/errorforanea-modal.component';
import { EliminarModalComponent } from 'src/app/components/eliminar-modal/eliminar-modal.component';
import { FichaMedicaService } from 'src/app/Service/fichamedica.service';

@Component({
  selector: 'app-fichamedica-panel',
  templateUrl: './fichamedica-panel.component.html',
  styleUrls: ['./fichamedica-panel.component.css']
})
export class FichaMedicaPanelComponent implements OnInit {


  idUser: any;
  idCliente: any;
  data: any;
  postDeshabilitar: any;
  listFichaMedica: any;

  constructor(private route: ActivatedRoute, private fichaMedicaServ: FichaMedicaService,
    private generalServ: GeneralService, public dialog: MatDialog) {
    route.params.subscribe(params => { this.idUser = params['iduser']; });
    route.params.subscribe(params => { this.idCliente = params['idcliente']; });
    if (this.idUser == null) { this.idUser = null }
    if (this.idCliente == null) { this.idCliente = 0 }
  }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let dataUser = { 'IdUser': this.idUser, 'idCliente': this.idCliente, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.fichaMedicaServ.getFichaMedicaByUsuario(dataUser)
      .subscribe(data => {
        this.listFichaMedica = data;
/*         if (this.data == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        } */
        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loading.close(); });
  }



  borrar(value: any) {
    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        this.fichaMedicaServ.borrar(value.Id)
          .subscribe((data: any) => {
            if (data){
              this.listFichaMedica = this.listFichaMedica.filter((x: any) => x.Id != value.Id);
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
