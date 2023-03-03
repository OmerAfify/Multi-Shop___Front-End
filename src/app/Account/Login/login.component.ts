import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AccountService } from 'src/app/Shared/Services/AccountServices';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl:string = "";

  constructor(private accountService:AccountService,
    private router : Router,
     private  activatedRoute: ActivatedRoute) {
    this.returnUrl = activatedRoute.snapshot.queryParams['returnUrl'] || '/Shop';
   }

  ngOnInit(): void {
  }

ServerErrors: string [] | null  = null;

public LoginForm:FormGroup = new FormGroup(
{
email : new FormControl(null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
password : new FormControl(null, [Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")])
})

onLoginFormSubmit(){
  this.accountService.login(this.LoginForm.value).subscribe(()=>{
  
  this.router.navigateByUrl(this.returnUrl);

  }, error=>{
    this.ServerErrors = error.error.errors; 
  });
}


}
