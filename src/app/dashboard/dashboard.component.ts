import {Component} from '@angular/core';
import {Observable} from "rxjs";
import {DashboardService} from "./dashboard.service";
import {Customer} from "./dashboard.models";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public data$: Observable<Customer[]> = this.dashboardService.data$;

  constructor(private readonly dashboardService: DashboardService, private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.dashboardService.setData(data['dashboard']);
    });
  }

  trackBy(index: number, item: Customer): number {
    return item.id;
  }

  getAddress(customer: Customer): string {
    return `${customer?.address?.city}, ${customer?.address?.street} ${customer?.address?.suite}, ${customer?.address?.zipcode}`;
  }

  addCustomer(): void {
    this.dashboardService.addCustomer();
  }

  editCustomer(customer: Customer): void {
    this.dashboardService.editCustomer(customer);
  }

  deleteCustomer(customer: Customer): void {
    this.dashboardService.deleteCustomer(customer);
  }
}
