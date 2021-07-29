import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoggedUser } from '../models/loggedUser';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [DatePipe]
})
export class HomePageComponent implements OnInit {

  user: LoggedUser = new LoggedUser();
  logged: boolean = false;
  dateTime: Date = new Date();
  constructor(private router: Router, private jwtHelper: JwtHelperService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.logged = this.isUserAuthenticated();
    this.dateTime = new Date();
  }

  public isUserAuthenticated(){
    const token = localStorage.getItem("jwt");
    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    return false;
  }

  public logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    this.logged=false;
    this.router.navigate([""]);
  }

  public login(): void{
    this.router.navigate(["/login"]);
  }

  public addProduct(): void{
    this.router.navigate(["/add"]); 
  }

  public allProducts():void{
    this.router.navigate(["/products"]);
  }

  public goToHomePage():void{
    this.router.navigate([""]);
  }

  public trnasectionReport(isDaily: boolean): void{
    const date = this.datePipe.transform(this.dateTime, 'yyyy-MM-dd')
    console.log(date);
    if(date != null) {
      localStorage.removeItem('dateForReport');
      localStorage.setItem('dateForReport', date);
      if(isDaily){
        var daily = "daily";
        localStorage.removeItem('typeOfReport');
        localStorage.setItem('typeOfReport', daily);
      }
      else{
        var monthly = "monthly";
        localStorage.removeItem('typeOfReport');
        localStorage.setItem('typeOfReport', monthly);
      }
      this.router.navigate(["/report"]);
    }
    else{
      alert(`Date not chosen`);
      this.dateTime = new Date();
    }
    
  }

}
