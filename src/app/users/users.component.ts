import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { User } from '../core/models/user';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  noDataFound: boolean;
  displayedColumns: string[];
  dataSource: MatTableDataSource<User>;

  // When set {static : true}, Angular Compiler consider this @ViewChild element is static,
  // so it only obtain the MatSort one time at ngOnInit(). Even if *ngIf triggered still can't
  // catch the MatSort component. So use {static: false}
  @ViewChild(MatSort, {static: false}) set sort(sort: MatSort) {
    if (sort){
      this.dataSource.sort = sort;
    }
  }

  constructor(private userService: UserService) { 
    this.dataSource = new MatTableDataSource<User>();
    this.displayedColumns = ["name", "email", "roleType", "status", "edit"];
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
}
