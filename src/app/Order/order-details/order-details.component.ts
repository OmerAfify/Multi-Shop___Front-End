import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IOrder } from 'src/app/Shared/Interfaces/IOrder';
import { CheckoutService } from 'src/app/Shared/Services/CheckoutService';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  orderId: number = 0;
  order:any;

constructor(private route:ActivatedRoute,  private checkoutService: CheckoutService) { }

  ngOnInit(): void {

this.route.params.subscribe((params:Params)=>{
  this.orderId = params['orderId'];
});

this.checkoutService.getOrderById(this.orderId).subscribe((order)=>{
      this.order = order;
    });


  }

}
