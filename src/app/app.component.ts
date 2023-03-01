import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './Shared/Services/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
 
  title = 'OnlineShop';


  constructor(private cartService:ShoppingCartService) {
    
  }


  ngOnInit(): void {

const basket = localStorage.getItem("shoppingCart");

if(basket!==null)
    this.cartService.getShoppingCart();

    }
    


}

