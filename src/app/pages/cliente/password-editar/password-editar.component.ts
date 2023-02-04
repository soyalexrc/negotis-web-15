import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { UserService } from '../../../Service/user.service';

@Component({
  selector: 'app-password-editar',
  templateUrl: './password-editar.component.html',
  styleUrls: ['./password-editar.component.css']
})
export class PasswordEditarComponent implements OnInit {

  myForm: FormGroup;
  submitted!: any;
  post: any;
  vieja: any;
  nueva: any;
  repetirNueva: any;
  nuevaViejaIguales: any;

  constructor(private titleService: Title,private fb: FormBuilder, private userServ: UserService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService) {
    titleService.setTitle("Usuario");
    this.myForm = fb.group({
      vieja: ['', Validators.compose([Validators.required])],
      nueva: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])],
      repetirNueva: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  onSubmit(value: any) {
    this.nuevaViejaIguales = null;
    if (this.myForm.valid && value.nueva == value.repetirNueva) {
      const loadRef = this.generalServ.loadingModal();
      let data = {
        'idUser': localStorage.getItem('idUser'), 'vieja': value.vieja,
        'nueva': value.nueva
      };
      this.userServ.cambiarContraseña(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
        }, error => { console.log(error); loadRef.close(); });
    } else {
      if (value.nueva != null && value.repetirNueva != null) {
        this.nuevaViejaIguales = false;
      }
    }
    this.submitted = true;
  }

  volverEditar() {
    this.post = null;
    this.submitted = null;
    this.vieja = null;
    this.nueva = null;
    this.repetirNueva = null;
  }

}
