import { Component, OnInit } from '@angular/core';
import { AccountService } from './Shared/Services/AccountServices';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'OnlineShop';


  constructor() {
    
    
  }


  ngOnInit(): void {
    }
    


}

