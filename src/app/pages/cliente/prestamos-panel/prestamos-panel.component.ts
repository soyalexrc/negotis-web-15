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
import { MensajeModalComponent } from 'src/app/components/mensaje-modal/mensaje-modal.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ClienteclienteService } from 'src/app/Service/clientecliente.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-prestamos-panel',
  templateUrl: './prestamos-panel.component.html',
  styleUrls: ['./prestamos-panel.component.css']
})
export class PrestamosPanelComponent implements OnInit {

  cuotasAPagar:any;
  prestamosCambiarEstadoIndices: any = [];
  prestamosImprimir: any = [];
  cliente = '';
  busquedaCliente = '';
  clienteCtrl = new FormControl();
  filteredCliente!: Observable<any[]>;
  clienteSucursales: any;
  idCliente: any;
  listadoPrestamos: any;
  fechaDesde: any = this.calendar.getToday().day + '/' + this.calendar.getToday().month + '/' + this.calendar.getToday().year;
  fechaHasta: any = this.calendar.getToday().day + '/' + this.calendar.getToday().month + '/' + this.calendar.getToday().year;
  submittedFechaDesde: any;
  submittedFechaHasta: any;
  totalPrestamos: number = 0;
  fechaDesdeFormat: any;
  fechaHastaFormat: any;
  infoGeneral: any;
  sucursal: any;
  public urlImprimir!: string;
  constructor(
    private titleService: Title,
    private cajaServ: CajaService,
    public dialog: MatDialog,
    private calendar: NgbCalendar,
    private generalServ: GeneralService,
    private clienteServ: ClienteclienteService,
    private globalService: GlobalService)
    {
      titleService.setTitle("Caja");
     }

  ngOnInit() {
    const tieneRolClienteNegotis = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
    const roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.buscar();
   /*  this.bloquearFiltroTotales = (roles != null && roles.FiltroTotalesGastos);
    this.editarDepositos = (roles != null && roles.OcultarEditarDepositos); */
  }

