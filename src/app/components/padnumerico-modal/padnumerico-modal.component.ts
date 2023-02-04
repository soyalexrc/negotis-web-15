import { Component, OnInit, Inject, HostListener, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-padnumerico-modal',
  templateUrl: './padnumerico-modal.component.html',
  styleUrls: ['./padnumerico-modal.component.css']
})
export class PadnumericoModalComponent implements OnInit {

  myForm: FormGroup;
  cantidad: string = '';
  soloEntero: boolean = true;
  submitted!: boolean;
  valEntero!: any;
  valDecimales!: boolean;

  constructor(public dialogRef: MatDialogRef<PadnumericoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) {
    this.soloEntero = this.data.entero;
    this.myForm = fb.group({
      cantidad: [Validators.compose([])],
    });
    if (this.data != null) {
      if (this.data.cantidad != null && this.data.cantidad != 0) {
        this.cantidad = String(this.data.cantidad);
      }
    }
  }

  ngOnInit() {
  }

  @ViewChild("#myInput") myInputField!: ElementRef;
editMyInputField(): void {
  this.myInputField.nativeElement.focus();
}

  add(value: any) {
    this.cantidad = this.cantidad + value;
  }

  @HostListener('window:keyup', ['$event'])
  Listener(event: any) {
    if (event.keyCode === 46) {
      this.cantidad = '';
    }
    if (event.keyCode === 13) {
      this.validarEntero();
      this.validarDecimales();
      if (this.myForm.valid && this.valEntero != true && this.valDecimales != true) {
        this.dialogRef.close(Number(this.cantidad));
      }
      this.submitted = true;
    }
  }

  clean() {
    this.cantidad = '';
  }

  borrarUltimo() {
    var myString = this.cantidad;
    this.cantidad = myString.slice(0, -1);
  }

  close() {
    this.dialogRef.close();
  }

  aceptar(value: any) {
    this.validarEntero();
    this.validarDecimales();
    if (this.myForm.valid && this.valEntero != true && this.valDecimales != true) {
      this.dialogRef.close(Number(value.cantidad).toFixed(2));
    }
    this.submitted = true;
  }

  validarDecimales()
    {
      this.valDecimales = false;
      let valor = this.cantidad.toString().split('.');
      let valor2 = this.cantidad.toString().split(',');

      if((valor[1] != null && valor[1].length > 2) || (valor2[1] != null && valor2[1].length > 2))
      {
        this.valDecimales = true;
      }
    }

  validarEntero() {
    if (this.soloEntero == true) {
      if (String(this.cantidad).includes(',') || String(this.cantidad).includes('.')) {
        this.valEntero = true;
      }
    }
  }

  resetValEntero() {
    this.valEntero = null;
  }

}
