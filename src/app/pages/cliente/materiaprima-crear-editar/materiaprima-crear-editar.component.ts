import { Component, OnInit } from '@angular/core';
import { ArticuloService } from '../../../Service/articulo.service';
import { MarcaService } from '../../../Service/marca.service';
import { RubroService } from '../../../Service/rubro.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ListaPreciosService } from '../../../Service/lista-precios.service';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { MatDialog} from '@angular/material/dialog';
import { FotoCrearEditarModalComponent } from '../../../components/foto-crear-editar-modal/foto-crear-editar-modal.component';
import { ProveedorService } from '../../../Service/proveedor.service';
import { PedidofaltandatosrequeridosModalComponent } from '../../../components/pedidofaltandatosrequeridos-modal/pedidofaltandatosrequeridos-modal.component';
// import { ValueTransformer } from '@angular/compiler/src/util';
import { DatepickerModalComponent } from '../../../components/datepicker-modal/datepicker-modal.component';
import { MensajeModalComponent } from '../../../components/mensaje-modal/mensaje-modal.component';
import { MateriaPrimaService } from 'src/app/Service/materiaprima.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-materiaprima-crear-editar',
  templateUrl: './materiaprima-crear-editar.component.html',
  styleUrls: ['./materiaprima-crear-editar.component.css']
})
export class MateriaPrimaCrearEditarComponent implements OnInit {


  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  listadoMarcas: any;
  listadoRubro: any;
  listadoProveedores: any;

