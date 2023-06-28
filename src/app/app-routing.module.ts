import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/home/home.component";
import {bebidaRoutes} from "./pages/bebidas/pages-routing.module";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [...bebidaRoutes]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
