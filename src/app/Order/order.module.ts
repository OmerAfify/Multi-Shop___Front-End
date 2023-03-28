import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../Shared/shared.module';
import { CoreModule } from '../Core/core.module';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../Shared/Guards/auth.guard';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { UsersOrdersComponent } from './users-orders/users-orders.component';



@NgModule({
  declarations: [CheckoutComponent, OrderSuccessComponent, OrderDetailsComponent, UsersOrdersComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild([{path:"Checkout",canActivate:[AuthGuard], component:CheckoutComponent}, 
    {path:"OrderSuccess/:orderId",canActivate:[AuthGuard], component:OrderSuccessComponent},
    {path:"OrderDetails/:orderId",canActivate:[AuthGuard], component:OrderDetailsComponent},
    {path:"Orders",canActivate:[AuthGuard], component:UsersOrdersComponent}])
 
  ],
  exports:[RouterModule]
})
export class OrderModule { }
