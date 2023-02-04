import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-modal',
  templateUrl: './eliminar-modal.component.html',
  styleUrls: ['./eliminar-modal.component.css']
})
export class EliminarModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EliminarModalComponent>,
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
