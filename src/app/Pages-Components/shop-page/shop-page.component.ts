import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Shared/Services/ProductsService';

declare var $:any;

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit {

productsList:any;

  constructor(private _productService:ProductService) { }

  ngOnInit(): void {

    $(document).ready(function()  {
      let body = <HTMLDivElement> document.body;
      let script = document.createElement('script');
      script.innerHTML='';
      script.src="../../../assets/js/main.js";
      script.async=true;
      script.defer=true;
      body.appendChild(script);
      
    })

    this._productService.getAllProducts().subscribe((data)=>this.productsList=data);


  }

}
