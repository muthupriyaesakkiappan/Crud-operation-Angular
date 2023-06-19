import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudoperationComponent } from './crudoperation/crudoperation.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent },
  {path:"crudoperation", component:CrudoperationComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
