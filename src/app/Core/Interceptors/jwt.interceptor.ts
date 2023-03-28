import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/Shared/Services/AccountServices';
import { take } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  token?:string
  constructor(private accountService: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  
    this.accountService.userObservable$.pipe(take(1)).subscribe((user)=>{
      this.token = user?.token;
    })
  
if(this.token){
  request = request.clone(
    {
      setHeaders:{Authorization :`Bearer ${this.token}`}
    }
  );
}

    return next.handle(request);
  }
}
