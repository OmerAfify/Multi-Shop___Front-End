import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Shared/Services/ProductsService';
declare var $ : any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})


export class ProductDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute, private _productService:ProductService) {

   }

 @Input() productId:any;
 product:any;

  ngOnInit(): void {

this.route.params.subscribe(params=>this.productId=params['id'])

this._productService.getProductById(this.productId).subscribe( (data)=>{
  console.log(data);
this.product = data;
} );

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


}
