import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ArticuloService } from '../../Service/articulo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GeneralService } from '../../Service/general.service';
import { MateriaPrimaService } from 'src/app/Service/materiaprima.service';


@Component({
  selector: 'app-visualizarMP-modal',
  templateUrl: './visualizarMP-modal.component.html',
  styleUrls: ['./visualizarMP-modal.component.css']
})
export class VisualizarMPModalComponent implements OnInit {

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
  MP:any;
  listaMateriaPrimas: any = [];


  constructor(private fb: FormBuilder, private articuloServ: ArticuloService,private mpServ: MateriaPrimaService,
    private dialogRef: MatDialogRef<VisualizarMPModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private generalServ: GeneralService) {
    this.myForm = fb.group({
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


  getMPCantidad(value: any) {

    this.sucursalActual = value;
    let dataArt = { 'idArticulo': this.idArticulo,'idSucursal': this.idSucursal.IdSucursal , 'idClienteNegotis': localStorage.getItem('idClienteNegotis') };
        this.articuloServ.getCantidadArticuloMPById(dataArt).subscribe(data => {
          this.listadoMP=data;

          this.listadoMP.forEach( (element: any) => {
            //this.MP=this.listadoMP.find(x => x.MateriaPrima.Id == element.IdMateriaPrima);
            this.MP = element.MateriaPrima;
            this.MP.nombre = element.MateriaPrima.Nombre;
            this.MP.precio = element.Precio;
            this.MP.cantidad = element.CantidadArticulo;

            this.listaMateriaPrimas.push(this.MP);
          });
          this.listaMateriaPrimas.forEach(async (element: any) =>{
            let dataArt2 = { 'idMateriaPrima': element.Id,'idSucursal': this.idSucursal.IdSucursal};
            const result = await this.mpServ.getMPCantById(dataArt2).subscribe((dat: any) =>
              element.stock = dat.CantidadArticulo
            );
              // @ts-ignore
              await forEach();
         });
        }, error => { console.log(error);})


  }



  cancel() {
    this.dialogRef.close();
  }

  cerrar() {
    this.dialogRef.close();
  }

}
