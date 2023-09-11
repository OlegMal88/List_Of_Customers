import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "./dashboard.models";

@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<any> {
  constructor(private readonly http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.getCustomers();
  }

  private getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>('https://jsonplaceholder.typicode.com/users');
  }
}
