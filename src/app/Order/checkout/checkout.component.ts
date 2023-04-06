import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Stripe, StripeCardCvcElement, StripeCardExpiryElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
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

@ViewChild("numberOnCard") numberOnCardElement?: ElementRef;
@ViewChild("expiryDate") expiryDateElement?: ElementRef;
@ViewChild("cvc") cvcElement?: ElementRef; 

stripe : Stripe | null = null;
cardNumber? : StripeCardNumberElement;
cardExpiry? : StripeCardExpiryElement;
cardCvc? : StripeCardCvcElement;


cardNumberEvent : boolean = false;
cardExpiryEvent :  boolean = false;
cardCvcEvent:  boolean = false;



cardErrors : any;

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
        "nameOnCard": new FormControl(null, Validators.required)
      })
    })

  constructor(private checkOutService:CheckoutService, 
    private shoppingCartService:ShoppingCartService,
    private accountService:AccountService, 
    private router: Router, private taostr:ToastrService) { }

ngOnInit(): void {

loadStripe("pk_test_51MrK1YEjTd25xYxuSrCffT1i7rKhnoyq6THl6zvf8k9oW8A22LdCy4ThzXcx3gQye0YxDrq1I7arHkljCcTf1YPp00Tb9s0Rsm")
.then( stripe=>{

  this.stripe = stripe;
  const elements = stripe?.elements();

  if(elements){
    //card Number
    this.cardNumber = elements.create('cardNumber');
    this.cardNumber.mount(this.numberOnCardElement?.nativeElement);
    this.cardNumber.on('change', event=>{

      this.cardNumberEvent = event.complete;
    
      if(event.error)
        this.cardErrors = event.error.message;   
       else
        this.cardErrors = null;
    })

    this.cardExpiry = elements.create('cardExpiry');
    this.cardExpiry.mount(this.expiryDateElement?.nativeElement)
    this.cardExpiry.on('change', event=>{

      this.cardExpiryEvent = event.complete;

      if(event.error)
         this.cardErrors = event.error.message;
      else
        this.cardErrors = null;
    })



    this.cardCvc = elements.create('cardCvc');
    this.cardCvc.mount(this.cvcElement?.nativeElement)
    this.cardCvc.on('change', event=>{

      this.cardCvcEvent = event.complete;
   
      if(event.error)
        this.cardErrors = event.error.message;
       else
        this.cardErrors = null;
    })

  }
})


this.createPaymentIntent();

  this.GetDefaultUserShippingAddressInfo();
  this.GetDeliveryMethodsOptions();
  this.GetChoosenDeliveryMethod()

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
      console.log(shoppingCart.clientSecret);
        var cardId = shoppingCart.id;
        this.stripe?.confirmCardPayment(shoppingCart.clientSecret!, {
          payment_method :{card:this.cardNumber!,
            billing_details : {
            name: this.CheckOutForm.get("Payment")?.get("nameOnCard")?.value}
          }}).then(result=>{
            console.log(result);
            if(result.paymentIntent){
              this.shoppingCartService.removeShoppingCart(cardId)?.subscribe();
              this.router.navigate(['/OrderSuccess',order.orderId])
            }else{
              this.taostr.error(result.error.message);
            }
      })
    }    
  else
    return;

  }); 


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


isValidPayment(){
// console.log("-----------------------------------------------")
//   console.log("name on card :"+this.CheckOutForm.get("Payment.nameOnCard")?.valid);
// console.log("cardExpiryEvent :"+this.cardExpiryEvent);
// console.log("cardNumberEvent :"+this.cardNumberEvent);
// console.log("cardCvcEvent :"+this.cardCvcEvent);

 var valid = this.CheckOutForm.get("Payment.nameOnCard")?.valid
  && this.cardExpiryEvent && this.cardNumberEvent && this.cardCvcEvent; 
  return valid;
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

    createPaymentIntent(){
      if(this.shoppingCartService.getCurrentShoppingCart()==null)
          return;
      
       this.shoppingCartService.CreateOrUpdatePaymentIntent().subscribe((shoppingCart)=>{
          })
        }
      

}
