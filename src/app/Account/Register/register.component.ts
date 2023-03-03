import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/Shared/Services/AccountServices';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css']
})
export class RegisterComponent implements OnInit {


  ServerErrors: string [] | null  = null;

  public RegisterForm:FormGroup = new FormGroup(
  {
  
firstName : new FormControl(null),  
lastName : new FormControl(null),  
  email : new FormControl(null, [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  password : new FormControl(null, [Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")])
  })
  

  constructor(private accountService:AccountService, private router:Router) { }

  ngOnInit(): void {

  }

  onRegisterFormSubmit(){
    this.accountService.register(this.RegisterForm.value).subscribe(()=>{
    
      this.router.navigateByUrl("/Shop");
  
    }, error=>{
      this.ServerErrors = error.error.errors; 
    });
  }
  


}
