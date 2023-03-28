import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { IDeliveryMethods } from '../Interfaces/IDeliveryMethods';
import { IOrder, IOrderToCreate } from '../Interfaces/IOrder';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }

  getDeliveryMethods(){
     return this.http.get<IDeliveryMethods[]>("https://localhost:44311/api/GetDeliveryMethods");
    }

  createOrder(order :IOrderToCreate){
   return this.http.post<IOrder>("https://localhost:44311/api/CreateOrder", order);
  }

  getOrderById(id:number){
    return this.http.get<IOrder>("https://localhost:44311/api/GetUserOrderById/?orderId="+id)
  }

  getUsersOrders(){
    return this.http.get<IOrder[]>("https://localhost:44311/api/GetUserOrders")

  }


}
