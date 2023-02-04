import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mensajeseleccionarsucursal-modal',
  templateUrl: './mensajeseleccionarsucursal-modal.component.html',
  styleUrls: ['./mensajeseleccionarsucursal-modal.component.css']
})
export class MensajeseleccionarsucursalModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<MensajeseleccionarsucursalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  cerrarModal() {
    this.dialogRef.close();
  }

}
