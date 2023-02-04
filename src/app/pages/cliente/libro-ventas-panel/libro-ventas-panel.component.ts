import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { GeneralService } from '../../../Service/general.service';
import { ArticuloService } from 'src/app/Service/articulo.service';
import { CategotriaRubroService } from 'src/app/Service/categotria-rubro.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl,FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/Service/global.service';
import { map, startWith } from 'rxjs/operators';
import { ConsolidadoModel } from 'src/app/models/ConsolidadoModel';
import PropertyUtil, {TiposPropiedad} from '../../../util/property.util';
import { MensajeseleccionarsucursalModalComponent } from 'src/app/components/mensajeseleccionarsucursal-modal/mensajeseleccionarsucursal-modal.component';
import { PedidoService } from 'src/app/Service/pedido.service';
import * as moment from 'moment';
import { ListaPreciosService } from 'src/app/Service/lista-precios.service';
import { UserService } from '../../../Service/user.service';
import { ClienteclienteService } from 'src/app/Service/clientecliente.service';
import { Title } from '@angular/platform-browser';

/* import { saveAs,FileSaver, http } from 'file-saver'
import { HttpClient, HttpHeaders } from '@angular/common/http';
 */
@Component({
  selector: 'app-libro-ventas-panel',
  templateUrl: './libro-ventas-panel.component.html',
  styleUrls: ['./libro-ventas-panel.component.css']
})
export class LibroVentasPanelComponent implements OnInit {
  roles: any;
  public urlImprimir!: string;
  tieneRolCliente: any;
  idLista: any = "";
  listado: any;
  token: any;
  idClienteNegotis: any;
  fechaDesde: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  fechaHasta: any = this.calendar.getToday().day.toString().padStart(2, '0') + '/' + this.calendar.getToday().month.toString().padStart(2, '0') + '/' + this.calendar.getToday().year.toString().padStart(4, '0');
  filtroMes: any;
  fechaDesdeCantidad:any;
  fechaHastaCantidad:any;
  estadosEntrega = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_ENTREGA);
  limit: number = 20;
  page: number = 1;
  total: number = 0;
  totalNeto: number = 0;
  totalIva: number = 0;
  totalPedidos: number = 0;
  tieneRolCategoria: any;
  url :any;


  infoGeneral: any;
  sucSelecPost: any;
  myForm: FormGroup;

  sucursalServ: any;
  @Output() GetSucursalEmit: EventEmitter<any>;
  mostrarModalSeleccion!: boolean;
  constructor(
    private titleService: Title,
    private calendar: NgbCalendar,
    private dialog: MatDialog,
    private userServ: UserService,
    private fb: FormBuilder,
    private generalServ: GeneralService,
    private route: ActivatedRoute,
    private peddServ: ArticuloService,
    private globalService: GlobalService,
    private listaPrecServ : ListaPreciosService,
    private categoriaServ: CategotriaRubroService,
    private pedidoServ: PedidoService,
    private clienteServ: ClienteclienteService,

    ) {
      titleService.setTitle("Reportes");
      this.GetSucursalEmit = new EventEmitter();
    this.myForm = fb.group({
        'fechaDesde': ['', Validators.compose([])],
        'fechaHasta': ['', Validators.compose([])],
      })

   }

  ngOnInit() {
      var sucursalSeleccionada = JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
      const roles = JSON.parse(localStorage.getItem('roles') ?? '');
      this.tieneRolCliente = eval(localStorage.getItem('RolClienteNegotis') ?? '') || false;
      this.token = localStorage.getItem('token');
      this.idClienteNegotis = localStorage.getItem('idClienteNegotis');
      this.tieneRolCategoria = (roles != null && roles.CategoriaLibros);


        if (sucursalSeleccionada == null) {
          let dataUser = { 'idUser': localStorage.getItem('idUser') };
          this.sucursalServ.sucursalSeleccionadaByUsuario(dataUser)
            .subscribe((data: any) => {
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


  fechaDesdeFunc() {
    this.runDatePicker().subscribe(result => {
      this.fechaDesde = this.getDateAsString(result);

    });
  }



  exportarExcel2()
  {


    this.fechaDesde = moment(this.fechaDesde, 'DD/MM/YYYY').format('MM/DD/YYYY');
    this.fechaHasta = moment(this.fechaHasta, 'DD/MM/YYYY').format('MM/DD/YYYY');
    if(this.filtroMes != null)
    {
      if(this.filtroMes == "1" || this.filtroMes == "3" || this.filtroMes == "5" || this.filtroMes == "7" || this.filtroMes == "8" || this.filtroMes == "10" || this.filtroMes == "12")
      {
        if(this.filtroMes != 10 && this.filtroMes != 12)
        {
          this.filtroMes = "0" + this.filtroMes;
        }
        this.fechaDesde = this.filtroMes +"/"+ "01" +"/"+ this.calendar.getToday().year.toString().padStart(4, '0');
        this.fechaHasta = this.filtroMes +"/"+ "31" +"/"+ this.calendar.getToday().year.toString().padStart(4, '0');
      }
      if(this.filtroMes == "4" || this.filtroMes == "6" || this.filtroMes == "9" || this.filtroMes == "11")
      {
        if(this.filtroMes != 11)
        {
          this.filtroMes = "0" + this.filtroMes;
        }
        this.fechaDesde = this.filtroMes +"/"+ "01" +"/"+ this.calendar.getToday().year.toString().padStart(4, '0');
        this.fechaHasta = this.filtroMes +"/"+ "30" +"/"+this.calendar.getToday().year.toString().padStart(4, '0');
      }
      if(this.filtroMes == "2")
      {
        this.filtroMes = "0" + this.filtroMes;
        this.fechaDesde = this.filtroMes +"/"+ "01" +"/"+ this.calendar.getToday().year.toString().padStart(4, '0');
        this.fechaHasta = this.filtroMes +"/"+"28" +"/"+this.calendar.getToday().year.toString().padStart(4, '0');
      }
    }

      const loading = this.generalServ.loadingModal();
      let dataUser = {
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'idUser':localStorage.getItem('idUser'),
        'idSucursalEmpresa':this.sucSelecPost.IdSucursal,
        'fechaDesde': this.fechaDesde,
        'fechaHasta': this.fechaHasta,
        'fechaTipoVta' : true,
        'page': this.page,
        'pageSize': this.limit
      };

      this.pedidoServ.exportarExcel(dataUser)
      .subscribe(data => {
          var resultado = data;
          this.url = resultado;

try{
  const link = document.createElement('a');
  link.href = this.url;
  link.download = `libroVentas.xlsx`;
  link.click();
}
catch{

}

          this.fechaDesde = moment(this.fechaDesde, 'MM/DD/YYYY').format('DD/MM/YYYY');
          this.fechaHasta = moment(this.fechaHasta, 'MM/DD/YYYY').format('DD/MM/YYYY');

          loading.close();
          return;
          loading.close();
      }, error => { console.log(error); loading.close(); })



  }
  exportarAlicuotas()
  {

    this.fechaDesde = moment(this.fechaDesde, 'DD/MM/YYYY').format('MM/DD/YYYY');
    this.fechaHasta = moment(this.fechaHasta, 'DD/MM/YYYY').format('MM/DD/YYYY');
    if(this.filtroMes != null)
    {
      if(this.filtroMes == "1" || this.filtroMes == "3" || this.filtroMes == "5" || this.filtroMes == "7" || this.filtroMes == "8" || this.filtroMes == "10" || this.filtroMes == "12")
      {
        if(this.filtroMes != 10 && this.filtroMes != 12)
        {
          this.filtroMes = "0" + this.filtroMes;
        }
        this.fechaDesde = this.filtroMes +"/"+ "01" +"/"+ this.calendar.getToday().year.toString().padStart(4, '0');
        this.fechaHasta = this.filtroMes +"/"+ "31" +"/"+ this.calendar.getToday().year.toString().padStart(4, '0');
      }
      if(this.filtroMes == "4" || this.filtroMes == "6" || this.filtroMes == "9" || this.filtroMes == "11")
      {
        if(this.filtroMes != 11)
        {
          this.filtroMes = "0" + this.filtroMes;
        }
        this.fechaDesde = this.filtroMes +"/"+ "01" +"/"+ this.calendar.getToday().year.toString().padStart(4, '0');
        this.fechaHasta = this.filtroMes +"/"+ "30" +"/"+this.calendar.getToday().year.toString().padStart(4, '0');
      }
      if(this.filtroMes == "2")
      {
        this.filtroMes = "0" + this.filtroMes;
        this.fechaDesde = this.filtroMes +"/"+ "01" +"/"+ this.calendar.getToday().year.toString().padStart(4, '0');
        this.fechaHasta = this.filtroMes +"/"+"28" +"/"+this.calendar.getToday().year.toString().padStart(4, '0');
      }
    }
      const loading = this.generalServ.loadingModal();
      let dataUser = {
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'idUser':localStorage.getItem('idUser'),
        'idSucursalEmpresa':this.sucSelecPost.IdSucursal,
        'fechaDesde': this.fechaDesde,
        'fechaHasta': this.fechaHasta,
        'fechaTipoVta' : true,
        'page': this.page,
        'pageSize': this.limit
      };

      this.pedidoServ.exportarAlicuotas(dataUser)
      .subscribe(data => {
          var resultado = data;
          this.url = resultado;


        try{
          const link2 = document.createElement('a');
          link2.href = this.url;
          link2.download = `VentasAlicuotas.txt`;
          link2.click();
        }
        catch
        {

        }




          this.fechaDesde = moment(this.fechaDesde, 'MM/DD/YYYY').format('DD/MM/YYYY');
          this.fechaHasta = moment(this.fechaHasta, 'MM/DD/YYYY').format('DD/MM/YYYY');

          loading.close();
          return;
          loading.close();
      }, error => { console.log(error); loading.close(); })



  }
  exportarTxtVentas()
  {

    this.fechaDesde = moment(this.fechaDesde, 'DD/MM/YYYY').format('MM/DD/YYYY');
    this.fechaHasta = moment(this.fechaHasta, 'DD/MM/YYYY').format('MM/DD/YYYY');
    if(this.filtroMes != null)
    {
      if(this.filtroMes == "1" || this.filtroMes == "3" || this.filtroMes == "5" || this.filtroMes == "7" || this.filtroMes == "8" || this.filtroMes == "10" || this.filtroMes == "12")
      {
        if(this.filtroMes != 10 && this.filtroMes != 12)
        {
          this.filtroMes = "0" + this.filtroMes;
        }
        this.fechaDesde = this.filtroMes +"/"+ "01" +"/"+ this.calendar.getToday().year.toString().padStart(4, '0');
        this.fechaHasta = this.filtroMes +"/"+ "31" +"/"+ this.calendar.getToday().year.toString().padStart(4, '0');
      }
      if(this.filtroMes == "4" || this.filtroMes == "6" || this.filtroMes == "9" || this.filtroMes == "11")
      {
        if(this.filtroMes != 11)
        {
          this.filtroMes = "0" + this.filtroMes;
        }
        this.fechaDesde = this.filtroMes +"/"+ "01" +"/"+ this.calendar.getToday().year.toString().padStart(4, '0');
        this.fechaHasta = this.filtroMes +"/"+ "30" +"/"+this.calendar.getToday().year.toString().padStart(4, '0');
      }
      if(this.filtroMes == "2")
      {
        this.filtroMes = "0" + this.filtroMes;
        this.fechaDesde = this.filtroMes +"/"+ "01" +"/"+ this.calendar.getToday().year.toString().padStart(4, '0');
        this.fechaHasta = this.filtroMes +"/"+"28" +"/"+this.calendar.getToday().year.toString().padStart(4, '0');
      }
    }
      const loading = this.generalServ.loadingModal();
      let dataUser = {
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'idUser':localStorage.getItem('idUser'),
        'idSucursalEmpresa':this.sucSelecPost.IdSucursal,
        'fechaDesde': this.fechaDesde,
        'fechaHasta': this.fechaHasta,
        'fechaTipoVta' : true,
        'page': this.page,
        'pageSize': this.limit

      };

      this.pedidoServ.exportarTxtVentas(dataUser)
      .subscribe(data => {
          var resultado = data;
          this.url = resultado;


        try
        {
          const link3 = document.createElement('a');
          link3.href = this.url;
          link3.download = `VentasComprobantes.txt`;
          link3.click();
        }
        catch
        {

        }



          this.fechaDesde = moment(this.fechaDesde, 'MM/DD/YYYY').format('DD/MM/YYYY');
          this.fechaHasta = moment(this.fechaHasta, 'MM/DD/YYYY').format('DD/MM/YYYY');

          loading.close();
          return;
          loading.close();
      }, error => { console.log(error); loading.close(); })



  }




  fechaHastaFunc() {
    this.runDatePicker().subscribe(result => {
      this.fechaHasta = this.getDateAsString(result);

    });
  }
  runDatePicker() {
    const dialogRef = this.dialog.open(DatepickerModalComponent, {
      width: '350px', data: { permitirFechaPasada: true },
    });
    return dialogRef.afterClosed();
  }

  getDateAsString(result: any): string {
    if (result != null) {
      if (result instanceof NgbDate) {
        return result.day.toString().padStart(2, '0') + '/' + result.month.toString().padStart(2, '0') + '/' + result.year.toString().padStart(4, '0');
      } else if (result instanceof Date) {
        return result.getDate().toString().padStart(2, '0') + '/' + (result.getMonth() + 1).toString().padStart(2, '0') + '/' + result.getFullYear().toString().padStart(4, '0');
      } else if ('day' in result && 'month' in result && 'year' in result) {
        return result.day.toString().padStart(2, '0') + '/' + result.month.toString().padStart(2, '0') + '/' + result.year.toString().padStart(4, '0');
      }
    }
    return '';
  }

  armarUrlBusqueda() {
      this.urlImprimir = this.globalService.urlApi + '/ApiArticulo/Get/Pdf/Listado/Reporte?' +
      'idClienteNegotis=' + localStorage.getItem('idClienteNegotis') +
      '&fechaDesde=' + this.fechaDesde +
      '&fechaHasta=' + this.fechaHasta +
      '&idSucursal=' + this.sucSelecPost.IdSucursal+
      '&token=' + localStorage.getItem('token');
  }
  getLista(value: any) {
    this.idLista = value.Id;
  }
  limpiar() {
    const fechaHoy = this.calendar.getToday();
    this.fechaDesde = fechaHoy.day.toString().padStart(2, '0') + '/' + fechaHoy.month.toString().padStart(2, '0') + '/' + fechaHoy.year.toString().padStart(4, '0');
    this.fechaHasta = fechaHoy.day.toString().padStart(2, '0') + '/' + fechaHoy.month.toString().padStart(2, '0') + '/' + fechaHoy.year.toString().padStart(4, '0');
    this.page = 1;

    this.total=0;
    this.filtroMes = null;
    this.idLista="";
    this.buscar();
  }







  buscar(){
    const loadRef = this.generalServ.loadingModal();
    this.fechaDesde = moment(this.fechaDesde, 'DD/MM/YYYY').format('MM/DD/YYYY');
    this.fechaHasta = moment(this.fechaHasta, 'DD/MM/YYYY').format('MM/DD/YYYY');
    if(this.filtroMes != null)
    {
      if(this.filtroMes == "1" || this.filtroMes == "3" || this.filtroMes == "5" || this.filtroMes == "7" || this.filtroMes == "8" || this.filtroMes == "10" || this.filtroMes == "12")
      {
        if(this.filtroMes != 10 && this.filtroMes != 12)
        {
          this.filtroMes = "0" + this.filtroMes;
        }
        this.fechaDesde = this.filtroMes +"/"+ "01" +"/"+ this.calendar.getToday().year.toString().padStart(4, '0');
        this.fechaHasta = this.filtroMes +"/"+ "31" +"/"+ this.calendar.getToday().year.toString().padStart(4, '0');
      }
      if(this.filtroMes == "4" || this.filtroMes == "6" || this.filtroMes == "9" || this.filtroMes == "11")
      {
        if(this.filtroMes != 11)
        {
          this.filtroMes = "0" + this.filtroMes;
        }
        this.fechaDesde = this.filtroMes +"/"+ "01" +"/"+ this.calendar.getToday().year.toString().padStart(4, '0');
        this.fechaHasta = this.filtroMes +"/"+ "30" +"/"+this.calendar.getToday().year.toString().padStart(4, '0');
      }
      if(this.filtroMes == "2")
      {
        this.filtroMes = "0" + this.filtroMes;
        this.fechaDesde = this.filtroMes +"/"+ "01" +"/"+ this.calendar.getToday().year.toString().padStart(4, '0');
        this.fechaHasta = this.filtroMes +"/"+"28" +"/"+this.calendar.getToday().year.toString().padStart(4, '0');
      }
    }
    const dataFiltro = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'idUser':localStorage.getItem('idUser'),
      'fechaDesde': this.fechaDesde,
      'fechaHasta': this.fechaHasta,
      'fechaTipoVta' : true,
      'page': this.page,
      'pageSize': this.limit,
      'idSucursalEmpresa':this.sucSelecPost.IdSucursal,
    };
    this.pedidoServ.libroVentas(dataFiltro).subscribe((data: any) => {

      this.listado= data.Pedidos2;
      this.total = data.totalItems;
      this.totalIva = data.totalIva;
      this.totalNeto = data.totalNeto;
      this.totalPedidos = this.totalIva + this.totalNeto;
      this.fechaDesde = moment(this.fechaDesde, 'MM/DD/YYYY').format('DD/MM/YYYY');
      this.fechaHasta = moment(this.fechaHasta, 'MM/DD/YYYY').format('DD/MM/YYYY');

      this.armarUrlBusqueda();
      loadRef.close();

  }, (error: any) => { console.log(error); loadRef.close(); });
}
goToPage(n: number): void {
  this.page = n;
  this.buscar();
}

onNext(): void {
  this.page++;
  this.buscar();
}

onPrev(): void {
  this.page--;
  this.buscar();
}
}


