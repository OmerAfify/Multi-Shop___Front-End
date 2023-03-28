import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDeliveryMethods } from 'src/app/Shared/Interfaces/IDeliveryMethods';
import { IOrderToCreate } from 'src/app/Shared/Interfaces/IOrder';
import { ShoppingCart } from 'src/app/Shared/Models/ShoppingCart';
import { AccountService } from 'src/app/Shared/Services/AccountServices';
import { CheckoutService } from 'src/app/Shared/Services/CheckoutService';
import { ShoppingCartService } from 'src/app/Shared/Services/shopping-cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  DeliveryMethods:IDeliveryMethods[]=[];

  CheckOutForm : FormGroup = new FormGroup(
    {
      "ShippingAddress": new FormGroup({
        "firstName" : new FormControl(null,Validators.required),
        "lastName" : new FormControl(null,Validators.required),
        "city": new FormControl(null,Validators.required),
        "state" : new FormControl(null,Validators.required),
        "street" : new FormControl(null,Validators.required),
        "zipCode" : new FormControl(null,Validators.required),
      }),
      "deliveryMethodId": new FormControl(null,Validators.required)
    }
  )

  constructor(private checkOutService:CheckoutService, 
    private shoppingCartService:ShoppingCartService,
    private accountService:AccountService, 
    private router: Router) { }

ngOnInit(): void {

this.accountService.getCurrentUserAddress().subscribe((address)=>{
this.CheckOutForm.get("ShippingAddress")?.patchValue(address)
})

this.checkOutService.getDeliveryMethods().subscribe((data)=>{
 this.DeliveryMethods = data;
    })
  }



 onSubmitForm(){

let shoppingCart = this.shoppingCartService.getCurrentShoppingCart();

if(ShoppingCart==null)
    return 

let order:IOrderToCreate = {
    shoppingCart: shoppingCart,
    shippingAddress: this.CheckOutForm.get("ShippingAddress")?.value,
    deliveryMethodId: this.CheckOutForm.get("deliveryMethodId")?.value
  }
  
this.checkOutService.createOrder(order).subscribe((order)=>{
//toaster notify

this.shoppingCartService.removeShoppingCart();
this.router.navigate(['/OrderSuccess',order.orderId])

   })
    
  }

  SetShippingPrice(method: IDeliveryMethods){
         this.shoppingCartService.setShippingPrice(method);
  }

  SetDefaultAddress(){
    this.accountService.SetCurrentUserAddress(this.CheckOutForm.get("ShippingAddress")?.value).subscribe((address)=>{
      //sent toaster notification
      this.CheckOutForm.get("ShippingAddress")?.reset(this.CheckOutForm.get("ShippingAddress")?.value);
    })
  }


}
