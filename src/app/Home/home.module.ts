import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../Shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path:"Home", component:HomePageComponent}]),
    ],exports:[RouterModule]

  })
export class HomeModule { }
