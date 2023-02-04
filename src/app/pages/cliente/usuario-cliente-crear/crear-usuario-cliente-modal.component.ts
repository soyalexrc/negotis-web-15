import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GeneralService } from '../../../Service/general.service';
import { ClienteclienteService } from '../../../Service/clientecliente.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-crear-usuario-cliente-modal',
  templateUrl: './crear-usuario-cliente-modal.component.html',
  styleUrls: ['./crear-usuario-cliente-modal.component.css']
})
export class CrearUsuarioClienteModalComponent implements OnInit {

  myForm: FormGroup;
  usuario: string;
  idCliente: number;

  constructor(
        private titleService: Title,
        private fb: FormBuilder,
        private clienteService: ClienteclienteService,
        private dialogRef: MatDialogRef<CrearUsuarioClienteModalComponent>,
        private generalServ: GeneralService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    titleService.setTitle("Usuario");
    this.myForm = fb.group({
      usuario: ['', Validators.compose([Validators.required])],
    });

    this.usuario = data.usuario;
    this.idCliente = data.idCliente;
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      let request = {
        'usuario': this.usuario,
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'id': this.idCliente
      };

      this.clienteService.crearUsuario(request).subscribe(data => {
          this.dialogRef.close(data);
          loadRef.close();
        }, error => { console.log(error); loadRef.close(); });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
}
