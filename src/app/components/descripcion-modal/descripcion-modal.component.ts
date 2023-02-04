import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticuloService } from '../../Service/articulo.service';
import { GeneralService } from '../../Service/general.service';

@Component({
  selector: 'app-descripcion-modal',
  templateUrl: './descripcion-modal.component.html',
  styleUrls: ['./descripcion-modal.component.css']
})
export class DescripcionModalComponent implements OnInit {
  post: any;
  item: any;
  descripcion: any = "";


  constructor(public dialogRef: MatDialogRef<DescripcionModalComponent>,private articuloServ: ArticuloService,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog,private generalServ: GeneralService) {
    this.item = data;
    if(this.item.descripcion != null)
    {
        this.descripcion = this.item.descripcion;
    }

  }

  ngOnInit() {
  }

  onSubmit() {
    const loadRef = this.generalServ.loadingModal();
    let data = {
        'idArticulo': this.item.idArticulo,
        'descripcion': this.descripcion, 'idClienteNegotis' : this.item.idClienteNegotis
      };
      this.articuloServ.guardarDescripcion(data)
        .subscribe(data => {

          loadRef.close();
        }, error => { console.log(error); loadRef.close(); });
      this.dialogRef.close(this.descripcion);
  }
  cerrar() {
    this.dialogRef.close();
  }

}
