import { NgForm } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogModel } from '../core/models/DialogModel';
import { UserService } from '../core/services/user.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  phonePattern: RegExp;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModel, 
    private userService: UserService) {
      this.phonePattern = new RegExp('^[0-9]{3}-[0-9]{3}-[0-9]{4}$');
    }

  ngOnInit(): void {
  }

  saveUser(userForm: NgForm) {
    if(userForm.valid && this.data.user.id) {
      this.userService.editUser(this.data.user).subscribe((response) => {
        if(response) {
          window.location.reload();
        }
      }, (error) => {
        console.error(error);
      });
    } else if(userForm.valid) {
        this.userService.addUser(this.data.user).subscribe((response) => {
          if(response) {
            window.location.reload();
          }
        }, (error) => {
          console.error(error);
        });
    }
  }
}
