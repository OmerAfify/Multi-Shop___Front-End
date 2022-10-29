import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Pages-Components/home-page/home-page.component';
import { NotFound404PageComponent } from './Pages-Components/not-found404-page/not-found404-page.component';
import { ProductDetailsComponent } from './Pages-Components/product-details/product-details.component';
import { ShopPageComponent } from './Pages-Components/shop-page/shop-page.component';

const routes: Routes = [
{path:"Home", component:HomePageComponent},
{path:"Shop", component:ShopPageComponent},
{path:"productDetails/:id", component:ProductDetailsComponent},
{ path: '',   redirectTo: '/Home', pathMatch: 'full' }, // redirect to `first-component`
{ path: '**', component: NotFound404PageComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
