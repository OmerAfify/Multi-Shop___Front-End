import { HttpClient } from "@angular/common/http";
import { Injectable , OnInit} from "@angular/core";
import { IProduct } from "../Interfaces/IProduct";
import { FilteringObject } from "../Models/FilteringObject";
import { IPagination } from "../Interfaces/IPagination";

@Injectable({providedIn:'root'})
export class ProductService  implements OnInit {

    products:any;
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
             `https://localhost:44311/api/GetProductsByFiltration?sortBy=${(filterObject.sortBy!==undefined)?filterObject.sortBy:null}`
             +`&categoryId=${(filterObject.categoryId!==undefined)?filterObject.categoryId:0}`
             +`&requestParam.PageNumber=${(filterObject.pageNumber!==undefined)?filterObject.pageNumber:1}`
             +`&requestParam.PageSize=${(filterObject.pageSize!==undefined)?filterObject.pageSize:6}`    
         )    
    }


}

