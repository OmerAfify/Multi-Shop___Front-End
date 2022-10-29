import { HttpClient } from "@angular/common/http";
import { Injectable , OnInit} from "@angular/core";

@Injectable()
export class ProductService  implements OnInit {

    products:any;
     constructor(private http:HttpClient){

    }

    ngOnInit() {
     this.getAllProducts();
    }

    getAllProducts(){
        return this.http.get("https://localhost:44311/api/GetAllProducts")
    }

    getProductById(id:number){
        return this.http.get("https://localhost:44311/api/GetProductById/"+id)
    }


}

