import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { UserService } from '../../../Service/user.service';

@Component({
  selector: 'app-mensaje-usuario',
  templateUrl: './mensaje-usuario.component.html',
  styleUrls: ['./mensaje-usuario.component.css']
})
export class MensajeUsuarioComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  mensajeUsuario: any;


  constructor(private titleService: Title,private fb: FormBuilder, private userServ: UserService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService) {
    titleService.setTitle("Usuario");
    this.myForm = fb.group({
      mensajeUsuario: ['', Validators.compose([])]
    });
  }

  ngOnInit() {
    const loadRef = this.generalServ.loadingModal();
    let data = {
      'idClienteNegotis': localStorage.getItem('idClienteNegotis')
    };
    this.userServ.getMensaje(data)
      .subscribe((data: any) => {
        this.mensajeUsuario = data;
        loadRef.close();
      }, (error: any) => { console.log(error); loadRef.close(); });


  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      let data = {
        'idClienteNegotis': localStorage.getItem('idClienteNegotis'),
        'mensaje': value.mensajeUsuario
      };
      this.userServ.guardarMensaje(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          this.router.navigate(['/cliente/usuario/panel'], { replaceUrl: true });
        }, error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }


}
