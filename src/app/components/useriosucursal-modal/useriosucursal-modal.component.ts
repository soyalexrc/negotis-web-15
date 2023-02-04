import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-useriosucursal-modal',
  templateUrl: './useriosucursal-modal.component.html',
  styleUrls: ['./useriosucursal-modal.component.css']
})
export class UseriosucursalModalComponent implements OnInit {

  userName: any;
  sucursal: any;

  constructor(private dialogRef: MatDialogRef<UseriosucursalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userName = data.userName;
    this.sucursal=data.sucursal;
  }

  ngOnInit() {
  }

  cerrar() {
    this.dialogRef.close();
  }

}
