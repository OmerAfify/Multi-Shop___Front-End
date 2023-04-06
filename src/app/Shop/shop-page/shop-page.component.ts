import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Shared/Interfaces/ICategory';
import { IProduct } from 'src/app/Shared/Interfaces/IProduct';
import { FilteringObject } from 'src/app/Shared/Models/FilteringObject';
import { CategoryService } from 'src/app/Shared/Services/CategoryService';
import { ProductService } from 'src/app/Shared/Services/ProductsService';
import { ShoppingCartService } from 'src/app/Shared/Services/shopping-cart.service';

declare var $:any;

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit {

productsList:IProduct[]=[];

categoryList:ICategory[]=[];

sortOptions = [
  {name:'a to z', value:'aToZ'},
  {name:'z to a', value:'zToa'},
  {name:'Price: Low to High', value:'priceLtoH'},
  {name:'Price: High to Low', value:'priceHtoL'},
]

filterObject = new FilteringObject();

  constructor(private _productService:ProductService, private _categoryService : CategoryService) { }

  ngOnInit(): void {

    this.GetCategories();

    $(document).ready(function()  {
      let body = <HTMLDivElement> document.body;
      let script = document.createElement('script');
      script.innerHTML='';
      script.src="../../../assets/js/main.js";
      script.async=true;
      script.defer=true;
      body.appendChild(script);
      
    })

    this._productService.getAllProducts().subscribe((data)=>{
      console.log(data);
      this.productsList=data});

  }


  GetProductsFiltered(filterObject:FilteringObject){

    this._productService.getProductsByFilteration(filterObject).subscribe(
      (products)=>{
        console.log(products.data);
        this.productsList = products.data;
    //  this.totalProductsCount = data.count;
      }, error=>{console.log(error)}
    );
    }

    GetCategories(){
      this._categoryService.getAllCategories().subscribe((cats)=>{
        this.categoryList = [{categoryId:0 , categoryName: "All"}, ...cats];

      })
    }

    //EVENTS 

OnSortChange(value1:any ){
let value = value1.target.value;

    if(value==null)
          return;

    this.filterObject.sortBy = value;
    this.GetProductsFiltered(this.filterObject);
  }

  OnCategoryIdSelected(categoryId:number){
    this.filterObject.categoryId = categoryId;
    this.filterObject.pageNumber=1;
    this.filterObject.pageSize=6;
    this.GetProductsFiltered(this.filterObject);
  }

}
