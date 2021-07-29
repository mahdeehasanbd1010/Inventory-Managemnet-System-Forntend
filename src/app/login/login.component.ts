import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  invalidInput: boolean = false;
  invalidSignUp: boolean = true;
  user: User = new User();

  constructor(private router: Router, private service: AuthenticationService) { }

  ngOnInit(): void {
    this.user = new User();
  }

  public loginToServer(): void{
    this.service.loginToTheServer(this.user).subscribe(result => {
      this.user = new User();
      const token = result.token;
      const email = result.email;
      localStorage.setItem("jwt", token);
      localStorage.setItem('email', email);
      this.invalidLogin = false;
      this.router.navigate([""]);
    }, error => {
      this.user = new User();
      this.invalidLogin = true;
    });
  }

  public signUpToServer(): void{
    this.service.signUpToTheServer(this.user).subscribe(result => {
      this.user = new User();
      if(result)
        this.invalidInput = false;
        this.invalidSignUp = false;
    }, error => {
      console.log("error")
      this.user = new User();
      this.invalidInput = true;
      this.invalidSignUp = true;
    });
  }
  

}
