import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICartItem } from 'src/app/Shared/Interfaces/ICartItem';
import { IProduct } from 'src/app/Shared/Interfaces/IProduct';
import { ProductService } from 'src/app/Shared/Services/ProductsService';
import { ShoppingCartService } from 'src/app/Shared/Services/shopping-cart.service';
declare var $ : any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})


export class ProductDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute,
     private _productService:ProductService,
     private _shoppingCartService: ShoppingCartService
   ) {

   }

 @Input() productId:any;
 product:any;
 relatedProducts:any;

  ngOnInit(): void {

this.route.params.subscribe((params)=>{this.productId=params['id'];

this._productService.getProductById(this.productId).subscribe( (data : IProduct)=>{
  this.product = data;
  } );
  
  this._productService.getRelatedProducts(this.productId).subscribe((relProds)=>{
    this.relatedProducts = relProds;
  })
  
})

$(document).ready(function()  {
  let body = <HTMLDivElement> document.body;
  let script = document.createElement('script');
  script.innerHTML='';
  script.src="../../../assets/js/main.js";
  script.async=true;
  script.defer=true;
  body.appendChild(script);
})


}

onAddToCart(product:IProduct){

  this._shoppingCartService.addItemToBasket(product,1);
}


}
