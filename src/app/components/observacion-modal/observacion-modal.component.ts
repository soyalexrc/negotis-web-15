import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticuloService } from '../../Service/articulo.service';
import { GeneralService } from '../../Service/general.service';

@Component({
  selector: 'app-observacion-modal',
  templateUrl: './observacion-modal.component.html',
  styleUrls: ['./observacion-modal.component.css']
})
export class ObservacionModalComponent implements OnInit {
  post: any;
  item: any;
  observacion: any = "";
  id: any;


  constructor(public dialogRef: MatDialogRef<ObservacionModalComponent>,private articuloServ: ArticuloService,
    @Inject(MAT_DIALOG_DATA) public data: any, @Inject(MAT_DIALOG_DATA) public idPedido: any, private dialog: MatDialog,private generalServ: GeneralService) {
    this.item = data;
    this.id = idPedido.idPedido;
    if(this.item.item.Observacion != null)
    {
        this.observacion = this.item.item.Observacion;
    }


  }

  ngOnInit() {
  }

  onSubmit() {
      this.dialogRef.close(this.observacion);
  }
  cerrar() {
    this.dialogRef.close();
  }

}
