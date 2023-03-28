import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ICartItem } from '../Interfaces/ICartItem';
import { IProduct } from '../Interfaces/IProduct';
import { IShoppingCartSummary } from '../Interfaces/IShoppingCartSummary';
import { IDeliveryMethods } from '../Interfaces/IDeliveryMethods';
import { ShoppingCart } from '../Models/ShoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }

 private _ShoppingCartObservable$ = new BehaviorSubject<null | ShoppingCart>(null);
ShoppingCartObservable = this._ShoppingCartObservable$.asObservable();

private _ShoppingCartSumaryObservable$ = new BehaviorSubject<null | IShoppingCartSummary>(null);
ShoppingCartSumaryObservable = this._ShoppingCartSumaryObservable$.asObservable();

private shippingPrice = 0;

//shipping Price Methods
setShippingPrice(delivery: IDeliveryMethods){

  this.shippingPrice = delivery.deliveryPrice;
  this.calculateShoppingCartSummary();


}


//Physical Shopping Cart Methods 
getShoppingCart(){

  let cart = localStorage.getItem("shoppingCart");

  if(cart!==null){
    this._ShoppingCartObservable$.next(JSON.parse(cart));
    this.calculateShoppingCartSummary();
  }else
    this._ShoppingCartObservable$.next(null);
}

setShoppingCart(shoppingCart:ShoppingCart){
localStorage.setItem("shoppingCart",JSON.stringify(shoppingCart));
this._ShoppingCartObservable$.next(shoppingCart);
this.calculateShoppingCartSummary();
}

getCurrentShoppingCart(){
  return this._ShoppingCartObservable$.value;
}

removeShoppingCart(){
  this._ShoppingCartObservable$.next(null);
  this._ShoppingCartSumaryObservable$.next(null);
  localStorage.removeItem("shoppingCart");
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
    this.removeShoppingCart();
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
let shipping = this.shippingPrice;
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

