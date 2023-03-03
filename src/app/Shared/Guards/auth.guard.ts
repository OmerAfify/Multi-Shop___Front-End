import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from '../Services/AccountServices';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private user:AccountService, private route:Router){

  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>{
  
  return this.user.userObservable$.pipe(map(data=>{

    if(data==null){
         this.route.navigate(["/Login"],{queryParams: {returnUrl : state.url}});
        return false;
        }
        else
          return true;
  }));
  
  }
  
}
