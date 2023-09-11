import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {NzModalRef, NzModalService} from "ng-zorro-antd/modal";
import {CustomerFormComponent} from "./customer-action-modal/customer-form.component";
import {Customer, CustomerFormsValuesToCustomerSerializer} from "./dashboard.models";
import * as _ from "lodash";

@Injectable()
class DashboardService {
  private dataSubject: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);

  public data$: Observable<Customer[]> = this.dataSubject.asObservable();

  constructor(private readonly modalService: NzModalService) {
  }

  public setData(customers: Customer[]): void {
    this.dataSubject.next(customers);
  }

  public addCustomer(): void {
    const modalRef: any = this.modalService.create({
      nzTitle: 'Add Customer',
      nzContent: CustomerFormComponent,
      nzFooter: [
        {
          label: 'Cancel',
          onClick: () => modalRef.close()
        },
        {
          label: 'Submit',
          type: 'primary',
          onClick: () => this.submitClickHandler(modalRef, false)
        }
      ],
    });
  }

  public submitClickHandler(modalRef: NzModalRef, editMode: boolean, id?: number): void {
    const formInstance = modalRef.getContentComponent() as CustomerFormComponent;

    Object.values(formInstance.form.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({onlySelf: true});
      }
    });

    if (formInstance.form.valid) {
      const customer: Customer = CustomerFormsValuesToCustomerSerializer.formValuesToCustomerMapping(formInstance.form.value);

      if (editMode) {
        this.updateCustomer(customer, id as number);
      } else {
        this.createCustomer(customer);
      }

      modalRef.close();
    }
  }

  public deleteCustomer(customer: Customer): void {
    const data = this.dataSubject.value;
    const customers: Customer[] = data.filter(c => c.id !== customer?.id);

    this.setData(customers);
  }

  public editCustomer(customer: Customer): void {
    const modalRef: any = this.modalService.create({
      nzTitle: 'Edit Customer',
      nzContent: CustomerFormComponent,
      nzFooter: [
        {
          label: 'Cancel',
          onClick: () => modalRef.close()
        },
        {
          label: 'Submit',
          type: 'primary',
          onClick: () => this.submitClickHandler(modalRef, true, customer.id)
        }
      ],
    });

    const formInstance = modalRef.getContentComponent() as CustomerFormComponent;

    formInstance.setFormData(customer);
  }

  private createCustomer(customer: Customer): void {
    const data = this.dataSubject.value;

    const biggestId = data.reduce((maxId, item) => {
      return item.id > maxId ? item.id : maxId;
    }, -1);

    const newCustomer: Customer = {...customer, id: biggestId + 1} as Customer;

    this.setData([newCustomer, ...data]);
  }

  private updateCustomer(customer: Customer, id: number): void {
    const data: Customer[] = [...this.dataSubject.value];
    const prev = data.find(value => value.id === id);

    if(_.isEqual(prev, customer)){
      return;
    }

    const indexToReplace = data.findIndex(item => item.id === id);

    if (indexToReplace !== -1) {
      data.splice(indexToReplace, 1, customer);
    }

    this.setData(data);
  }
}

export {DashboardService};
