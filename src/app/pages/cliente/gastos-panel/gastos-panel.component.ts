import { Component, OnInit } from '@angular/core';
import { CajaService } from '../../../Service/caja.service';
import { EliminarModalComponent } from '../../../components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from '../../../components/errorforanea-modal/errorforanea-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbDateStruct, NgbCalendar, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { GeneralService } from '../../../Service/general.service';
import { CategoriaGastoService } from 'src/app/Service/categoriagasto.service';
import { Title } from '@angular/platform-browser';
import { GlobalService } from 'src/app/Service/global.service';
import { PedidoService } from 'src/app/Service/pedido.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-gastos-panel',
  templateUrl: './gastos-panel.component.html',
  styleUrls: ['./gastos-panel.component.css']
})
export class GastosPanelComponent implements OnInit {


  listadoGasto: any;
  fechaDesde: any = this.calendar.getToday().day + '/' + this.calendar.getToday().month + '/' + this.calendar.getToday().year;
  fechaHasta: any = this.calendar.getToday().day + '/' + this.calendar.getToday().month + '/' + this.calendar.getToday().year;
  submittedFechaDesde: any;
  submittedFechaHasta: any;
  totalGastos: number = 0;
  fechaDesdeFormat: any;
  fechaHastaFormat: any;
  sucursal: any;
  listaCategoriaGasto: any[] = [];
  listaUsuarios: any[] = [];
  filtroCategoria: any = '';

  infoVendedores: any;
  vendedorNombres: any;
  IdVendedor: string = "";
  vendedorCtrl = new FormControl();
  filteredVendedor!: Observable<any[]>;

  bloquearFiltroTotales! : boolean;
  editarDepositos: boolean = false;
  public urlImprimir!: string;
  constructor(
    private titleService: Title,
    private cajaServ: CajaService,
    public dialog: MatDialog,
    private calendar: NgbCalendar,
    private generalServ: GeneralService,
    private catGasServ: CategoriaGastoService,
    private globalService: GlobalService,
    private pedidoServ: PedidoService,)
    {
      titleService.setTitle("Caja");
     }

  ngOnInit() {
    const tieneRolClienteNegotis = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
    const roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.bloquearFiltroTotales = (roles != null && roles.FiltroTotalesGastos);
    this.editarDepositos = (roles != null && roles.OcultarEditarDepositos);
  }

  getSucursalVendedor(value: any) {
    this.sucursal = value.Sucursal;
    let loadingcatGasServ = this.generalServ.loadingModal();
    this.catGasServ.listadoCategoriaGastoByIdClienteNegotis({ 'idClienteNegotis': localStorage.getItem('idClienteNegotis') }).
      subscribe(data => {
        let dataArray = data as any[];
        this.listaCategoriaGasto = dataArray;
        this.buscar();
        loadingcatGasServ.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loadingcatGasServ.close(); }
      );

      let datos = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'Page': 1};
      const loadingVendedor = this.generalServ.loadingModal();
      this.pedidoServ.getInfoGeneral(datos).subscribe(result => {
        this.infoVendedores = result;
        loadingVendedor.close();
        this.filteredVendedor = this.vendedorCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterVendedor(item) : this.infoVendedores.Empleados.slice())
        );
      }, error => {
        console.log(error);
        loadingVendedor.close();
    });

  }

  getVendedor(item: any) {
    this.IdVendedor = item.Id;
    this.vendedorNombres = item.Nombres;
  }

  private _filterVendedor(value: string): any[] {
    const filterValue = value.toLowerCase();

     return this.infoVendedores.Empleados.filter((item: any) => item.Nombres.toLowerCase().includes(filterValue.toLowerCase()) || item.Apellidos.toLowerCase().includes(filterValue.toLowerCase()));
   }

  armarUrlBusqueda() {
    this.urlImprimir = this.globalService.urlApi + '/ApiGasto/Imprimir?' +
    '&idClienteNegotis=' + localStorage.getItem('idClienteNegotis') +
    '&idSucursal=' + this.sucursal.Id +
    '&fechaDesde=' + this.fechaDesdeFormat +
    '&fechaHasta=' + this.fechaHastaFormat +
    '&filterNombreCategoria=' + this.filtroCategoria +
    '&idVendedor=' + this.IdVendedor +
    '&token=' + localStorage.getItem('token');
  }

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataRegion = { 'idGasto': value.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.cajaServ.eliminarGasto(dataRegion).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (let item of this.listadoGasto.ListGasto) {
              if (item.Id == value.Id) {
                this.listadoGasto.ListGasto.splice(index, 1)
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

  limpiar() {
    this.fechaDesde = this.calendar.getToday().day + '/' + this.calendar.getToday().month + '/' + this.calendar.getToday().year;
    this.fechaHasta = this.calendar.getToday().day + '/' + this.calendar.getToday().month + '/' + this.calendar.getToday().year;
    this.IdVendedor = 'null';
    this.vendedorNombres='';
    this.buscar();
  }

  buscar() {
    const loadRef = this.generalServ.loadingModal();
    this.fechaDesdeFormat = this.fechaDesde.split("/").reverse().join("/");
    this.fechaHastaFormat = this.fechaHasta.split("/").reverse().join("/");
    let data = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'fechaDesde': this.fechaDesdeFormat,
      'fechaHasta': this.fechaHastaFormat,
      'idSucursal': this.sucursal.Id,
      'filterNombreCategoria': this.filtroCategoria,
      'idVendedor' : this.IdVendedor
    };
    this.cajaServ.listGetGastoByIdSucursalFechas(data)
      .subscribe(data => {
        this.totalGastos = 0;
        this.listadoGasto = data;
        this.submittedFechaDesde = this.fechaDesde;
        this.submittedFechaHasta = this.fechaHasta;
        this.armarUrlBusqueda();
        for (let item of this.listadoGasto.ListGasto) {
          this.totalGastos = this.totalGastos + item.Monto;

          let getFecha = new Date(Number(item.FechaCracion.replace('/Date(', '').replace(')/', '')));
          item.FechaCracion = getFecha.getUTCDate() + '/' + (getFecha.getUTCMonth() + 1) + '/' + getFecha.getUTCFullYear();
          console.log(item.FechaCracion);
        }
        loadRef.close();

      }, error => { console.log(error); loadRef.close(); });
  }


  fechaDesdeFunc() {
    const dialogRef = this.dialog.open(DatepickerModalComponent, {
      width: '350px', data: { permitirFechaPasada: true },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.fechaDesde = result.day + '/' + result.month + '/' + result.year;
      }
    });
  }

  fechaHastaFunc() {
    const dialogRef = this.dialog.open(DatepickerModalComponent, {
      width: '350px', data: { permitirFechaPasada: true },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.fechaHasta = result.day + '/' + result.month + '/' + result.year;
      }
    });
  }

  getNameFromCategoriaGastoId(value: any): any {
    let objResult = this.listaCategoriaGasto.find(x => x.Id == value);
    return objResult && objResult.Nombre;
  }

}
