import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ICartItem } from '../Interfaces/ICartItem';
import { IProduct } from '../Interfaces/IProduct';
import { IShoppingCartSummary } from '../Interfaces/IShoppingCartSummary';
import { IDeliveryMethods } from '../Interfaces/IDeliveryMethods';
import { ShoppingCart } from '../Models/ShoppingCart';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http:HttpClient, private toastr: ToastrService) { }

 private _ShoppingCartObservable$ = new BehaviorSubject<null | ShoppingCart>(null);
ShoppingCartObservable = this._ShoppingCartObservable$.asObservable();


private _ShoppingCartSumaryObservable$ = new BehaviorSubject<null | IShoppingCartSummary>(null);
ShoppingCartSumaryObservable = this._ShoppingCartSumaryObservable$.asObservable();

//Payment Intent
CreateOrUpdatePaymentIntent(){
  return this.http.post<ShoppingCart>("https://localhost:44311/api/CreateOrUpdatePaymentIntent?shoppingCartId="+this.getCurrentShoppingCart()?.id,null).pipe(map((shoppingCart)=>{
 this._ShoppingCartObservable$.next(shoppingCart); 
   }))
}


//shipping Price Methods
setShippingPrice(delivery: IDeliveryMethods){

let shoppingCart = this.getCurrentShoppingCart();

if(shoppingCart){
 
  shoppingCart.DeliveryMethodId = delivery.id;

  shoppingCart.shippingPrice = delivery.deliveryPrice;

  this.setShoppingCart(shoppingCart);
}

}

//Physical Shopping Cart Methods 
getShoppingCart(shoppingCartId:string){
  this.http.get<ShoppingCart>("https://localhost:44311/api/GetShoppingCart?id="+shoppingCartId).subscribe(
  {next : shoppingCart =>{this._ShoppingCartObservable$.next(shoppingCart);
  this.calculateShoppingCartSummary();
  } }
  )}
  
setShoppingCart(shoppingCart:ShoppingCart){
  this.http.post<ShoppingCart>("https://localhost:44311/api/CreateOrUpdateShoppingCart", shoppingCart).subscribe(
    {next : shoppingCart => {this._ShoppingCartObservable$.next(shoppingCart);
      localStorage.setItem("shoppingCartId",shoppingCart.id);
        this.calculateShoppingCartSummary();
    } } )
}

removeShoppingCart(shoppingCartId :string | null){

  if(shoppingCartId==null)
     return;

  return this.http.delete("https://localhost:44311/api/DeleteShoppingCart?id="+shoppingCartId).pipe(map((response)=>{
  console.log("shopping cart removed? : "+ response);
   this._ShoppingCartObservable$.next(null);
  this._ShoppingCartSumaryObservable$.next(null);
  localStorage.removeItem("shoppingCartId")
  
  }));
 
}

getCurrentShoppingCart(){
  return this._ShoppingCartObservable$.value;
}

//public methods for dealing with cart
addItemToBasket(item :IProduct | ICartItem, qty:number=1){

//check if item is a product or cartItem 
if( this.isProduct(item))
     //convert product to cartItem
     item = this.ConvertProductToCartItem(item as IProduct);
  
  let cartItem = item;

  // check if we already have a basket
  let shoppingCart = this.getCurrentShoppingCart();

  if(shoppingCart==null)
     shoppingCart = new ShoppingCart();

// additem to cart
shoppingCart = this.AddOrUpdateCartItem(shoppingCart,cartItem,qty);

this.toastr.success(`${item.productName} is added to cart`, 'Added to Cart')
this.setShoppingCart(shoppingCart);

}

removeItemFromBasket(productId:number, qty:number=1){

  let shoppingCart = this.getCurrentShoppingCart();

  if(shoppingCart==null)
     return ;

    let itemToRemove = shoppingCart.items.find(i=>i.productId==productId);

    if(itemToRemove){
      itemToRemove.quantity -= qty;

      if(itemToRemove.quantity<=0)
          shoppingCart.items = shoppingCart.items.filter(i=>i.productId!==productId);
    }  

if(shoppingCart.items.length<=0)
    this.removeShoppingCart(shoppingCart.id)?.subscribe();
else 
    this.setShoppingCart(shoppingCart);

}




//private Helper Methods

private ConvertProductToCartItem(product:IProduct):ICartItem{
  return  {
    productId : product.productId,
    productImage :( product.productImages===undefined)? null : product.productImages[0].productImagePath,
    productName : product.productName,
    salesPrice : product.salesPrice,
    quantity : 0,
    categoryName:product.categoryName
      }
}

private AddOrUpdateCartItem(shoppingCart:ShoppingCart, cartItem:ICartItem, qty:number){
 
const itemInCart  = shoppingCart.items.find(i=>i.productId === cartItem.productId); 

if(itemInCart)
    itemInCart.quantity += qty;
else{
    cartItem.quantity = qty;
    shoppingCart.items.push(cartItem);
   }

   return shoppingCart;
}

private calculateShoppingCartSummary(){

  let shoppingCart = this.getCurrentShoppingCart();
  if(!shoppingCart)
  return;

let quantity = 0;
let subtotal = 0;

shoppingCart.items.forEach(i=>{ 
  quantity +=  i.quantity;
  subtotal += i.salesPrice * i.quantity;
})
let shipping = shoppingCart.shippingPrice;
let total = shipping + subtotal;

this._ShoppingCartSumaryObservable$.next({quantity:quantity, shipping:shipping, subtotal:subtotal, total:total});
}

private isProduct(item : ICartItem | IProduct): item is IProduct{
  if( (item as IProduct).categoryId !==undefined)
  return true;
  else
  return false;
}



}

