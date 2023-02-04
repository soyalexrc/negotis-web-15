import { Component, OnInit } from '@angular/core';
import { ProveedorService } from 'src/app/Service/proveedor.service';
import { GlobalService } from '../../../Service/global.service';
import { MatDialog } from '@angular/material/dialog';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from '../../../components/errorforanea-modal/errorforanea-modal.component';
import { GeneralService } from '../../../Service/general.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-proveedor-panel',
  templateUrl: './proveedor-panel.component.html',
  styleUrls: ['./proveedor-panel.component.css']
})
export class ProveedorPanelComponent implements OnInit {

  nombreCtrl = new FormControl();
  filteredNombre: Observable<any[]> | any;
  nombreFiltro: any;

  apellidoCtrl = new FormControl();
  filteredApellido: Observable<any[]> | any;
  apellidoFiltro: any;

  cuitCtrl = new FormControl();
  filteredCuit: Observable<any[]> | any;
  cuitFiltro: any;

  razonSocialCtrl = new FormControl();
  filteredRazonSocial: Observable<any[]> | any;
  razonSocialFiltro: any;

  empresaCtrl = new FormControl();
  filteredEmpresa: Observable<any[]> | any;
  empresaFiltro: any;

  nroCuentaCtrl = new FormControl();
  filteredNroCuenta: Observable<any[]> | any;
  nroCuentaFiltro: any;


  listado: any;
  listadoOriginal: any;
  id: any;
  token: any;

  constructor(
    private titleService: Title,
      private global: GlobalService,
      private proveedorService: ProveedorService,
      public dialog: MatDialog,
      private generalServ: GeneralService) {
        titleService.setTitle("Stock");
  }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    this.proveedorService.getAll().subscribe(data => {
      this.listado = data;
      this.listadoOriginal = data;
      this.filteredNombre = this.nombreCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterNombre(item) : this.listadoOriginal.slice())
        );
      this.filteredApellido = this.apellidoCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterApellido(item) : this.listadoOriginal.slice())
        );
      this.filteredRazonSocial = this.razonSocialCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterRazonSocial(item) : this.listadoOriginal.slice())
        );
      this.filteredCuit = this.cuitCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterCuit(item) : this.listadoOriginal.slice())
        );
      this.filteredEmpresa = this.empresaCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterEmpresa(item) : this.listadoOriginal.slice())
        );
      this.filteredNroCuenta = this.nroCuentaCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterNroCuenta(item) : this.listadoOriginal.slice())
        );
      loading.close();
    }, error => { console.log(error); loading.close(); });
  }

  //filter
  private _filterNombre(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listadoOriginal.filter((item: any) => item.nombre.toLowerCase().includes(filterValue.toLowerCase()));
  }

  private _filterApellido(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listadoOriginal.filter((item: any) => item.apellido.toLowerCase().includes(filterValue.toLowerCase()));
  }

  private _filterRazonSocial(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listadoOriginal.filter((item: any) => item.razonSocial.toLowerCase().includes(filterValue.toLowerCase()));
  }

  private _filterCuit(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listadoOriginal.filter((item: any) => item.cuit.toLowerCase().includes(filterValue.toLowerCase()));
  }

  private _filterEmpresa(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listadoOriginal.filter((item: any) => item.empresa.toLowerCase().includes(filterValue.toLowerCase()));
  }

  private _filterNroCuenta(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.listadoOriginal.filter((item: any) => item.numeroCuenta.toString().includes(filterValue.toLowerCase()));
  }

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        this.proveedorService.delete(value.id).subscribe((data: any) => {
          if (data) {
            let index = 0;
            for (let item of this.listado) {
              if (item.Id == value.Id) {
                this.listado.splice(index, 1)
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
        }, (error: any) => { console.log(error); loadRef.close(); })
      }
    });
  }

  limpiar() {
    this.nombreFiltro = null;
    this.apellidoFiltro = null;
    this.razonSocialFiltro = null;
    this.cuitFiltro = null;
    this.nroCuentaFiltro = null;
    this.empresaFiltro = null;
    this.listado = this.listadoOriginal;
  }

  buscar() {
    this.listado = this.listadoOriginal;
    if (this.nombreFiltro != null && this.nombreFiltro != '') {
      this.listado = this.listado.filter((s: any) => s.nombre.toUpperCase().includes(this.nombreFiltro.toUpperCase()));
    }
    if (this.apellidoFiltro != null && this.apellidoFiltro != '') {
      this.listado = this.listado.filter((s: any) => s.apellido.toUpperCase().includes(this.apellidoFiltro.toUpperCase()));
    }
    if (this.razonSocialFiltro != null && this.razonSocialFiltro != '') {
      this.listado = this.listado.filter((s: any) => s.razonSocial.toUpperCase().includes(this.razonSocialFiltro.toUpperCase()));
    }
    if (this.cuitFiltro != null && this.cuitFiltro != '') {
      this.listado = this.listado.filter((s: any) => s.cuit.toUpperCase().includes(this.cuitFiltro.toUpperCase()));
    }
    if (this.nroCuentaFiltro != null && this.nroCuentaFiltro != '') {
      this.listado = this.listado.filter((s: any) => s.numeroCuenta.toString().toUpperCase().includes(this.nroCuentaFiltro.toUpperCase()));
    }
    if (this.empresaFiltro != null && this.empresaFiltro != '') {
      this.listado = this.listado.filter((s: any) => s.empresa.toUpperCase().includes(this.empresaFiltro.toUpperCase()));
    }
  }

}
