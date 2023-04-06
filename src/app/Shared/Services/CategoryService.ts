import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../Interfaces/ICategory';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


  getAllCategories(){
    return this.http.get<ICategory[]>("https://localhost:44311/api/GetAllCategories")
  }

}
