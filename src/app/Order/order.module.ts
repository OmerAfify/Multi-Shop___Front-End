import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../Shared/shared.module';
import { CoreModule } from '../Core/core.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../Shared/Guards/auth.guard';



@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild([{path:"Checkout",canActivate:[AuthGuard], component:CheckoutComponent}])
  ],
  exports:[RouterModule]
})
export class OrderModule { }
