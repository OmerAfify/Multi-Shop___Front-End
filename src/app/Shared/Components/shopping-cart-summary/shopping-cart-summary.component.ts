import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/Shared/Services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html'
})
export class ShoppingCartSummaryComponent implements OnInit {

  constructor(public shoppingCartService:ShoppingCartService) { 

  }

  ngOnInit(): void {
  }

}
