import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-especificacion-modal',
  templateUrl: './especificacion-modal.component.html',
  styleUrls: ['./especificacion-modal.component.css']
})
export class EspecificacionModalComponent implements OnInit {

  especificaion: any;

  constructor(public dialogRef: MatDialogRef<EspecificacionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialog) {
    this.especificaion = data.especificacion;
  }

  ngOnInit() {
  }

  cerrar() {
    this.dialogRef.close();
  }

}
