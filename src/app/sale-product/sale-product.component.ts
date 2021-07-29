import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../models/transaction';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-sale-product',
  templateUrl: './sale-product.component.html',
  styleUrls: ['./sale-product.component.scss'],
  providers: [DatePipe]
})
export class SaleProductComponent implements OnInit {

  dateTime: Date = new Date();
  constructor(private service: ProductService, private router: Router, private datePipe: DatePipe) { }

  public transaction: Transaction = new Transaction();

  ngOnInit(): void {
    this.transaction = new Transaction();
    this.dateTime = new Date();
  }

  public saleProduct(): void {
    this.transaction.Type = "sale";
    this.service.saleProduct(this.transaction).subscribe(result =>{
      alert(`Product sale with id ${this.transaction.ProductId}`);
      this.transaction = new Transaction();
      this.router.navigate(["products"]);
    });
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
      this.router.navigate(["/report"]);
    }
    else{
      alert(`Date not chosen`);
      this.dateTime = new Date();
    }
    
  }
}
