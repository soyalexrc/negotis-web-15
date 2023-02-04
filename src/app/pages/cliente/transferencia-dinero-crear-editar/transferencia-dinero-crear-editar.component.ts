import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../Service/general.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferenciaDineroService } from '../../../Service/transferencia-dinero.service';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {TransferenciaDineroModel} from './TransferenciaDineroModel';
import { ImprimirEgresoModal } from 'src/app/components/imprimir-egreso-modal/imprimir-egreso-modal.component';
import { GlobalService } from 'src/app/Service/global.service';
import { Title } from '@angular/platform-browser';
import { UserService } from 'src/app/Service/user.service';
import { DatepickerModalComponent } from 'src/app/components/datepicker-modal/datepicker-modal.component';

@Component({
  selector: 'app-transferencia-dinero-crear-editar',
  templateUrl: './transferencia-dinero-crear-editar.component.html',
  styleUrls: ['./transferencia-dinero-crear-editar.component.css']
})
export class TransferenciaDineroCrearEditarComponent implements OnInit {

  idTransDep: any;
  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  idDeSucursal: any;
  infoInicio: any;
  transDepById: any;
  descripcion: any;
  monto: any = 0;
  idParaSucursal: any;
  valMonto:any;
  deSucParaSuc: boolean = false;
  extParaSuc: boolean = true;
  egresoDinero: boolean = false;
  turnoCaja: boolean = false;
  fechaDesde:any = this.calendar.getToday().day + '/' + this.calendar.getToday().month + '/' + this.calendar.getToday().year;
  fechaDesdeFormat: any;

