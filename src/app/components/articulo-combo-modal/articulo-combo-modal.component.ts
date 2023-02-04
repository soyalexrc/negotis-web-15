import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ArticuloService } from '../../Service/articulo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GeneralService } from '../../Service/general.service';
import { MateriaPrimaService } from 'src/app/Service/materiaprima.service';


@Component({
  selector: 'app-articulo-combo-modal',
  templateUrl: './articulo-combo-modal.component.html',
  styleUrls: ['./articulo-combo-modal.component.css']
})
export class ComboArticuloModalComponent implements OnInit {

  myForm: FormGroup;
  post: any;
  cantidad: any = 0;
  valEntero!: boolean;
  errorEntero!: boolean;
  idMateriaPrima!: boolean;
  idArticulo: any;
  listadoArticulo: any;
  listadoMPOriginal: any;
  sucursalActual: any;
  idSucursal: any=JSON.parse(localStorage.getItem('sucursalSeleccionada') ?? '');
  token: any;
  idUser:any;
  idClienteNegotis: any;
  limit: number = 20;
  page: number = 1;
  total: number = 0;
  precio:any;
  tieneRolModificarPrecio: any;
  filtroDescripcionArticulo : string = "";
  filtro :any = "";
  idSucursalActual: any;
  constructor(private fb: FormBuilder, private articuloServ: ArticuloService,private mpServ: MateriaPrimaService,
    private dialogRef: MatDialogRef<ComboArticuloModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private generalServ: GeneralService) {
    this.myForm = fb.group({
      cantidad: ['', Validators.compose([Validators.pattern('^[0-9 , .]+$'), Validators.required])],
      idMateriaPrima: ['', Validators.compose([Validators.required])],
      filtroDescripcionArticulo : ['', Validators.compose([])],
    });
    this.cantidad = data.cantidad;
    this.idArticulo = data.idArt;
    this.idSucursalActual = data.idSuc;
    if (this.data.unidad == true || (this.data.unidad == null && this.data.kilogramo == null)) {
      //this.valEntero = true;
    }
  }

  ngOnInit() {
    let roles = JSON.parse(localStorage.getItem('roles') ?? '');
    this.tieneRolModificarPrecio = (roles != null && roles.ModificarPrecioMP);
    this.getArticuloCantidad(this.idSucursalActual);

  }

  limpiar() {
    this.filtroDescripcionArticulo="";
    this.page=1;
    this.buscar();
  }


  buscar ()
  {

    this.getArticuloCantidad(this.idSucursalActual);
  }

  getArticuloCantidad(value: any) {
    const loading = this.generalServ.loadingModal();
    this.sucursalActual = value;
    let dataUser = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'filtro': this.filtroDescripcionArticulo,
      'idSucursal': this.sucursalActual.Sucursal.Id,
      'pageSize': this.limit,
      'page': this.page,
      'filtroPrecioOferta': null,
      'filtroPrecioCosto': "",
      'filtroPrecioBase': "",
      'filtroTienda': null,
      'filtroUnidades': null,
      'filtroActivo': "",
      'filtroImagen':null
    };
    this.articuloServ.ListaArticuloByIdClienteNegotis(dataUser)
      .subscribe((data: any) => {
        this.listadoArticulo = data.listado;
        this.total = data.totalItems;
        loading.close();
      }, (error: any) => { console.log(error); loading.close(); })
  }



  seleccionar(value: any) {
      if (this.valEntero == true) {
        if (String(value.cantidad).includes(',') || String(value.cantidad).includes('.')) {
          this.errorEntero = true;
          return null;
        }
      }
      const loadRef = this.generalServ.loadingModal();
      if(this.precio == null || this.precio == "")
      {
        this.precio = value.precioCosto
      }
      let data = {
        'idArticulo': this.data.idArt, 'idSucursal': this.data.idSuc.IdSucursal,
        'idArticuloCombo':value.id,
        'cantidad': this.cantidad, 'idClienteNegotis' : this.data.idClienteNegotis
      };
      value.precio = this.precio;
      value.stock = value.cantidad;
      value.cantidad = this.cantidad;
      this.articuloServ.guardarComboArticulo(data)
        .subscribe(data => {
          this.post = data; this.dialogRef.close(value);
          loadRef.close();
        }, error => { console.log(error); loadRef.close(); });

  }

  onChange(value: any){
    this.precio = this.listadoArticulo.find((x: any) => x.Id == value).PrecioCosto;
  }
  onSubmit(value: any) {
    if (this.myForm.valid) {
      if (this.valEntero == true) {
        if (String(value.cantidad).includes(',') || String(value.cantidad).includes('.')) {
          this.errorEntero = true;
          return null;
        }
      }
      const loadRef = this.generalServ.loadingModal();
      let data = {
        'idArticulo': this.data.idArt, 'idSucursal': this.data.idSuc.IdSucursal,
        'idArticuloCombo':value.id,
        'cantidad': this.cantidad, 'idClienteNegotis' : this.data.idClienteNegotis,

      };
      this.articuloServ.guardarComboArticulo(data)
        .subscribe(data => {

          this.post = data;
          this.post.precio = this.precio;
          this.dialogRef.close(value);
          loadRef.close();
        }, error => { console.log(error); loadRef.close(); });
    }
  }

  @ViewChild("#myInput") myInputField!: ElementRef;
  editMyInputField(): void {
    this.myInputField.nativeElement.focus();
  }


  goToPage(n: number): void {
    this.page = n;
    this.listadoArticulo(this.idSucursalActual);
  }

  onNext(): void {
    this.page++;
    this.listadoArticulo(this.idSucursalActual);
  }

  onPrev(): void {
    this.page--;
    this.listadoArticulo(this.idSucursalActual);
  }

  cancel() {
    this.dialogRef.close();
  }

  cerrar() {
    this.dialogRef.close();
  }

}
