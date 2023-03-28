import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/Shared/Interfaces/IOrder';
import { CheckoutService } from 'src/app/Shared/Services/CheckoutService';

@Component({
  selector: 'app-users-orders',
  templateUrl: './users-orders.component.html',
  styleUrls: ['./users-orders.component.css']
})
export class UsersOrdersComponent implements OnInit {

Orders:IOrder[]=[];

  constructor(private checkout: CheckoutService, private router:Router) {
 
   }

  ngOnInit(): void {  
    this.loadUsersOrders();
  }

loadUsersOrders(){
  this.checkout.getUsersOrders().subscribe((orders:IOrder[])=>{
    this.Orders = orders
 })
}

viewOrderDetails(id:number){
    this.router.navigate(["/OrderDetails",id])
      
}

}
