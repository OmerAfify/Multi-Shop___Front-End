import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ICartItem } from 'src/app/Shared/Interfaces/ICartItem';
import { FilteringObject } from 'src/app/Shared/Models/FilteringObject';
import { AccountService } from 'src/app/Shared/Services/AccountServices';
import { ProductService } from 'src/app/Shared/Services/ProductsService';
import { ShoppingCartService } from 'src/app/Shared/Services/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(public shoppingCartSerice: ShoppingCartService,
     public userService:AccountService, private router:Router, private productsService: ProductService) { }

  @ViewChild("search") search : ElementRef;

 
  onSearch(){
    console.log(this.search.nativeElement.value);
    this.router.navigate(["/Shop"]);

    var filter = this.productsService.filterObject$.value;
    filter.search = this.search.nativeElement.value; 
    this.productsService.filterObject$.next(filter);
    this.productsService.getProductsByFilteration(filter).subscribe();
    
 }
  
  ngOnInit(): void {
  
  }

  basketCount(cartItems:ICartItem[]){
    let Quantity = 0;   
    cartItems.forEach(i=>{
           Quantity += i.quantity;});
     return Quantity;
    }

    onLogout(){
      
      this.userService.logout();
    }

  

}
