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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogModel, 
    private userService: UserService) { }

  ngOnInit(): void {
  }

  saveUser(userForm: NgForm) {
    if(userForm.valid) {
      this.userService.AddUser(this.data.user).subscribe((response) => {
        if(response) {
          window.location.reload();
        }
      }, (error) => {
        console.error(error);
      });
    }
  }
}
