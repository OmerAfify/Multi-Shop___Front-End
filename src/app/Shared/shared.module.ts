import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBoxComponent } from './Components/product-box/product-box.component';
import { ShoppingCartSummaryComponent } from './Components/shopping-cart-summary/shopping-cart-summary.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../Core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from  'ngx-bootstrap/pagination';
import { PagingComponent } from './Components/paging/paging.component'


@NgModule({
  declarations: [ProductBoxComponent,ShoppingCartSummaryComponent, PagingComponent],
  imports: [
    CoreModule,
    CommonModule,
    RouterModule,
  ReactiveFormsModule,
  PaginationModule.forRoot()
  ],
  exports:[ProductBoxComponent, ShoppingCartSummaryComponent, PagingComponent, 
    ReactiveFormsModule, PaginationModule]
})
export class SharedModule { }
