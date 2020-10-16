import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { WorkInprogressComponent } from './work-inprogress/work-inprogress.component';


const routes: Routes = [
  { path: "", redirectTo: "users", pathMatch: "full"},
  { path: "users", component: UsersComponent },
  { path: "progress", component: WorkInprogressComponent },
  { path: "**", redirectTo: "users", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
