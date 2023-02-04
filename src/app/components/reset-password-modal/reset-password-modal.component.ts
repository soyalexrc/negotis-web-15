import { Component, OnInit, Inject } from '@angular/core';
import { UserService } from '../../Service/user.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { GeneralService } from '../../Service/general.service';
import * as Constants from 'src/app/util/constants';

@Component({
  selector: 'app-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.css']
})
export class ResetPasswordModalComponent implements OnInit {

  post: any;

  constructor(private userServ: UserService, private dialogRef: MatDialogRef<ResetPasswordModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private generalServ: GeneralService) { }

  ngOnInit() {
  }

  resetPassword() {
    const loadRef = this.generalServ.loadingModal();
    let dataPost = { 'idUser': this.data.idUser, 'newPassword': Constants.defaultPassword }
    this.userServ.resetPassword(dataPost).subscribe(data => {
      this.post = data;
      loadRef.close();
    }, error => { console.log(error); loadRef.close(); });
  }

  cancelar(){
    this.dialogRef.close();
  }


}
