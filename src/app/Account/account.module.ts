import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterPageComponent } from './register-page/register-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path:"register", component:RegisterPageComponent}]
)
  ],exports:[RouterModule]
})
export class AccountModule { }
