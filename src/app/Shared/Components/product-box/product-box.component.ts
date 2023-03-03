import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/Shared/Services/shopping-cart.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
 // styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {

  @Input() product:any;

  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
  
  
  
  }

  AddToCart(){
    this.shoppingCartService.addItemToBasket(this.product,1);
  }

}
