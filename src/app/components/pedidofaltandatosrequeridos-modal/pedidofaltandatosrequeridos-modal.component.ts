import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pedidofaltandatosrequeridos-modal',
  templateUrl: './pedidofaltandatosrequeridos-modal.component.html',
  styleUrls: ['./pedidofaltandatosrequeridos-modal.component.css']
})
export class PedidofaltandatosrequeridosModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PedidofaltandatosrequeridosModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  aceptar() {
    this.dialogRef.close();
  }

}
