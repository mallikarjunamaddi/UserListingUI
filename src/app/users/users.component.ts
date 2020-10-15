import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { User } from '../core/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[];

  constructor() { 
    this.dataSource = new MatTableDataSource<User>();
    this.displayedColumns = ["name", "email", "roleType", "status", "edit"];
  }

  ngOnInit(): void {
  }

}
