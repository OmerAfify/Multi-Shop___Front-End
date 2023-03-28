import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  constructor(private route:ActivatedRoute, private router:Router ) { }

  orderId:number = 0;

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params["orderId"];
  }
  
  viewOrder(){
this.router.navigate(["/OrderDetails",this.orderId])
  }

}
