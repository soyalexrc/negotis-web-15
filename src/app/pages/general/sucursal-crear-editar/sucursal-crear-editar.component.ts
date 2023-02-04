import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SucursalService } from '../../../Service/sucursal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ZonaService } from '../../../Service/zona.service';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { AfipService } from '../../../Service/afip.service';
import { SucursalCrearEditarModel } from './sucursal-crear-editar-model';
import { RutaService } from 'src/app/Service/ruta.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {AfipModel} from '../../../models/AfipModel';

@Component({
  selector: 'app-sucursal-crear-editar',
  templateUrl: './sucursal-crear-editar.component.html',
  styleUrls: ['./sucursal-crear-editar.component.css']
})
export class SucursalCrearEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  idUser: any;
  idCliente: any;
  calle: any;
  listAfip: any;
  numero: any;
  barrio: any;
  idZona: any;
  idSucursal: any = 0;
  cuit: any="";
  razonSocial:any="";
  ingresosBrutos:any;
  condicionImpositiva:any="";
  sucursalById: any;
  listadoZonas: any;
  valZona!: any;
  sucursalCliente!: boolean;
  punoDeVenta: any;
  pfxAfip: any = '';
  valPfx!: any;
  valPtoVta!: any;

  listaRutasOrig!: any[];
  listaRutas: any;
  rutaNgModel: any;//No usar
  filteredRuta!: Observable<any[]> | undefined;


  constructor(private fb: FormBuilder, private sucursalServ: SucursalService, private router: Router,
    private route: ActivatedRoute, private zonaServ: ZonaService, private generalServ: GeneralService,
    private snackBar: MatSnackBar, private afipServ: AfipService, private rutaServ: RutaService) {
    this.myForm = fb.group({
      calle: ['', Validators.compose([Validators.required])],
      numero: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])],
      barrio: ['', Validators.compose([Validators.required])],
      idZona: ['', Validators.compose([])],
      razonSocial : ['', Validators.compose([])],
      cuit : ['', Validators.compose([])],
      condicionImpositiva: ['', Validators.compose([])],
      ingresosBrutos: ['', Validators.compose([])],
      punoDeVenta: ['', Validators.compose([Validators.pattern('^[0-9]+$')])],
      pfxAfip: ['', Validators.compose([])],
      nombreRuta: ['', Validators.compose([])],
    });

    route.params.subscribe(params => { this.idUser = params['iduser']; });
    route.params.subscribe(params => { this.idCliente = params['idcliente']; });

    route.params.subscribe(params => { this.idSucursal = params['idsucursal']; });

    const loadingRuta = this.generalServ.loadingModal();
    rutaServ.getRutasByIdClienteNegotis({ 'idClienteNegotis': localStorage.getItem('idClienteNegotis') })
      .subscribe(
        data => {
          this.listaRutasOrig = data as any[];
          //Nombre
          this.filteredRuta = this.myForm.get('nombreRuta')?.valueChanges
            .pipe(
              startWith(''),
              map(item => item ? this.doFilter(item) : this.listaRutasOrig.slice())
            );

          this.LoadSucursal();
          loadingRuta.close();
        }, error => {
          console.log(error);
          this.generalServ.goToNoEncontrado();
          loadingRuta.close();
        });

    if (this.idUser != null) {
      const loadingTwo = this.generalServ.loadingModal();
      this.afipServ.getListAfipByIdClienteNegotis(new AfipModel(this.idUser, null, null)).subscribe(data => {
        this.listAfip = data;
        loadingTwo.close();
      }, error => { console.log(error); loadingTwo.close(); })
    }
  }

  LoadSucursal() {
    if (this.idSucursal != null) {
      const loading = this.generalServ.loadingModal();
      let superAdminValue = localStorage.getItem('RolSuperAdmin');
      if (superAdminValue == 'false') { this.sucursalCliente = true; }
      let dataSuc = { 'idSucursal': this.idSucursal, 'cliente': this.sucursalCliente, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.sucursalServ.getSucursalById(dataSuc).subscribe(data => {
        this.sucursalById = data;
        if (this.sucursalById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.calle = this.sucursalById.Calle;
        this.numero = this.sucursalById.Numero;
        this.barrio = this.sucursalById.Barrio;
        this.idZona = this.sucursalById.IdZona;
        this.cuit = this.sucursalById.Cuit;
        this.razonSocial = this.sucursalById.RazonSocial;
        this.condicionImpositiva = this.sucursalById.CondicionImpositiva;
        this.idUser = this.sucursalById.IdUser;
        this.idCliente = this.sucursalById.IdCliente;
        this.punoDeVenta = this.sucursalById.PuntoDeVenta;
        if (this.sucursalById.IdAfip == null) {
          this.pfxAfip = '';
        } else {
          this.pfxAfip = this.sucursalById.IdAfip;
        }

        const idRutas = this.sucursalById.IdRutas as any[];
        this.listaRutas = this.listaRutasOrig.filter(x => idRutas.includes(x.Id))

        loading.close();

      }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loading.close(); })
    } else {
      this.idSucursal = 0;
    }
  }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let dataOne = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.zonaServ.listadoZonasByIdClienteNegotis(dataOne)
      .subscribe(data => { this.listadoZonas = data; loading.close(); }, error => { console.log(error); loading.close(); })
  }

  selectOptionRuta = (key: any) => {
    const value = this.myForm.get('nombreRuta')?.value;
    if (this.listaRutas.find((x: any) => x.Id == value.Id) == null) {
      this.listaRutas.push(value);
    }
    this.rutaNgModel = "";
  }
  resetKeyRuta = () => { };
  displayWithRuta = (option?: any): string => option ? option.Nombre : '';
  readOnlyMostrador = false;
  doFilter(value: any) {
    if (value == null) {
      return this.listaRutasOrig;
    }
    let filterVal = value.toString().toLowerCase();
    return this.listaRutasOrig.filter(option => option.Nombre.toLowerCase().includes(filterVal));
  }
  deleteRuta(item: any) {
    this.listaRutas = this.listaRutas.filter((x: any) => x !== item)
  }

  onSubmit(value: any) {
    if (this.idUser == null && this.idZona == null) {
      this.valZona = true;
    } else {
      this.valZona = null;
    }
    if (this.myForm.valid && this.valZona != true) {
      this.valPfx = null;

      // if(value.pfxAfip == '' && value.punoDeVenta != null){
      //   this.valPfx=true;
      //   return null;
      // }

      if (value.punoDeVenta == null && value.pfxAfip != '') {
        this.valPtoVta = true;
        return null;
      } else {
        this.valPtoVta = null;
      }
      if (value.idZona == '') { value.idZona = null; }
      const loadRef = this.generalServ.loadingModal();

      let data: SucursalCrearEditarModel = {
        idSucursal: this.idSucursal,
        idUser: this.idUser,
        idCliente: this.idCliente,
        calle: value.calle,
        numero: value.numero,
        barrio: value.barrio,
        idZona: value.idZona,
        puntoDeVenta: value.punoDeVenta,
        idAfip: Number(value.pfxAfip),
        idRutas: this.listaRutas.map((x: any) => x.Id),
        razonSocial:'null',
        idClienteNegotis: localStorage.getItem('idClienteNegotis') ?? '',
         cuit:this.cuit,
         condicionImpositiva: this.condicionImpositiva,
         RazonSocial2: this.razonSocial,
         ingresosBrutos : this.ingresosBrutos
      };

      this.sucursalServ.crearEditarSucursal(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.Repetido != true) {
            if (this.idUser == null) {
              this.router.navigate(["/cliente/sucursal/listado/" + this.idCliente], { replaceUrl: true });
            } else {
              this.router.navigate(["/superadmin/clientenegotis/sucursal/listado/" + this.idUser], { replaceUrl: true });
            }
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

}
