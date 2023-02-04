import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SucursalService } from '../../../Service/sucursal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ZonaService } from '../../../Service/zona.service';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { AfipService } from '../../../Service/afip.service';
import { RutaService } from 'src/app/Service/ruta.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import {AfipModel} from '../../../models/AfipModel';
import { FichaMedicaCrearEditarModel } from './fichamedica-crear-editar-model';
import { FichaMedicaService } from 'src/app/Service/fichamedica.service';

@Component({
  selector: 'app-fichamedica-crear-editar',
  templateUrl: './fichamedica-crear-editar.component.html',
  styleUrls: ['./fichamedica-crear-editar.component.css']
})
export class FichaMedicaCrearEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  idUser: any;
  idCliente: any;
  colorPelo: any;
  grosorPelo: any;
  edadM: any;
  cicloM: any;
  embarazos: any;
  idFichaMedica: any = 0;
  cantidadEmbarazos: any;
  embTerminados:any;
  acne:any;
  tratamientoAcne:any;
  fechaFinAcne: any;
  psoriasis: any;
  cambiosPsoriasis!: boolean;
  tMaligno!: boolean;
  tratamientoT!: boolean;
  fechaFinTratamientoT!: boolean;
  hipotiroidismo!: boolean;
  oPoliquistico!: boolean;
  problemaH!: boolean;
  problemaHDescripcion!: boolean;
  alergia!: boolean;
  alergiaDescripcion!: boolean;
  epilepsia!: boolean;
  patologiaExtra!: boolean;
  medicacionHabitual!: boolean;
  observaciones!: boolean;
  nombreApellidoEmergencia!: boolean;
  relacion!: boolean;
  fichaMedicaById: any;



  constructor(private fb: FormBuilder, private sucursalServ: SucursalService, private router: Router,
  private generalServ: GeneralService, private fichaMedicaServ: FichaMedicaService,private route: ActivatedRoute,
    private snackBar: MatSnackBar, private afipServ: AfipService, private rutaServ: RutaService) {
    this.myForm = fb.group({
      colorPelo: ['', Validators.compose([])],
      grosorPelo: ['', Validators.compose([])],
      edadM: ['', Validators.compose([])],
      cicloM: ['', Validators.compose([])],
      embarazos : ['', Validators.compose([])],
      cantidadEmbarazos : ['', Validators.compose([])],
      embTerminados: ['', Validators.compose([])],
      acne: ['', Validators.compose([])],
      tratamientoAcne: ['', Validators.compose([])],
      fechaFinAcne: ['', Validators.compose([])],
      psoriasis: ['', Validators.compose([])],
      cambiosPsoriasis: ['', Validators.compose([])],
      tMaligno: ['', Validators.compose([])],
      tratamientoT: ['', Validators.compose([])],
      fechaFinTratamientoT: ['', Validators.compose([])],
      hipotiroidismo: ['', Validators.compose([])],
      oPoliquistico: ['', Validators.compose([])],
      problemaH: ['', Validators.compose([])],
      problemaHDescripcion: ['', Validators.compose([])],
      alergia: ['', Validators.compose([])],
      alergiaDescripcion: ['', Validators.compose([])],
      epilepsia: ['', Validators.compose([])],
      patologiaExtra: ['', Validators.compose([])],
      medicacionHabitual: ['', Validators.compose([])],
      observaciones: ['', Validators.compose([])],
      nombreApellidoEmergencia: ['', Validators.compose([])],
      relacion: ['', Validators.compose([])],
    });

    route.params.subscribe(params => { this.idUser = params['iduser']; });
    route.params.subscribe(params => { this.idCliente = params['idcliente']; });
    route.params.subscribe(params => { this.idFichaMedica = params['fichamedica']; });

  }

  LoadFichaMedica() {
    if (this.idFichaMedica != null) {
      const loading = this.generalServ.loadingModal();
      let dataFicha = { 'idFichaMedica': this.idFichaMedica, 'idCliente': this.idCliente, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.fichaMedicaServ.getById(dataFicha).subscribe(data => {
        this.fichaMedicaById = data;
        if (this.fichaMedicaById == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.grosorPelo = this.fichaMedicaById.grosorPelo;
        this.colorPelo = this.fichaMedicaById.colorPelo;
        this.edadM = this.fichaMedicaById.edadM;
        this.cicloM = this.fichaMedicaById.cicloM;
        this.embarazos = this.fichaMedicaById.embarazos;
        this.idFichaMedica = this.fichaMedicaById.Id;
        this.cantidadEmbarazos = this.fichaMedicaById.cantidadEmbarazos;
        this.idUser = this.fichaMedicaById.IdUser;
        this.idCliente = this.fichaMedicaById.IdCliente;
        this.embTerminados = this.fichaMedicaById.embTerminados;
        this.acne = this.fichaMedicaById.acne;
        this.tratamientoAcne = this.fichaMedicaById.tratamientoAcne;
        this.fechaFinAcne = this.fichaMedicaById.fechaFinAcne;
        this.psoriasis = this.fichaMedicaById.psoriasis;
        this.cambiosPsoriasis = this.fichaMedicaById.cambiosPsoriasis;
        this.tMaligno = this.fichaMedicaById.tMaligno;
        this.tratamientoT = this.fichaMedicaById.tratamientoT;
        this.fechaFinTratamientoT = this.fichaMedicaById.fechaFinTratamientoT;
        this.hipotiroidismo = this.fichaMedicaById.hipotiroidismo;
        this.oPoliquistico = this.fichaMedicaById.oPoliquistico;

        this.problemaH = this.fichaMedicaById.problemaH;
        this.problemaHDescripcion = this.fichaMedicaById.problemaHDescripcion;
        this.alergia = this.fichaMedicaById.alergia;
        this.alergiaDescripcion = this.fichaMedicaById.alergiaDescripcion;
        this.epilepsia = this.fichaMedicaById.epilepsia;
        this.patologiaExtra = this.fichaMedicaById.patologiaExtra;
        this.medicacionHabitual = this.fichaMedicaById.medicacionHabitual;
        this.observaciones = this.fichaMedicaById.observaciones;
        this.nombreApellidoEmergencia = this.fichaMedicaById.nombreApellidoEmergencia;
        this.relacion = this.fichaMedicaById.relacion;


        loading.close();

      }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loading.close(); })
    } else {
      this.idFichaMedica = 0;
    }
  }

  ngOnInit() {
    this.LoadFichaMedica();
  }




  onSubmit(value: any) {


    if (this.myForm.valid) {



      const loadRef = this.generalServ.loadingModal();

      let data: FichaMedicaCrearEditarModel = {
        Id: this.idFichaMedica,
        idUser: this.idUser,
        idCliente: this.idCliente,
        idClienteNegotis: localStorage.getItem('idClienteNegotis') ?? '',
        grosorPelo: value.grosorPelo,
        colorPelo: value.colorPelo,
        edadM: value.edadM,
        cicloM: value.cicloM,
        embarazos: value.embarazos,
        cantidadEmbarazos: value.cantidadEmbarazos,
        embTerminados:value.embTerminados,
        acne:value.acne,
        tratamientoAcne: value.tratamientoAcne,
        fechaFinAcne: value.fechaFinAcne,
        psoriasis : value.psoriasis,
        cambiosPsoriasis : value.cambiosPsoriasis,
        tMaligno : value.tMaligno,
        tratamientoT : value.tratamientoT,
        fechaFinTratamientoT : value.fechaFinTratamientoT,
        hipotiroidismo: value.hipotiroidismo,
        oPoliquistico: value.oPoliquistico,
        problemaH : value.problemaH,
        problemaHDescripcion : value.problemaHDescripcion,
        alergia : value.alergia,
        alergiaDescripcion : value.alergiaDescripcion,
        epilepsia: value.epilepsia,
        patologiaExtra : value.patologiaExtra,
        medicacionHabitual : value.medicacionHabitual,
        observaciones : value.observaciones,
        nombreApellidoEmergencia : value.nombreApellidoEmergencia,
        relacion : value.relacion
      };

      this.fichaMedicaServ.crearEditar(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post.Repetido != true) {
            if (this.idUser == null) {
              this.router.navigate(["/cliente/fichamedica/listado/" + this.idCliente], { replaceUrl: true });
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
