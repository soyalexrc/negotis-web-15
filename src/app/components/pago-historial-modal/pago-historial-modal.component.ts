import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pago-historial-modal',
  templateUrl: './pago-historial-modal.component.html',
  styleUrls: ['./pago-historial-modal.component.css']
})
export class PagoHistorialModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<PagoHistorialModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  cerrar() {
    this.dialogRef.close();
  }

}