  sucursales: any[]=[];
  idEgreso: any = 0;
  token: any;
  idClienteNegotis: any;
  turno : any;
  turnos: any;
  constructor(private titleService: Title,private generalServ: GeneralService, private transDinServ: TransferenciaDineroService, private calendar: NgbCalendar,
    private router: Router, private route: ActivatedRoute,public globalServ: GlobalService,private dialog: MatDialog,private userServ: UserService, private snackBar: MatSnackBar, private fb: FormBuilder) {
      titleService.setTitle("Caja");
      this.token = localStorage.getItem('token');
    this.idClienteNegotis = localStorage.getItem('idClienteNegotis');
    this.myForm = fb.group({
      idParaSucursal: ['', Validators.compose([Validators.required])],
      monto: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9.,]+$')])],
      descripcion: ['', Validators.compose([])],
      deSucParaSuc: ['', Validators.compose([])],
      extParaSuc: ['', Validators.compose([])],
      egresoDinero: ['', Validators.compose([])],
      fechaMovimiento: ['', Validators.compose([])],

    });
    route.params.subscribe(params => { this.idTransDep = params['idtransdep']; });
    const dataTurno = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.userServ.obtenerTurnos(dataTurno).subscribe((data: any) => {
        this.turnos = data;
      }, (error: any) => { console.log(error);});
      this.userServ.obtenerTurno(dataTurno).subscribe((data: any) => {
        this.turno = data;
      }, (error: any) => { console.log(error);});
    if (this.idTransDep != null) {
      const loading = this.generalServ.loadingModal();
      let dataToEdit = { 'idTransferenciaDeposito': this.idTransDep,
      'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.transDinServ.getById(dataToEdit).subscribe(data => {
        this.transDepById = data;
        if (this.transDepById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.idParaSucursal = this.transDepById.IdParaSucursal;
        this.idDeSucursal = this.transDepById.IdDeSucursal;
        this.getDataInicio();
        this.monto = this.transDepById.Monto;
        this.descripcion = this.transDepById.Descripcion;
        this.deSucParaSuc = this.transDepById.DeSucursalParaSucursal;
        this.extParaSuc = this.transDepById.TransExternaParaSucursal;
        this.egresoDinero = this.transDepById.EgresoDeSucursal;
        this.fechaDesde = this.transDepById.FechaCracion;
        this.turno = this.transDepById.Turno;
        loading.close();
      }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loading.close(); })
    } else {
      this.idTransDep = 0;
    }

  }

  ngOnInit() {
    const roles = JSON.parse(localStorage.getItem('roles') ?? '');
    const soporte = eval(localStorage.getItem('soporte') ?? '') || false;
    this.turnoCaja = (roles != null && roles.TurnosCaja) || soporte;


  }

  deSucParaSucfUNC(value: any) {
    this.deSucParaSuc = value.target.checked;
    this.extParaSuc = false;
    this.egresoDinero = false;
    this.sucursales=[];
    this.noActSuc();
  }

  extParaSucFunc(value: any) {
    this.deSucParaSuc = false;
    this.extParaSuc = value.target.checked;
    this.egresoDinero = false;
   // this.todasSuc(true);
   this.sucActual();
  }

  egresoDineroFunc(value: any) {
    this.deSucParaSuc = false;
    this.extParaSuc = false;
    this.egresoDinero = value.target.checked;
  }


  getSucursalVendedor(value: any) {
    if (this.idTransDep == 0) {
      this.idDeSucursal = value.Sucursal.Id;
      this.getDataInicio();
    }
  }

  getDataInicio() {
    const loading = this.generalServ.loadingModal();
    let dataInicio = { 'idSucursal': this.idDeSucursal,
    'idClienteNegotis': localStorage.getItem('idClienteNegotis')};
    this.transDinServ.GetDataInicioCrearEditar(dataInicio)
      .subscribe(data => {
        this.infoInicio = data;
        //this.noActSuc();
        //this.todasSuc();
        this.sucActual();
        this.idParaSucursal = this.sucursales[0].Id;
        loading.close();
      }, error => {
        console.log(error);
        loading.close();
      })
  }

  todasSuc(todas?:boolean){
    this.sucursales=[];
    for(let item of this.infoInicio.ListSucursal){
      this.sucursales.push(item);
    }
  }


  sucActual(){
    this.sucursales=[];
    for(let item of this.infoInicio.ListSucursal){
      if(item.Id == this.idDeSucursal){
        this.sucursales.push(item);
        this.idParaSucursal = item.Id;
      }

    }
  }

  noActSuc(){
    this.sucursales=[];
    for(let item of this.infoInicio.ListSucursal){
      if(item.Id != this.idDeSucursal){
        this.sucursales.push(item);
      }

    }
    if(this.sucursales.length == 0)
    {
      for(let item of this.infoInicio.ListSucursal){
          this.sucursales.push(item);
      }
    }
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

  onSubmit(value: any) {
    let idDeSucursal = this.idDeSucursal;
    if (this.myForm.valid || (this.egresoDinero == true && (this.idParaSucursal == null || this.idParaSucursal == ''))) {
      //if((value.monto > this.infoInicio.TotalSuc) && this.extParaSuc != true){
        //this.valMonto=true;
        //this.submitted = true;
       // return null;
     // }
      if (this.extParaSuc == true) {
       // idDeSucursal = null;
      }
      if (this.egresoDinero == true) {
        value.idParaSucursal = null;
      }
      this.fechaDesdeFormat = this.fechaDesde.split("/").reverse().join("/");
      const loadRef = this.generalServ.loadingModal();
      let data = new TransferenciaDineroModel(
        this.idTransDep,
        localStorage.getItem('idUser'),
        localStorage.getItem('idClienteNegotis'),
        idDeSucursal,
        value.idParaSucursal,
        value.monto,
        value.descripcion,
        this.deSucParaSuc,
        this.extParaSuc,
        this.egresoDinero,
        this.turno,
        this.fechaDesdeFormat
      );
      this.transDinServ.crearEditarTransDep(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.Resultado == true) {
            const dialogRef = this.dialog.open(ImprimirEgresoModal, {
              width: '450px',
              data: {
                idEgreso: this.post.IdEgreso,
              }
            });
            this.router.navigate(["/cliente/transferencia/deposito/dinero/panel"], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

}
