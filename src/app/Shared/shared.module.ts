import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBoxComponent } from './product-box/product-box.component';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../Core/core.module';


@NgModule({
  declarations: [ProductBoxComponent,ShoppingCartSummaryComponent],
  imports: [
    CoreModule,
    CommonModule,
    RouterModule
  ],
  exports:[ProductBoxComponent, ShoppingCartSummaryComponent]
})
export class SharedModule { }
