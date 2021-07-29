import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
  providers: [DatePipe]
})
export class UpdateProductComponent implements OnInit {

  public product: Product = new Product();
  dateTime: Date = new Date();

  constructor(private service: ProductService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.product = new Product();
    this.dateTime = new Date();
  }
  
  public updateProduct(): void {
    this.service.updateProdcut(this.product).subscribe(result => {
      this.product = new Product();
      var pid = localStorage.getItem("updatePId");
      localStorage.removeItem("updatePId");
      alert(`Product updated with id ${pid}`);
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
