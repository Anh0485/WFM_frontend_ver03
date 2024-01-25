import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  submitted = false;
  type: string = "password";
  isText: boolean = false;
  eyeIcon : string = "bi bi-eye-slash";
  loading = false;
  errorMessage : string = "";

  model: any = {};
  public loginForm!: FormGroup;
  inputValue: string = "";
  
  constructor(
    private _fb : FormBuilder,
    private LoginService: LoginService,
    private router: Router

  ) {
   }
   ngOnInit(){
    this.createForm();
   }

   private createForm(){
    this.loginForm =  this._fb.group({
      username:["", Validators.required],
      password:["", Validators.required]
    })
   }

   hideShowPass(){
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = "bi bi-eye"): (this.eyeIcon = "bi bi-eye-slash");
    this.isText ? (this.type = "text") : (this.type = "password");
   }

   loginUser(data:any){
    this.submitted = true;

    this.LoginService.login(data).subscribe({
      next:() => {
        this.router.navigate(["/dashboard"])
      },
      error:(e) => {
        this.errorMessage = e.error.message;
      }
    })
   }

}
