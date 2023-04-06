import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/Shared/Services/shopping-cart.service';
import { IProduct } from '../../Interfaces/IProduct';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
 // styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {

  @Input() product:IProduct={
    productId: 0, productName: "", salesPrice: 0, categoryId: 0, categoryName: "",
    description: '', productImages:[]
  };

  constructor(private shoppingCartService:ShoppingCartService) { }

  ngOnInit(): void {
  
  }


  AddToCart(){
    this.shoppingCartService.addItemToBasket(this.product,1);
  }

}
