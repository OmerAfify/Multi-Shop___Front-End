import { Component, OnInit } from '@angular/core';
import { ICartItem } from 'src/app/Shared/Interfaces/ICartItem';
import { ShoppingCart } from 'src/app/Shared/Models/ShoppingCart';
import { ShoppingCartService } from 'src/app/Shared/Services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public shoppingCartSerice:ShoppingCartService) { }

  ngOnInit(): void {
  }


onDecrementItem(productId:number, quantity:number){
this.shoppingCartSerice.removeItemFromBasket(productId,quantity);
}


onIncrementItem(item:ICartItem){
this.shoppingCartSerice.addItemToBasket(item);
}

onQuantityChange(item:ICartItem ,event:any){

  if(event.target.value <= 0 )
  this.shoppingCartSerice.removeItemFromBasket(item.productId,item.quantity);



let difference = event.target.value - item.quantity;

if(difference==0) return;

if(difference<0) 
    this.shoppingCartSerice.removeItemFromBasket(item.productId, difference * -1);
else
    this.shoppingCartSerice.addItemToBasket(item,difference);
}


}
