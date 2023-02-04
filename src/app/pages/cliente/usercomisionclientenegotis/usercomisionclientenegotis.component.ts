import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from '../../../Service/general.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarOperacionExitosaComponent } from '../../../components/snack-bar-operacion-exitosa/snack-bar-operacion-exitosa.component';
import { UserService } from '../../../Service/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-usercomisionclientenegotis',
  templateUrl: './usercomisionclientenegotis.component.html',
  styleUrls: ['./usercomisionclientenegotis.component.css']
})
export class UsercomisionclientenegotisComponent implements OnInit {

  myForm: FormGroup;
  submitted!: boolean;
  post: any;
  comision: any;
  idMarca: any = 0;
  marcaById: any;

  constructor(private titleService: Title,private fb: FormBuilder, private userServ: UserService, private router: Router,
    private route: ActivatedRoute, private generalServ: GeneralService, private snackBar: MatSnackBar) {
    titleService.setTitle("Usuario");
    this.myForm = fb.group({
      comision: ['', Validators.compose([Validators.required,Validators.pattern('^[0-9.,]+$')])],
    });
  }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    let data = { 'idUser': localStorage.getItem('idUser') };
    this.userServ.getComision(data).subscribe(data => {
      this.comision = data;
      loading.close();
    }, error => { console.log(error); loading.close(); });
  }

  onSubmit(value: any) {
    if (this.myForm.valid) {
      const loadRef = this.generalServ.loadingModal();
      let data = {
        'idUser': localStorage.getItem('idUser'), 'comision': value.comision
      };
      this.userServ.saveComision(data)
        .subscribe(data => {
          this.post = data; loadRef.close();
          if (this.post == true) {
            this.router.navigate(["/cliente/usuario/panel"], { replaceUrl: true });
            this.snackBar.openFromComponent(SnackBarOperacionExitosaComponent, {
              duration: 1000,
            });
          }
        }, error => { console.log(error); loadRef.close(); });
    }
    this.submitted = true;
  }

}
