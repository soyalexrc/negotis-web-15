import { Component, OnInit } from '@angular/core';
import { EstadoCheque } from 'src/app/models/EstadoCheque';
import { EstadoChequeService } from 'src/app/Service/estado-cheque.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EliminarModalComponent } from 'src/app/components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from 'src/app/components/errorforanea-modal/errorforanea-modal.component';
import { Title } from '@angular/platform-browser';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-estadocheque-panel',
  templateUrl: './estadocheque-panel.component.html',
  styleUrls: ['./estadocheque-panel.component.css']
})
export class EstadochequePanelComponent implements OnInit {

  roles: any;
  rolClienteNegotis: any;
  post: any;
  strNingunMovimiento = 'Ningun Movimiento';
  strIngreso = 'Ingreso';
  strEgreso = 'Egreso';
  strCompra = 'Compra';
  strVenta = 'Venta';
  strCompraVenta = 'Compra/Venta';
  lista: EstadoCheque[] = [];

  constructor(
    private titleService: Title,
    private estadoChequeService: EstadoChequeService,
    private router: Router,
    private route: ActivatedRoute,
    private generalServ: GeneralService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    titleService.setTitle("Finanzas");
    this.roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.rolClienteNegotis = localStorage.getItem('RolClienteNegotis');

    this.loadLista();
  }

  ngOnInit() {
  }

  getSucursalVendedor(value: any) {

  }

  loadLista() {
    const loadRef = this.generalServ.loadingModal();
    let request = {
      idClienteNegotis: localStorage.getItem('idClienteNegotis')
    }
    this.estadoChequeService.listarValoresPorFiltro(request)
      .subscribe(data => {
        this.post = data;
        this.fillLista(this.post);
        loadRef.close();
      }, error => {
        console.log(error);
        loadRef.close();
      });
  }

  fillLista(value: any[]) {
    value.forEach(element => {
      let estado = new EstadoCheque();
      estado.FromObject(element);
      this.lista.push(estado);
    });
    console.log(this.lista);
  }

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let request = { 'id': value.id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.estadoChequeService.eliminar(request).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (let item of this.lista) {
              if (item.id == value.id) {
                this.lista.splice(index, 1);
                break;
              }
              index++;
            }
          } else {
            this.dialog.open(ErrorforaneaModalComponent, {
              width: '450px'
            });
          }
          loadRef.close();
        }, error => { console.log(error); loadRef.close(); })
      }
    });
  }

  getRepresentacionTexto(value: number): string {
    let result = '';
    if (value === 1) {
      result = this.strIngreso;
    } else if (value === -1) {
      result = this.strEgreso;
    } else {
      result = this.strNingunMovimiento;
    }
    return result;
  }

  getTipoOperacionTexto(value: number): string {
    let result = '';
    if (value === 1) {
      result = this.strCompra;
    } else if (value === 2) {
      result = this.strVenta;
    } else if (value === 3) {
      result = this.strCompraVenta;
    }
    return result;
  }
}
