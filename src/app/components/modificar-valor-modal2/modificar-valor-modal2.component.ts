import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogModel } from 'src/app/models/DialogModel';

@Component({
  selector: 'app-modificar-valor-modal2',
  templateUrl: './modificar-valor-modal2.component.html',
  styleUrls: ['./modificar-valor-modal2.component.css']
})
export class ModificarValorModal2Component implements OnInit {

  myForm: FormGroup;
  //Data
  data: DialogModel;


  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModificarValorModal2Component>,
    @Inject(MAT_DIALOG_DATA) public dataIn: DialogModel) {
    this.data = dataIn;
    this.myForm = fb.group({
      value: ['', Validators.compose(this.GetValidators())],
    });
  }

  GetValidators(): any[] {

    var regexed = this.data.valueType.match(/^(?<valueType>[a-z]+)(\[(?<minValue>[0-9]+(.[0-9]+)?)-(?<maxValue>[0-9]+(.[0-9]+)?)\])?$/i);
    var value = regexed.groups.valueType;

    switch (value) {
      case 'int':
        return [Validators.pattern('^[0-9]+$'), Validators.required];
      case 'float':
        return [Validators.pattern('^[0-9]+((,|.)[0-9]+)?$'), Validators.required];
      case 'porcentaje':
        return [Validators.required];
      default:
        return [Validators.required];
    }
  }

  ngOnInit() {
  }

  @ViewChild("#myInput") myInputField!: ElementRef;
editMyInputField(): void {
  this.myInputField.nativeElement.focus();
}
  onSubmit(value: any) {
    if (this.myForm.valid) {
      this.dialogRef.close(this.data.value);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
