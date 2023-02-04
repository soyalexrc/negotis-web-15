import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { GlobalService } from '../../../Service/global.service';
import { MatDialog} from '@angular/material/dialog';
import { BloqueardesbloquearModalComponent } from '../../../components/bloqueardesbloquear-modal/bloqueardesbloquear-modal.component';
import { ResetPasswordModalComponent } from '../../../components/reset-password-modal/reset-password-modal.component';
import { GeneralService } from '../../../Service/general.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EliminarModalComponent } from 'src/app/components/eliminar-modal/eliminar-modal.component';
import { ErrorforaneaModalComponent } from 'src/app/components/errorforanea-modal/errorforanea-modal.component';
import {EmpleadoModel} from './EmpleadoModel';
import { SucursalService } from 'src/app/Service/sucursal.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-empleado-panel',
  templateUrl: './empleado-panel.component.html',
  styleUrls: ['./empleado-panel.component.css']
})
export class EmpleadoPanelComponent implements OnInit {

  userNameCtrl = new FormControl();
  filteredUserName!: Observable<any[]>;
  nombresCtrl = new FormControl();
  filteredNombres!: Observable<any[]>;
  apellidosCtrl = new FormControl();
  filteredApellidos!: Observable<any[]>;
  cuilCtrl = new FormControl();
  filteredCuil!: Observable<any[]>;

  sucSelecPost: any;
  sucursalSeleccionada=JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
  empleadoList: any;
  empleadoListOriginal: any;
  userNameFiltro: any;
  nombreFiltro: any;
  apellidoFiltro: any;
  cuilFiltro: any;
  limit: number = 20;
  page: number = 1;
  total: number = 0;
  totalLimpiar: number = 0;
  @Output() GetSucursalEmit!: EventEmitter<any>;
  constructor(private titleService: Title,private userServ: UserService, private global: GlobalService,
    private dialog: MatDialog, private generalServ: GeneralService, private sucursalServ : SucursalService)
    {
      titleService.setTitle("Usuarios");
     }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let dataUser = new EmpleadoModel(
      localStorage.getItem('idClienteNegotis'),
      this.userNameCtrl.value,
      this.nombresCtrl.value,
      this.apellidosCtrl.value,
      this.cuilCtrl.value,
      this.limit,
      this.page,
      this.sucursalSeleccionada.IdSucursal
    );
    this.userServ.getListEmpleadoByIdClienteNegotis(dataUser).subscribe((data: any) => {
      this.empleadoList = data.listado;
      this.empleadoListOriginal = data.listado;
      this.total=data.totalItems;
      this.totalLimpiar=data.totalItems;
      //user name
      this.filteredUserName = this.userNameCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterUserName(item) : this.empleadoListOriginal.filter((s: any) => s.ClienteNegotis != true).slice())
        );
      //nombres
      this.filteredNombres = this.nombresCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterNombres(item) : this.empleadoListOriginal.filter((s: any) => s.ClienteNegotis != true).slice())
        );
      //apellidos
      this.filteredApellidos = this.apellidosCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterApellidos(item) : this.empleadoListOriginal.filter((s: any) => s.ClienteNegotis != true).slice())
        );
      //cuil
      this.filteredCuil = this.cuilCtrl.valueChanges
        .pipe(
          startWith(''),
          map(item => item ? this._filterCuil(item) : this.empleadoListOriginal.filter((s: any) => s.ClienteNegotis != true).slice())
        );
      loading.close();
    }, (error: any) => { console.log(error); loading.close(); });
  }

  //userName
  private _filterUserName(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.empleadoListOriginal.filter((item: any) => item.UserName.toLowerCase().includes(filterValue.toLowerCase()));
  }
  //nombres
  private _filterNombres(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.empleadoListOriginal.filter((item: any) => item.Nombres.toLowerCase().includes(filterValue.toLowerCase()));
  }
  //apellidos
  private _filterApellidos(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.empleadoListOriginal.filter((item: any) => item.Apellidos.toLowerCase().includes(filterValue.toLowerCase()));
  }
  //cuil
  private _filterCuil(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.empleadoListOriginal.filter((item: any) => item.CUIL.toLowerCase().includes(filterValue.toLowerCase()));
  }

  bloquearDesbloquear(value: any) {
    const dialogRef = this.dialog.open(BloqueardesbloquearModalComponent, {
      width: '450px', data: { data: value.Bloqueado }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        let dataUser = { 'idUser': value.Id };
        this.userServ.bloquearDesbloquar(dataUser)
          .subscribe(data => {
            if (data == true) {
              if (value.Bloqueado == true) {
                value.Bloqueado = null;
              } else {
                value.Bloqueado = true;
              }
            }
            loadRef.close();
          }, error => { console.log(error); loadRef.close(); });
      }
    })
  }

  limpiar() {
    this.cuilFiltro = null;
    this.nombreFiltro = null;
    this.apellidoFiltro = null;
    this.userNameFiltro = null;
    this.empleadoList = this.empleadoListOriginal;
    this.total=this.totalLimpiar;
    this.page=1;
  }

  buscar() {
    const loadRef = this.generalServ.loadingModal();
    const dataFiltro = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'UserName': this.userNameCtrl.value,
      'Nombre': this.nombresCtrl.value,
      'Apellido': this.apellidosCtrl.value,
      'CUIL': this.cuilCtrl.value,
      'page':this.page,
      'pageSize':this.limit,
      'idSucursal':JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '')
    };
    this.userServ.getListEmpleadoByIdClienteNegotis(dataFiltro).subscribe((data: any) => {
      this.empleadoList = data.listado;
      this.total=data.totalItems;
      loadRef.close();
    }, (error: any) => { console.log(error); loadRef.close(); });
  }

  resetPasswordModal(value: any) {
    const dialogRef = this.dialog.open(ResetPasswordModalComponent, {
      width: '450px', data: { idUser: value.Id, nombres: value.Nombres, apellidos: value.Apellidos, userName: value.UserName },
    });
  }

  delete(value: any) {

    const dialogRef = this.dialog.open(EliminarModalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        const loadRef = this.generalServ.loadingModal();
        this.userServ.delete(value.Id).subscribe((data: any) => {
          if (data) {
            let index = 0;
            for (let item of this.empleadoList) {
              if (item.Id == value.Id) {
                this.empleadoList.splice(index, 1)
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
