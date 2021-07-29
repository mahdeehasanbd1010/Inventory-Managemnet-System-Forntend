import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AuthGuardService } from './auth-guard.service';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { PurchaseProductComponent } from './purchase-product/purchase-product.component';
import { ReportComponent } from './report/report.component';
import { SaleProductComponent } from './sale-product/sale-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';

const routes: Routes = [
  {path: 'products', component: AllProductsComponent, canActivate: [AuthGuardService]},
  {path: 'add', component: AddProductComponent, canActivate: [AuthGuardService] },
  {path: 'update', component: UpdateProductComponent, canActivate: [AuthGuardService] },
  {path: 'purchase', component: PurchaseProductComponent, canActivate: [AuthGuardService] },
  {path: 'sale', component: SaleProductComponent, canActivate: [AuthGuardService] },
  {path: 'report', component: ReportComponent, canActivate: [AuthGuardService] },
  {path: 'login', component: LoginComponent},
  {path: '', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
