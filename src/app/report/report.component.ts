import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  providers: [DatePipe]
})
export class ReportComponent implements OnInit {

  dateTime: Date = new Date();
  constructor(private service: ProductService, private router: Router, private datePipe: DatePipe) { }

  typeOfReport: any;
  dateForReport: any;
  public transactions : any;

  ngOnInit(): void {
    this.dateForReport = localStorage.getItem('dateForReport');
    this.typeOfReport = localStorage.getItem('typeOfReport');
    localStorage.removeItem('dateForReport');
    localStorage.removeItem('typeOfReport');
    this.getTransections(this.typeOfReport, this.dateForReport);
    this.dateTime = new Date();
  }

  private getTransections(type: any, date: any): void{
    if(type == "daily"){
      this.service.transectionReport(true, date).subscribe(result => {
        this.transactions = result;
      });
    }
    else if(type == "monthly"){
      this.service.transectionReport(false, date).subscribe(result => {
        this.transactions = result;
      });
    }
    else{
      this.transactions = null;
    }
  }

  public logout(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('email');
    this.router.navigate([""]);
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
      this.ngOnInit();
    }
    else{
      alert(`Date not chosen`);
      this.dateTime = new Date();
    }
    
  }

}
