import { Routes } from '@angular/router';
import {FormBebidaComponent} from "./form-bebida/form-bebida.component";
import {ListBebidaComponent} from "./list-bebida/list-bebida.component";
import {HomeBebidaComponent} from "./home-bebida/home-bebida.component";
import {VendaBebidaComponent} from "./venda-bebida/venda-bebida.component";


export const bebidaRoutes: Routes = [
  {
    path: "bebida",
    component: HomeBebidaComponent,
    children: [
      {
        path: "",
        component: ListBebidaComponent
      },
      {
        path: "desconto",
        component: VendaBebidaComponent
      },
      {
        path: "novo",
        component: FormBebidaComponent
      },
      {
        path: ":codigo",
        component: FormBebidaComponent
      }
    ]
  }]
