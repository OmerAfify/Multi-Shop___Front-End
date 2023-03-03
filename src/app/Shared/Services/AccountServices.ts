import { HttpClient, HttpHeaders } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, of, ReplaySubject } from "rxjs";
import { map } from "rxjs/operators";
import { IUser } from "../Interfaces/IUser";


@Injectable({providedIn:'root'})

export class AccountService{

    private baseUrl = "https://localhost:44311/api/";


    private _userObservable = new ReplaySubject<IUser | null>(1);
    public  userObservable$ =  this._userObservable.asObservable();
      
 constructor(private http:HttpClient, private router: Router) {

    }


loadCurrentUser(token:string | null){

  if(token === null){
    this._userObservable.next(null);
    return of(null);
  }

let headers = new HttpHeaders();

headers = headers.set("Authorization",`Bearer ${token}`)

return this.http.get<IUser>(this.baseUrl+"GetCurrentUser",{headers} )
.pipe(map(user=>{ 
  if(user){
    this._userObservable.next(user);
    localStorage.setItem("token",user.token);
    return user;
  }else{
    return null;
  }
 
}))
}


login(userData :{email:string,password:string} ){
    return this.http.post<IUser>(this.baseUrl+"Login",userData).pipe( map( (user:IUser)=>{

        this._userObservable.next(user);
        localStorage.setItem("token", user.token);

    } ) );
}

register(userData:any){
    return this.http.post<IUser>(this.baseUrl+"Register",userData).pipe( map( (user:IUser)=>{

        this._userObservable.next(user);
        localStorage.setItem("token", user.token);

    

    } ) );
}

logout(){
    localStorage.removeItem("token");
    this._userObservable.next(null);
    this.router.navigateByUrl("/Home");
    
}



}