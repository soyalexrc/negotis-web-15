import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { ResetPasswordModalComponent } from '../../../components/reset-password-modal/reset-password-modal.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralService } from '../../../Service/general.service';

@Component({
  selector: 'app-superadmin-panel',
  templateUrl: './superadmin-panel.component.html',
  styleUrls: ['./superadmin-panel.component.css']
})
export class SuperadminPanelComponent implements OnInit {

  superAdminList: any;
  post: any;

  constructor(private userServ: UserService, private dialog: MatDialog, private generalServ: GeneralService) { }

  ngOnInit() {
    const loading = this.generalServ.loadingModal();
    this.userServ.getListSuperAdmin()
      .subscribe(data => { this.superAdminList = data; loading.close(); },
        error => { console.log(error); loading.close(); }
      );
  }


  resetPasswordModal(value: any) {
    const dialogRef = this.dialog.open(ResetPasswordModalComponent, {
      width: '450px', data: { idUser: value.Id, nombres: value.Nombres, apellidos: value.Apellidos, userName: value.UserName },
    });
  }

}