  idMateriaPrima: any;
  activo: boolean=true;
  eliminar :boolean=false;
  codigoDeBarras: any;
  idMarca!: number;
  idRubro!: number;
  idProveedor!: number;
  precioCosto: any;
  unidad: boolean = true;
  kilogramo: boolean = false;
  gramo: boolean = false;
  metro: boolean = false;
  panelQuery: any = '';
  pageQuery: any = 1;
  MPbyId: any;
  materiaPrima: any;

  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private calendar: NgbCalendar,
    private articuloServ: ArticuloService,
    private materiaPServ: MateriaPrimaService,
    private router: Router,
    private route: ActivatedRoute,
    private generalServ: GeneralService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private marcaServ: MarcaService,
    private rubroService: RubroService,
    private listaPrecServ: ListaPreciosService,
    private proveedorService: ProveedorService) {

      titleService.setTitle("Produccion");
    this.myForm = fb.group({
      materiaPrima: ['', Validators.compose([Validators.required])],
      activo: ['', Validators.compose([Validators.required])],
      codigoDeBarras: ['', Validators.compose([Validators.required])],
      idMarca: ['', Validators.compose([Validators.required])],
      idRubro: ['', Validators.compose([Validators.required])],
      idProveedor: ['', Validators.compose([Validators.required])],
      precioCosto: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9.,]+$')])],
      eliminar: ['', Validators.compose([Validators.required])],
    });
    if (this.route.snapshot.queryParams['panelQuery'] != null) {
      this.panelQuery = this.route.snapshot.queryParams['panelQuery'];
    }
    this.idMateriaPrima = this.route.snapshot.params['idmateriaprima'];
    if (this.idMateriaPrima != null) {
      const loading = this.generalServ.loadingModal();
      let dataArt = { 'idMP': this.idMateriaPrima, 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
      this.materiaPServ.getMPById(dataArt).subscribe(data => {
        this.MPbyId = data;
        if (this.MPbyId == null) {
          loading.close();
          this.generalServ.goToNoEncontrado();
        }
        this.materiaPrima = this.MPbyId.Nombre;
        this.codigoDeBarras = this.MPbyId.CodigoDeBarras;
        this.idProveedor = this.MPbyId.IdProveedor;
        this.activo = this.MPbyId.Activo;
        if(this.MPbyId.Eliminar == null){
          this.eliminar= false;
        }else
        {
        this.eliminar = this.MPbyId.Eliminar;
        }
        this.idMarca = this.MPbyId.IdMarca;
        this.idRubro = this.MPbyId.IdRubro;
        this.precioCosto = this.MPbyId.PrecioCosto;
        if (this.MPbyId.Kilogramo == null && this.MPbyId.Unidad == null && this.MPbyId.Gramo == null && this.MPbyId.Metro == null) {
          this.unidad = true;
          this.kilogramo = false;
          this.gramo = false;
          this.metro = false;
        } else {
          this.unidad = this.MPbyId.Unidad;
          this.kilogramo = this.MPbyId.Kilogramo;
          this.gramo = this.MPbyId.Gramo;
          this.metro = this.MPbyId.Metro;
        }
        loading.close();
  }, error => { console.log(error); this.generalServ.goToNoEncontrado(); loading.close(); })
}
else
{
  this.idMateriaPrima = 0;
}
}

  ngOnInit() {
    this.getMarcas();
    this.getRubros();
    this.getProveedores();
  }

  getProveedores() {
    const loading = this.generalServ.loadingModal();
    this.proveedorService.getAll()
      .subscribe(data => {
        this.listadoProveedores = data;
        loading.close();
      }, error => { console.log(error); loading.close(); })
  }

  getMarcas() {
    const loading = this.generalServ.loadingModal();
    let dataMarca = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
    this.marcaServ.listadoMarcaByIdClienteNegotis(dataMarca)
      .subscribe(data => {
        this.listadoMarcas = data;
        loading.close();
      }, error => { console.log(error); loading.close(); })
  }

  getRubros() {
    const loading = this.generalServ.loadingModal();
    let dataRubro = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'), 'Page':1 };
    this.rubroService.listadoRubroByIdClienteNegotis(dataRubro)
      .subscribe((data: any) => {
        this.listadoRubro = data.rubrosTotales;
        loading.close();
      }, (error: any) => { console.log(error); loading.close(); })
  }



  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();

      let data = {
        'idMateriaPrima': this.idMateriaPrima,
        'idUser': localStorage.getItem('idUser'),
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'nombre': value.materiaPrima,
        'idMarca': Number(this.idMarca),
        'idRubro': Number(this.idRubro),
        'idProveedor': this.idProveedor,
        'activo': this.activo,
        'eliminar': this.eliminar,
        'codigoDeBarras': this.codigoDeBarras,
        'precioCosto': value.precioCosto,
        'unidad' : this.unidad,
        'kilogramo' : this.kilogramo,
        'gramo' : this.gramo,
        'metro' : this.metro
      };
      this.materiaPServ.crearEditarMateriaPrima(data)
        .subscribe(data => {
          this.post = data;
          loadRef.close();

          if (this.post.RepetidoCodigo != true && this.post.RepetidoNombre != true) {
            this.router.navigate(["cliente/materiaprima/panel"]);
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => {
          error; loadRef.close();
        });
    }
    else
    {
      this.modalValDatosRequeridos();
    }
    this.submitted = true;
  }

  modalValDatosRequeridos() {
    this.dialog.open(MensajeModalComponent, {
      width: '450px',
      data: {
        titulo: 'Error al Crear/Actualizar Artículo',
        mensaje: 'Por favor complete los datos obligatorios y vuelva a guardar.'
      }
    });
  }
  changeUnidad() {
    this.unidad = true;
    this.kilogramo = false;
    this.metro = false;
    this.gramo = false;
  }

  changeKilogramo() {
    this.unidad = false;
    this.kilogramo = true;
    this.metro = false;
    this.gramo = false;
  }
  changeGramo() {
    this.unidad = false;
    this.kilogramo = false;
    this.metro = false;
    this.gramo = true;
  }
  changeMetro() {
    this.unidad = false;
    this.kilogramo = false;
    this.metro = true;
    this.gramo = false;
  }

  onChange() {

  }
}
