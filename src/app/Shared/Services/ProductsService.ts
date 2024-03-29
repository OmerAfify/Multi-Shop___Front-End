import { HttpClient } from "@angular/common/http";
import { Injectable , OnInit} from "@angular/core";
import { IProduct } from "../Interfaces/IProduct";
import { FilteringObject } from "../Models/FilteringObject";
import { IPagination } from "../Interfaces/IPagination";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn:'root'})
export class ProductService  implements OnInit {

    products:any;

    selectedCategory$ = new BehaviorSubject<number>(0);

    filterObject$ = new BehaviorSubject<FilteringObject>({
    });

     constructor(private http:HttpClient){

    }

    ngOnInit() {
     this.getAllProducts();
    }

    getAllProducts(){
        return this.http.get<IProduct[]>("https://localhost:44311/api/GetAllProducts")
    }

    getProductById(id:number){
        return this.http.get<IProduct>("https://localhost:44311/api/GetProductById/"+id);
    }

    
    getRelatedProducts(id:number){
        return this.http.get<IProduct>("https://localhost:44311/api/GetRelatedProductsByCategory?productId="+id);
    }
    

    getProductsByFilteration(filterObject:FilteringObject){
         return this.http.get<IPagination>(
             `https://localhost:44311/api/GetProductsByFiltration?requestParameters.PageNumber=${(filterObject.pageNumber!==undefined)?filterObject.pageNumber:1}`
             +`&requestParameters.PageSize=${(filterObject.pageSize!==undefined)?filterObject.pageSize:6}`  
             +`${(filterObject.sortBy!==undefined)?"&sortBy="+ filterObject.sortBy:""}`
             +`${(filterObject.categoryId!==undefined)?"&categoryId="+filterObject.categoryId:""}`
             +`${(filterObject.search!==undefined)?"&search="+filterObject.search:""}`          
         )    
    }


}

