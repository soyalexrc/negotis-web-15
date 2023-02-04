import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ArticuloService } from '../../Service/articulo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GeneralService } from '../../Service/general.service';
import { MateriaPrimaService } from 'src/app/Service/materiaprima.service';


@Component({
  selector: 'app-articulo-materiaprima-modal',
  templateUrl: './articulo-materiaprima-modal.component.html',
  styleUrls: ['./articulo-materiaprima-modal.component.css']
})
export class ArticuloMateriaPrimaModalComponent implements OnInit {

  myForm: FormGroup;
  post: any;
  cantidad: any = 0;
  valEntero!: boolean;
  errorEntero!: boolean;
  idMateriaPrima!: boolean;
  idArticulo: any;
  listadoMP: any;
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
  filtroDescripcionMP : string = "";
  filtro :any = "";
  idSucursalActual: any;
  constructor(private fb: FormBuilder, private articuloServ: ArticuloService,private mpServ: MateriaPrimaService,
    private dialogRef: MatDialogRef<ArticuloMateriaPrimaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private generalServ: GeneralService) {
    this.myForm = fb.group({
      cantidad: ['', Validators.compose([Validators.pattern('^[0-9 , .]+$'), Validators.required])],
      idMateriaPrima: ['', Validators.compose([Validators.required])],
      precio: ['', Validators.compose([Validators.pattern('^[0-9.,]+$')])],
      filtroDescripcionMP : ['', Validators.compose([])],
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
    this.getMPCantidad(this.idSucursalActual);

  }

  limpiar() {
    this.filtroDescripcionMP="";
    this.page=1;
    this.buscar();
  }


  buscar ()
  {

    this.getMPCantidad(this.idSucursalActual);
  }
  getMPCantidad(value: any) {
    const loading = this.generalServ.loadingModal();
    this.sucursalActual = value;
    let dataUser = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
      'filtro': this.filtroDescripcionMP,
      'idSucursal': this.sucursalActual.Sucursal.Id,
      'pageSize': this.limit,
      'page': this.page
    };
    this.mpServ.ListaMPByIdClienteNegotis(dataUser)
      .subscribe((data: any) => {
        this.listadoMP = data.listado;
        this.listadoMPOriginal = data.listado;
        this.total = data.totalItems;
        loading.close();
        //loading.close();
      }, (error: any) => { console.log(error);  loading.close();})
  }

  seleccionar(value: any) {
    if (this.cantidad != 0 && this.cantidad != null) {
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
        'idMP':value.id,
        'cantidad': this.cantidad, 'idClienteNegotis' : this.data.idClienteNegotis,
        'precio': this.precio
      };
      value.precio = this.precio;
      value.stock = value.cantidad;
      value.cantidad = this.cantidad;
      this.mpServ.guardarArticuloMP(data)
        .subscribe(data => {
          this.post = data; this.dialogRef.close(value);
          loadRef.close();
        }, error => { console.log(error); loadRef.close(); });
    }
  }

  // getMPCantidad() {
  //   //const loading = this.generalServ.loadingModal();
  //   let dataUser = {
  //     'idClienteNegotis': localStorage.getItem('idClienteNegotis')
  //   };
  //   this.mpServ.ListaMPUnpaginedByIdClienteNegotis(dataUser)
  //     .subscribe(data => {
  //       this.listadoMP = data;
  //       this.listadoMPOriginal = data;
  //      // loading.close();
  //     }, error => { console.log(error);})
  // }

  onChange(value: any){
    this.precio = this.listadoMP.find((x: any) => x.Id == value).PrecioCosto;
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
      if(value.precio == null || value.precio == "")
      {
        value.precio = this.precio;
      }
      let data = {
        'idArticulo': this.data.idArt, 'idSucursal': this.data.idSuc,
        'idMP':value.idMateriaPrima,
        'cantidad': value.cantidad, 'idClienteNegotis' : this.data.idClienteNegotis,
        'precio':value.precio
      };
      this.mpServ.guardarArticuloMP(data)
        .subscribe(data => {
          this.post = data; this.dialogRef.close(value);
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
    this.getMPCantidad(this.idSucursalActual);
  }

  onNext(): void {
    this.page++;
    this.getMPCantidad(this.idSucursalActual);
  }

  onPrev(): void {
    this.page--;
    this.getMPCantidad(this.idSucursalActual);
  }

  cancel() {
    this.dialogRef.close();
  }

  cerrar() {
    this.dialogRef.close();
  }

}