  getSucursalVendedor(value: any) {
    this.sucursal = value.Sucursal;
   /*  let loadingcatGasServ = this.generalServ.loadingModal();
    this.catGasServ.listadoCategoriaGastoByIdClienteNegotis({ 'idClienteNegotis': localStorage.getItem('idClienteNegotis') }).
      subscribe(data => {
        let dataArray = data as any[];
        this.listaCategoriaGasto = dataArray;
        this.buscar();
        loadingcatGasServ.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loadingcatGasServ.close(); }
      ); */
  }

/*   armarUrlBusqueda() {
    this.urlImprimir = this.globalService.urlApi + '/ApiGasto/Imprimir?' +
    '&idClienteNegotis=' + localStorage.getItem('idClienteNegotis') +
    '&idSucursal=' + this.sucursal.Id +
    '&fechaDesde=' + this.fechaDesdeFormat +
    '&fechaHasta=' + this.fechaHastaFormat +

    '&filterNombreCategoria=' + this.filtroCategoria +
    '&token=' + localStorage.getItem('token');
  } */

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataRegion = { 'idPrestamo': value.Id, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.cajaServ.eliminarPrestamo(dataRegion).subscribe(data => {
          if (data == true) {
            let index = 0;
            for (let item of this.listadoPrestamos.ListPrestamo) {
              if (item.Id == value.Id) {
                this.listadoPrestamos.ListPrestamo.splice(index, 1)
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
    const fechaHoy = this.calendar.getToday();
    this.fechaDesde = fechaHoy.day.toString().padStart(2, '0') + '/' + fechaHoy.month.toString().padStart(2, '0') + '/' + fechaHoy.year.toString().padStart(4, '0');
    this.fechaHasta = fechaHoy.day.toString().padStart(2, '0') + '/' + fechaHoy.month.toString().padStart(2, '0') + '/' + fechaHoy.year.toString().padStart(4, '0');
    this.idCliente = null;
    this.prestamosImprimir = [];
    this.infoGeneral=null;
    this.prestamosCambiarEstadoIndices = [];
    this.buscar();
  }


  public filtrarCliente() {
    if (this.cliente.toString().length > 4) {
      if (this.cliente.toString().length >= this.busquedaCliente.toString().length) {
        const loadRef = this.generalServ.loadingModalBuscar();
        let data = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'textoBusqueda': this.cliente, 'page': 1, 'pageSize': 20 };
        this.clienteServ.busquedaClientesClienteNegotisPaginado(data).subscribe(resp => {
          loadRef.close();
          this.infoGeneral = resp;
          this.filteredCliente = this.clienteCtrl.valueChanges
            .pipe(
              startWith(''),
              map(item => item ? this._filterCliente(item) : this.infoGeneral.slice())
            );

          loadRef.close();
        });
      }
    }
    this.busquedaCliente = this.cliente;
  }

  private _filterCliente(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.infoGeneral.filter((item: any) => item.RazonSocial.toLowerCase().includes(filterValue.toLowerCase()));
  }


  async seleccionarTodosPedidosCambioEstado(event: any) {
    this.prestamosCambiarEstadoIndices = [];
    this.prestamosImprimir = [];

    for (let i = 0; i < this.listadoPrestamos.ListPrestamo.length; i++) {
      if (event.target.checked) {
        this.prestamosCambiarEstadoIndices.push(i);
      }
      this.listadoPrestamos.ListPrestamo[i].pedidosPendienteChecked = event.target.checked;
    }
    for (let index = 0; index < this.prestamosCambiarEstadoIndices.length; index++) {
      this.prestamosImprimir.push(this.listadoPrestamos.ListPrestamo[this.prestamosCambiarEstadoIndices[index]].Id);
      }
  }


  async cambiarEstado(event: any, i: number) {
    if (event.target.checked) {
      this.prestamosImprimir = [];
      this.prestamosCambiarEstadoIndices.push(i);
      const index = this.prestamosCambiarEstadoIndices.indexOf(i);
      for (let index = 0; index < this.prestamosCambiarEstadoIndices.length; index++) {
      this.prestamosImprimir.push(this.listadoPrestamos.ListPrestamo[this.prestamosCambiarEstadoIndices[index]].Id);
      }
    }
    else
    {
      let index2 = 0;
      //this.articulosResaltar = [];
      //this.articulosResaltar.push(i);
      const index = this.prestamosCambiarEstadoIndices.indexOf(i);

      for (let item of this.prestamosCambiarEstadoIndices) {
        if(item == i)
        {
          this.prestamosImprimir.splice(index2,1);
          this.prestamosImprimir.splice(index2,1);
        }
        index2++;
        }

    }
  }
  getCliente(value: any) {
    this.idCliente = value.Id;
  }

  resetCliente() {
    this.idCliente = null;
  }

  pagarPrestamos()
  {
    let data = {
      'prestamosCambiarEstadoIndices': this.prestamosImprimir,
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'cuotasAPagar': this.cuotasAPagar
    };
    this.cajaServ.pagarCuotas(data)
      .subscribe(data => {
        if(data == false)
        {
          this.dialog.open(MensajeModalComponent, {
            width: '450px',
            data: {
              titulo: 'Error al cobrar cuotas',
              mensaje: 'No se ha podido cobrar debido a que la cantidad de cuotas indicadas supera la cantidad de cuotas a pagar.'
            }
          });
        }
        this.prestamosImprimir = [];
        this.prestamosCambiarEstadoIndices = [];
        this.cuotasAPagar = 0;
        this.buscar();
      }, error => { console.log(error);});
  }


  buscar() {
    const loadRef = this.generalServ.loadingModal();
    this.fechaDesdeFormat = this.fechaDesde.split("/").reverse().join("/");
    this.fechaHastaFormat = this.fechaHasta.split("/").reverse().join("/");
    //,'idSucursal': this.sucursal.Id
    let data = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'fechaDesde': this.fechaDesdeFormat,
      'fechaHasta': this.fechaHastaFormat,
      'idCliente': this.idCliente
    };
    this.cajaServ.listGetPrestamoByIdSucursalFechas(data)
      .subscribe(data => {
        //this.totalGastos = 0;
        this.listadoPrestamos = data;
        this.submittedFechaDesde = this.fechaDesde;
        this.submittedFechaHasta = this.fechaHasta;
        //this.armarUrlBusqueda();
        for (let item of this.listadoPrestamos.ListPrestamo) {
          //this.totalGastos = this.totalGastos + item.Monto;

          let getFecha = new Date(Number(item.FechaCracion.replace('/Date(', '').replace(')/', '')));
          item.FechaCracion = getFecha.getUTCDate() + '/' + (getFecha.getUTCMonth() + 1) + '/' + getFecha.getUTCFullYear();

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

/*   getNameFromCategoriaGastoId(value: any): any {
    let objResult = this.listaCategoriaGasto.find(x => x.Id == value);
    return objResult && objResult.Nombre;
  } */

}
