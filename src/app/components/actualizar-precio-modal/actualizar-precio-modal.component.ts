import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { CategotriaRubroService } from 'src/app/Service/categotria-rubro.service';
import { GeneralService } from 'src/app/Service/general.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MarcaService } from 'src/app/Service/marca.service';
import { ProveedorService } from 'src/app/Service/proveedor.service';
import { RubroService } from 'src/app/Service/rubro.service';
import { ArticuloService } from 'src/app/Service/articulo.service';
import { Router,ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../Service/user.service';
import { SnackBarOperacionExitosaComponent } from '../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { ListaPreciosService } from 'src/app/Service/lista-precios.service';


@Component({
  selector: 'app-actualizar-precio-modal',
  templateUrl: './actualizar-precio-modal.component.html',
  styleUrls: ['./actualizar-precio-modal.component.css']
})
export class ActualizarPrecioModalComponent implements OnInit {
  listadoProveedores: any;
  myForm: FormGroup;
  panelQuery: any = '';
  filtro:any;
  post: any;
  submitted!: boolean;
  listadoRubro: any;
  listadoMarcas: any;
  listadoCategoria: any;
  porcentajeG: any;
  porcentajeU: any;
  porcentajeO: any;
  porcentajeLista: any;
  listadoPrecios: any;
  precioD: any;
  montoG:any;
  montoPorcentajeG:any=0;
  montoPorcentajeU:any=0;
  porcentajePrecioO:any=0;
  porcentajePrecioLista:any=0;
  montoFijoG:any=0;
  montoPrecioDolar: any = 0;
  idSucursal: any=JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
  porcentajeCostoG:any=0;
  montoFijoCostoG:any=0;
  flagCerrar:boolean = false;
  idLista:any;
  nombreLista:any;
  idMarca: number=0;
  idRubro: number=0;
  idProveedor: number=0;
  idCategoria:number=0;
  userInfo:any;

  constructor(private dialogRef: MatDialogRef<ActualizarPrecioModalComponent>,   private listaPrecServ: ListaPreciosService,
    @Inject(MAT_DIALOG_DATA) public data: any,


    private generalServ: GeneralService,
    private userServ: UserService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private marcaServ: MarcaService,
    private articuloServ: ArticuloService,
    private rubroService: RubroService,
    private proveedorService: ProveedorService,
    private categoriaService: CategotriaRubroService)

    {
      this.filtro =data.filtro;
      this.myForm = fb.group({
      idMarca: ['', Validators.compose([])],
      idRubro: ['', Validators.compose([])],
      idProveedor: ['', Validators.compose([])],
      idCategoria: ['', Validators.compose([])],
      montoPorcentajeG: ['', Validators.compose([])],
      montoFijoG: ['', Validators.compose([])],
      porcentajeCostoG:['', Validators.compose([])],
      montoFijoCostoG:['', Validators.compose([])],
      montoPorcentajeU:['', Validators.compose([])],
      montoPrecioDolar:['', Validators.compose([])],
      porcentajePrecioO:['', Validators.compose([])],
      porcentajePrecioLista:['', Validators.compose([])],
    });
    if (this.route.snapshot.queryParams['panelQuery'] != null) {
      this.panelQuery = this.route.snapshot.queryParams['panelQuery'];
    }

     }

  ngOnInit() {

    this.getMarcas();
    this.getRubros();
    this.getProveedores();
    this.getCategorias();
    const loading = this.generalServ.loadingModal();
    let dataUser = { 'idUser': localStorage.getItem('idUser') };
    this.userServ.getUserById(dataUser).subscribe((data: any) => {
      this.userInfo = data;
      this.montoPrecioDolar = this.userInfo.User.CotizacionDolar;
      loading.close();
    }, (error: any) => { console.log(error); loading.close(); })
    let dataList = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'activo': true
    };
    this.listaPrecServ.ListaPreciosByIdClienteNegotis(dataList).subscribe(data => {
      this.listadoPrecios = data;
      loading.close();
    }, error => { console.log(error); loading.close(); })
  }

  getLista(value: any) {
    this.idLista = value.Id;
    this.nombreLista = value.Nombre;
  }

  getProveedores() {
    const loading = this.generalServ.loadingModal();
    this.proveedorService.getAll()
      .subscribe(data => {
        this.listadoProveedores = data;
        console.log(this.listadoProveedores);
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

  getCategorias() {
    const loading = this.generalServ.loadingModal();
    let dataCategoria = { 'idClienteNegotis': localStorage.getItem('idClienteNegotis'),'Page': 1 };
    this.categoriaService.listadoCategoriaRubroByIdClienteNegotis(dataCategoria)
      .subscribe((data: any) => {
        this.listadoCategoria = data.categoriasTotales;
        loading.close();
      }, (error: any) => { console.log(error); loading.close(); })
  }

  cerrar() {
    this.flagCerrar = true;
    this.dialogRef.close();
  }

  porcentajeGClick(){
    if(this.porcentajeG){
      this.porcentajeG=false;
    }
    else{
  this.porcentajeG=true;
    }
  }
  porcentajeUClick(){
    if(this.porcentajeU){
      this.porcentajeU=false;
    }
    else{
  this.porcentajeU=true;
    }
  }
  porcentajePOlick(){
    if(this.porcentajeO){
      this.porcentajeO=false;
    }
    else{
  this.porcentajeO=true;
    }
  }
  porcentajeListalick(){
    if(this.porcentajeLista){
      this.porcentajeLista=false;
    }
    else{
  this.porcentajeLista=true;
    }
  }

  precioDClick(){
    if(this.precioD){
      this.precioD=false;
    }
    else{
  this.precioD=true;
    }
  }

  montoFijoGClick(){
    if(this.montoG){
      this.montoG=false;
    }
    else{
  this.montoG=true;
    }
  }

  onSubmit(value: any) {
    if (this.myForm.valid && this.flagCerrar == false) {
      const loadRef = this.generalServ.loadingModal();
      let data = {
        'idMarca':this.idMarca,
        'idRubro': this.idRubro,
        'idProveedor': this.idProveedor,
        'idCategoria': this.idCategoria,
        'idClienteNegotis' : localStorage.getItem('idClienteNegotis'),
        'idSucursal' : this.idSucursal.Sucursal.Id,
      'montoPorcentajeG': this.montoPorcentajeG,
      'montoFijoG':this.montoFijoG,
      'montoPrecioDolar': this.montoPrecioDolar,
      'PorcentajePrecioO': this.porcentajePrecioO,
      'porcentajeU':this.montoPorcentajeU,
      'filtro' : "",
      'porcentajeCostoG':this.porcentajeCostoG,
      'montoFijoCostoG' : this.montoFijoCostoG,
      'porcentajeLista': this.porcentajePrecioLista,
      'nombreLista': this.nombreLista,
      'token' : localStorage.getItem('token')
      };
       this.articuloServ.updateMasivo(data)
      .subscribe(data => {
        this.post = data;
        loadRef.close();
       if (this.post == true ) {
        this.router.navigate(["/cliente/articulo/panel"], { replaceUrl: true, queryParams: { filter: this.panelQuery } });
          this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
            duration: 1000,
          });
        }
      }, error => {
        error; loadRef.close();
      });
      const loadRefe = this.generalServ.loadingModal();
      if(this.montoPrecioDolar == null)
      {
        this.montoPrecioDolar = 0;
      }
      let datos = {
        'idUser': localStorage.getItem('idUser'), 'cotizacionDolar': this.montoPrecioDolar }
      this.userServ.saveCotizacionDolar(datos).subscribe(data => {
        loadRefe.close();
  }, error => {
    error; loadRefe.close();
  });
}
  this.submitted = true;
  this.dialogRef.close();
}
}
