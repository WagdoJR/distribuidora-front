import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListBebidaComponent} from "./list-bebida/list-bebida.component";
import {HomeBebidaComponent} from "./home-bebida/home-bebida.component";
import {FormBebidaComponent} from "./form-bebida/form-bebida.component";
import {RouterModule} from "@angular/router";
import {bebidaRoutes} from "./pages-routing.module";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { VendaBebidaComponent } from './venda-bebida/venda-bebida.component';

@NgModule({
  declarations: [
    ListBebidaComponent,
    HomeBebidaComponent,
    FormBebidaComponent,
    VendaBebidaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(bebidaRoutes),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule
  ]
})
export class BebidasModule { }
