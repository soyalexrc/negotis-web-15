import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-bloqueardesbloquear-modal',
  templateUrl: './bloqueardesbloquear-modal.component.html',
  styleUrls: ['./bloqueardesbloquear-modal.component.css']
})
export class BloqueardesbloquearModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<BloqueardesbloquearModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  cancelar(){
    this.dialogRef.close();
  }

  aceptar(){
    this.dialogRef.close(true);
  }
}
