import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './Pages-Components/home-page/home-page.component';
import { HeaderComponent } from './Elements-Components/header/header.component';
import { FooterComponent } from './Elements-Components/footer/footer.component';
import { ShopPageComponent } from './Pages-Components/shop-page/shop-page.component';
import { ProductBoxComponent } from './Elements-Components/product-box/product-box.component';
import { AccountService } from './Shared/Services/AccountServices';
import { ProductService } from './Shared/Services/ProductsService';
import { ProductDetailsComponent } from './Pages-Components/product-details/product-details.component';
import { NotFound404PageComponent } from './Pages-Components/not-found404-page/not-found404-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    ShopPageComponent,
    ProductBoxComponent,
    ProductDetailsComponent,
    NotFound404PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
