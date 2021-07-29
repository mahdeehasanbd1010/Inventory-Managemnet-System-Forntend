import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { JwtModule } from '@auth0/angular-jwt';
import { UpdateProductComponent } from './update-product/update-product.component';
import { PurchaseProductComponent } from './purchase-product/purchase-product.component';
import { SaleProductComponent } from './sale-product/sale-product.component';
import { DatePipe } from '@angular/common';
import { ReportComponent } from './report/report.component';

export function tokenGetter(){
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    AllProductsComponent,
    AddProductComponent,
    LoginComponent,
    HomePageComponent,
    UpdateProductComponent,
    PurchaseProductComponent,
    SaleProductComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:44326"],
        disallowedRoutes: []

      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
