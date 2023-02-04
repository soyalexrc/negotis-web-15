import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-articulosincantidad-modal',
  templateUrl: './articulosincantidad-modal.component.html',
  styleUrls: ['./articulosincantidad-modal.component.css']
})
export class ArticulosincantidadModalComponent implements OnInit {

  stock:number;

  constructor(private dialogRef: MatDialogRef<ArticulosincantidadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.stock=data.stock;
  }

  ngOnInit() {
  }

  aceptar() {
    this.dialogRef.close();
  }

}
