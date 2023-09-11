import {NgModule} from '@angular/core';
import {DashboardComponent} from "./dashboard.component";
import {Route, RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzButtonModule} from "ng-zorro-antd/button";
import {CustomerFormComponent} from "./customer-action-modal/customer-form.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzModalModule} from "ng-zorro-antd/modal";
import {DashboardService} from "./dashboard.service";
import {DashboardResolver} from "./dashboard.resolver";

const DASHBOARD_MODULE: Route[] = [
  {
    path: '',
    component: DashboardComponent,
    resolve: {
      dashboard: DashboardResolver
    }
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    CustomerFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DASHBOARD_MODULE),
    NzCardModule,
    FormsModule,
    ReactiveFormsModule,
    NzModalModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
  ],
  providers: [DashboardService],
  exports: [RouterModule]
})
export class DashboardModule { }
