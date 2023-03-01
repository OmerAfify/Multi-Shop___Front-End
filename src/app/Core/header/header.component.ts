import { Component, OnInit } from '@angular/core';
import { ICartItem } from 'src/app/Shared/Interfaces/ICartItem';
import { ShoppingCartService } from 'src/app/Shared/Services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(public shoppingCartSerice: ShoppingCartService) { }

  
  ngOnInit(): void {
  
  }

  basketCount(cartItems:ICartItem[]){
    let Quantity = 0;   
    cartItems.forEach(i=>{
           Quantity += i.quantity;});
     return Quantity;
    }

  

}
