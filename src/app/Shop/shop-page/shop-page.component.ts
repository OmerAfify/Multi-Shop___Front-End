import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
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
productsInPageCount:any;


FilterByPriceRange = [{name:"all", value:{min:0,max:0}},
 {name:"0 - 100", value:{min:0,max:100}}, {name:"100 - 300",value:{min:100,max:300}},
 {name:"300-500", value:{min:300,max:500}}, {name:"500 - ", value:{min:0,max:0}},]

FilterByPriceSelectedValues: any[] = [];
 

//ctor
constructor(private _productService:ProductService, private _categoryService : CategoryService) { }

//ngOninit
ngOnInit(): void {

  this.GetCategories();
  

  this._productService.filterObject$.subscribe((filterObject)=>{
  
    this.filterObject = filterObject;

    this.GetProductsFiltered(filterObject);
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
      this.productsInPageCount = products.data.length;
      this.productsList = products.data;
      this.totalProductsCount = products.count;
      }, error=>{console.log(error)}
    );
    }

    //EVENTS Responses
  OnSortChange(value1:any){
  let value = value1.target.value;

      if(value==null)
            return;

      this.filterObject.sortBy = value;
      this._productService.filterObject$.next(this.filterObject);
      this.GetProductsFiltered(this.filterObject);
    }

  OnCategoryIdSelected(categoryId:number){

    this.filterObject.categoryId = categoryId;
  
    this.filterObject.pageNumber=1;
    this.filterObject.pageSize=8;

    this._productService.filterObject$.next(this.filterObject);
    this.GetProductsFiltered(this.filterObject);
  }

  OnPaginationChange(event:any){
    if(this.filterObject.pageNumber!==event){
      this.filterObject.pageNumber = event;
      console.log("page value is changed to : "+event)
      this._productService.filterObject$.next(this.filterObject);
      this.GetProductsFiltered(this.filterObject)
    }
    }





    onCheckboxChange2(event:any){
      // console.log(event.target.checked);
      // console.log(event.target.value);

      if (event.target.checked) {
        this.FilterByPriceSelectedValues.push(event.target.value);
      } else {
        const index = this.FilterByPriceSelectedValues.indexOf(event.target.value);
        if (index >= 0) {
          this.FilterByPriceSelectedValues.splice(index, 1);
        }
      }
      console.log(this.FilterByPriceSelectedValues);
  
    }

    onCheckboxChange( isChecked: boolean, value: any) {

      if (isChecked) {
        this.FilterByPriceSelectedValues.push(value);
      } else {
        const index = this.FilterByPriceSelectedValues.indexOf(value);
        if (index >= 0) {
          this.FilterByPriceSelectedValues.splice(index, 1);
        }
      }

      console.log(this.FilterByPriceSelectedValues);
    }
  
}
