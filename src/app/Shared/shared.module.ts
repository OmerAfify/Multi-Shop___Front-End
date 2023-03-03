import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBoxComponent } from './Components/product-box/product-box.component';
import { ShoppingCartSummaryComponent } from './Components/shopping-cart-summary/shopping-cart-summary.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../Core/core.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ProductBoxComponent,ShoppingCartSummaryComponent],
  imports: [
    CoreModule,
    CommonModule,
    RouterModule,
  ReactiveFormsModule
  ],
  exports:[ProductBoxComponent, ShoppingCartSummaryComponent, 
    ReactiveFormsModule]
})
export class SharedModule { }
