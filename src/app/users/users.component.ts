import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { User } from '../core/models/user';
import { DialogModel } from '../core/models/DialogModel';
import { UserService } from '../core/services/user.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  noDataFound: boolean;
  displayedColumns: string[];
  dataSource: MatTableDataSource<User>;
  statusList: string[];

  // When set {static : true}, Angular Compiler consider this @ViewChild element is static,
  // so it only obtain the MatSort one time at ngOnInit(). Even if *ngIf triggered still can't
  // catch the MatSort component. So use {static: false}
  @ViewChild(MatSort, {static: false}) set sort(sort: MatSort) {
    if (sort){
      this.dataSource.sort = sort;
    }
  }

  @ViewChild(MatPaginator, {static: false}) set paginator(paginator: MatPaginator) {
    if (paginator){
      this.dataSource.paginator = paginator;
    }
  }
  constructor(private userService: UserService,
              private matDialog: MatDialog) { 
    this.dataSource = new MatTableDataSource<User>();
    this.displayedColumns = ["name", "email", "roleType", "status", "edit"];
    this.statusList = ["Active", "Pending", "Inactive"];
    this.getUsers();
  }

  ngOnInit(): void {
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      if(users) {
        this.noDataFound = false;
        this.dataSource.data = users;
      } else {
        this.noDataFound = true;
        this.dataSource.data = [];
      }
    }, (error) => {
      this.noDataFound = true;
      console.error(error);
    });
  }

  addOrEditUser(user: User) {
    let userObj: User;
    let dialogTitle: string;
    if(user) {
      userObj = user;
      dialogTitle = "Edit user";
    } else {
      userObj = new User();
      dialogTitle = "Add user";
      userObj.status = "Pending";
    }
    let data: DialogModel = {
      dialogTitle: dialogTitle,
      user: userObj
    }

    let dialogRef = this.matDialog.open(DialogComponent, {data: data});
    dialogRef.afterClosed().subscribe();
  }
}
