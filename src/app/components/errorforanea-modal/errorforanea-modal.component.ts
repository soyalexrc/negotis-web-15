import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-errorforanea-modal',
  templateUrl: './errorforanea-modal.component.html',
  styleUrls: ['./errorforanea-modal.component.css']
})
export class ErrorforaneaModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ErrorforaneaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  aceptar() {
    this.dialogRef.close();
  }

}
