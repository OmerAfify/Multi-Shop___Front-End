import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { SharedModule } from '../Shared/shared.module';
import { CoreModule } from '../Core/core.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProductDetailsComponent, ShopPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path:"Shop", component:ShopPageComponent},
    {path:"Shop/:id", component:ProductDetailsComponent}]
    )
  ],exports:[RouterModule]
})
export class ShopModule { }
