import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

/*****************WEBSITE COMPONENTS*********************/ 

import { CoreModule } from './Core/core.module';
import { SharedModule } from './Shared/shared.module';
import { ShopModule } from './Shop/shop.module';
import { ShoppingCartModule } from './ShoppingCart/shopping-cart.module';
import { HomeModule } from './Home/home.module';
import { AccountModule } from './Account/account.module';
import { ErrorsModule } from './Errors/errors.module';
import { OrderModule } from './Order/order.module';
import { JwtInterceptor } from './Core/Interceptors/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    ErrorsModule,
    AccountModule,
    ShopModule,
    HomeModule,
    ShoppingCartModule,
    OrderModule,

    SharedModule,
    CoreModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
