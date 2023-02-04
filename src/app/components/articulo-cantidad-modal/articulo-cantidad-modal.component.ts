import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { ArticuloService } from '../../Service/articulo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GeneralService } from '../../Service/general.service';

@Component({
  selector: 'app-articulo-cantidad-modal',
  templateUrl: './articulo-cantidad-modal.component.html',
  styleUrls: ['./articulo-cantidad-modal.component.css']
})
export class ArticuloCantidadModalComponent implements OnInit {

  myForm: FormGroup;
  post: any;
  cantidad: any;
  valEntero!: boolean;
  errorEntero!: boolean;

  constructor(private fb: FormBuilder, private articuloServ: ArticuloService,
    private dialogRef: MatDialogRef<ArticuloCantidadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private generalServ: GeneralService) {
    this.myForm = fb.group({
      cantidad: ['', Validators.compose([Validators.pattern('^[0-9 , .]+$'), Validators.required])],
    });
    this.cantidad = data.cantidad;
    if (this.data.unidad == true || (this.data.unidad == null && this.data.kilogramo == null)) {
      this.valEntero = true;
    }
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      if (this.valEntero == true) {
        if (String(value.cantidad).includes(',') || String(value.cantidad).includes('.')) {
          this.errorEntero = true;
          return null;
        }
      }
      const loadRef = this.generalServ.loadingModal();
      let data = {
        'idArticulo': this.data.idArt, 'idSucursal': this.data.idSuc,
        'cantidadArticulo': value.cantidad, 'idClienteNegotis' : this.data.idClienteNegotis
      };
      this.articuloServ.guardarCantidadArticulo(data)
        .subscribe(data => {
          this.post = data; this.dialogRef.close(value.cantidad);
          loadRef.close();
        }, error => { console.log(error); loadRef.close(); });
    }
  }

  @ViewChild("#myInput") myInputField!: ElementRef;
  editMyInputField(): void {
    this.myInputField.nativeElement.focus();
  }

  cancel() {
    this.dialogRef.close();
  }

}
