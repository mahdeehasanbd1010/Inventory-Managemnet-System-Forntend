import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
  providers: [DatePipe]
})
export class AllProductsComponent implements OnInit {

  public products: any;
  dateTime: Date = new Date();

  constructor(private service: ProductService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getProducts();
    this.dateTime = new Date();
  }

  private getProducts(): void {
    this.service.getProducts().subscribe(result => {
      this.products = result;
    });
  }

  public deleteProduct(productId: number): void{
    this.service.deleteProduct(productId).subscribe(reposne => {
      this.getProducts();
    })
  }

  public updateProduct(productId: any): void{
    localStorage.removeItem("updatePId");
    localStorage.setItem("updatePId",productId);
    this.router.navigate(["update"]);
  }
  
  public prchaseProduct(): void{
    this.router.navigate(["purchase"]);
  }

  public saleProduct(): void{
    this.router.navigate(["sale"]);
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

  public goToHomePage(): void{
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



