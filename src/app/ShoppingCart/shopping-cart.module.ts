import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SharedModule } from '../Shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path:"ShoppingCart", component:ShoppingCartComponent}])
  ],exports:[RouterModule]
})
export class ShoppingCartModule { }
