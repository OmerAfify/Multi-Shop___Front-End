import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Shared/Interfaces/ICategory';
import { IProduct } from 'src/app/Shared/Interfaces/IProduct';
import { FilteringObject } from 'src/app/Shared/Models/FilteringObject';
import { CategoryService } from 'src/app/Shared/Services/CategoryService';
import { ProductService } from 'src/app/Shared/Services/ProductsService';

declare var $:any;

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit {

//properties 
productsList:IProduct[]=[];
categoryList:ICategory[]=[];
sortOptions = [
  {name:'a to z', value:'aToZ'},
  {name:'z to a', value:'zToa'},
  {name:'Price: Low to High', value:'priceLtoH'},
  {name:'Price: High to Low', value:'priceHtoL'},
]


filterObject = new FilteringObject();

totalProductsCount:any;
 
//ctor
constructor(private _productService:ProductService, private _categoryService : CategoryService) { }

//ngOninit
ngOnInit(): void {

  this._productService.selectedCategory$.subscribe((currentCatId)=>{
    this.filterObject.categoryId = currentCatId;
    console.log("curenet selected cat id is "+ this._productService.selectedCategory$.value);
  })

  this.GetCategories();

  this.GetProductsFiltered(this.filterObject);
    
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

//method ngoninit calls
  GetProducts(){
    this._productService.getAllProducts().subscribe((data)=>{
      console.log(data);
      this.productsList=data});

  }

  GetCategories(){
      this._categoryService.getAllCategories().subscribe((cats)=>{
        this.categoryList = [{categoryId:0 , categoryName: "All"}, ...cats];

      })
    }

    //methods 
  GetProductsFiltered(filterObject:FilteringObject){

    this._productService.getProductsByFilteration(filterObject).subscribe(
      (products)=>{
        console.log(filterObject);
        console.log(products.data);
        this.productsList = products.data;
      this.totalProductsCount = products.count;
      }, error=>{console.log(error)}
    );
    }

    OnPaginationChange(event:any){
      if(this.filterObject.pageNumber!==event){
        this.filterObject.pageNumber = event;
        console.log("page value is changed to : "+event)
        this.GetProductsFiltered(this.filterObject)
      }
      }

    //EVENTS Responses
  OnSortChange(value1:any){
  let value = value1.target.value;

      if(value==null)
            return;

      this.filterObject.sortBy = value;
      this.GetProductsFiltered(this.filterObject);
    }

  OnCategoryIdSelected(categoryId:number){
    this.filterObject.categoryId = categoryId;

   this._productService.selectedCategory$.next(categoryId);

    this.filterObject.pageNumber=1;
    this.filterObject.pageSize=2;
    this.GetProductsFiltered(this.filterObject);
  }

}
