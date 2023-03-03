import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './Register/register.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../Shared/shared.module';
import { LoginComponent } from './Login/login.component';



@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path:"Register", component:RegisterComponent},
    {path:"Login", component:LoginComponent}]
)
  ],exports:[RouterModule]
})
export class AccountModule { }
