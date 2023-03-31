import { Component, OnInit } from '@angular/core';
import { AccountService } from './Shared/Services/AccountServices';
import { ShoppingCartService } from './Shared/Services/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
 
  title = 'OnlineShop';


  constructor(private cartService:ShoppingCartService, private user:AccountService) {
    
  }


  ngOnInit(): void {

    this.loadCurrentBasket();
    
    this.loadCurrentUser();

    }

    loadCurrentBasket(){
      const basketId = localStorage.getItem("shoppingCartId");

      if(basketId!==null)
          this.cartService.getShoppingCart(basketId);
      
    }
    
  loadCurrentUser(){
    
      let token = localStorage.getItem("token");
      this.user.loadCurrentUser(token).subscribe();
    
    }

}

