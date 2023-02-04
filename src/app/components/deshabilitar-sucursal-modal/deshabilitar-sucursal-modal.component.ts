import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-deshabilitar-sucursal-modal',
  templateUrl: './deshabilitar-sucursal-modal.component.html',
  styleUrls: ['./deshabilitar-sucursal-modal.component.css']
})
export class DeshabilitarSucursalModalComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeshabilitarSucursalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.data;
     }

  ngOnInit() {
  }

  cancelar(){
    this.dialogRef.close();
  }

  aceptar(){
    this.dialogRef.close(true);
  }

}
