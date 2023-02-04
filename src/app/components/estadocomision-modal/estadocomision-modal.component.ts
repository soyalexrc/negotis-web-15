import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import PropertyUtil, {TiposPropiedad} from "../../util/property.util";

@Component({
  selector: 'app-estadocomision-modal',
  templateUrl: './estadocomision-modal.component.html',
  styleUrls: ['./estadocomision-modal.component.css']
})
export class EstadocomisionModalComponent implements OnInit {

  estadoComision: any = null;
  valEstadoVacio!: boolean;
  estadosComision = PropertyUtil.getPropertiesByType(TiposPropiedad.ESTADO_COMISION);

  constructor(private dialogRef: MatDialogRef<EstadocomisionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.estadoComision = data.item.CodigoEstadoComision;
  }

  ngOnInit() {
  }

  cancelar() {
    this.dialogRef.close();
  }

  aceptar() {
    if (this.estadoComision != '') {
      let data = { 'resultado': true, 'nuevoEstado': this.estadoComision };
      this.dialogRef.close(data);
    } else {
      this.valEstadoVacio = true;
    }
  }

}
