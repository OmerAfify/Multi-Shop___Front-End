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

  //properties 
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
      "deliveryMethodId": new FormControl(null,Validators.required),
      "Payment": new FormGroup({
        "paymentType": new FormControl(null, Validators.required)
      })
    })

  constructor(private checkOutService:CheckoutService, 
    private shoppingCartService:ShoppingCartService,
    private accountService:AccountService, 
    private router: Router) { }

ngOnInit(): void {

  this.GetDefaultUserShippingAddressInfo();
  this.GetDeliveryMethodsOptions();
  this.GetChoosenDeliveryMethod()

  }

  createPaymentIntent(){
if(this.shoppingCartService.getCurrentShoppingCart()==null)
    return

 this.shoppingCartService.CreateOrUpdatePaymentIntent().subscribe((shoppingCart)=>{
console.log(shoppingCart);
    })
  }


onSubmitForm(){

let shoppingCart = this.shoppingCartService.getCurrentShoppingCart();

if(shoppingCart!=null){

let order:IOrderToCreate = {
    shoppingCartId: shoppingCart.id,
    shippingAddress: this.CheckOutForm.get("ShippingAddress")?.value,
    deliveryMethodId: this.CheckOutForm.get("deliveryMethodId")?.value
  }
  
this.checkOutService.createOrder(order).subscribe((order)=>{
//toaster notify
if(shoppingCart){
   this.shoppingCartService.removeShoppingCart(shoppingCart.id)?.subscribe();
   this.router.navigate(['/OrderSuccess',order.orderId])
}
   })
  }else{
    return;
  }
    
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


//ngOninit calls
   GetDefaultUserShippingAddressInfo(){

    this.accountService.getCurrentUserAddress().subscribe((address)=>{
    this.CheckOutForm.get("ShippingAddress")?.patchValue(address)
    })
     
    }
    
    GetDeliveryMethodsOptions(){
    this.checkOutService.getDeliveryMethods().subscribe((data)=>{
     this.DeliveryMethods = data;
        })
    
    }


   GetChoosenDeliveryMethod()
  {
    let shoppingCart = this.shoppingCartService.getCurrentShoppingCart();
    
    if(shoppingCart && shoppingCart.DeliveryMethodId){
     console.log("id is : "+shoppingCart.DeliveryMethodId)
      this.CheckOutForm.get("deliveryMethodId")?.patchValue(shoppingCart.DeliveryMethodId);
    }
    }

}
