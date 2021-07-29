import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private basePath = 'https://localhost:44326/api/products';
  constructor(private http: HttpClient) { }

  public getProducts(): Observable<any> {
    return this.http.get(this.basePath);
  }

  public addProduct(product: any): Observable<any> {
    return this.http.post(this.basePath, product);
  }

  public updateProdcut(product: any): Observable<any>{
    var pid = localStorage.getItem("updatePId");
    console.log("hi : "+ pid);
    return this.http.put(`${this.basePath}/${pid}`, product);
  }

  public deleteProduct(productId: number): Observable<any>{
    return this.http.delete(`${this.basePath}/${productId}`);
  }

  public purchaseProduct(transaction: any): Observable<any>{
    return this.http.post(this.basePath+"/purchase", transaction);
  }

  public saleProduct(transaction: any): Observable<any>{
    return this.http.post(this.basePath+"/sale", transaction);
  }

  public transectionReport(isDaily: boolean, date: String): Observable<any>{
    if(isDaily){
      console.log(date);
      console.log(isDaily);
      return this.http.get(`${this.basePath}/report/daily/${date}`);
    }
    return this.http.get(`${this.basePath}/report/monthly/${date}`);
  }

}
