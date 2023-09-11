import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer, CustomerFormsValuesToCustomerSerializer} from "../dashboard.models";

interface CustomerFormValues {
  name: string;
  userName: string;
  email: string;
  phone: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  website: string;
  companyName: string;
  companyBs: string;
  companyCatchPhrase: string;
}

@Component({
  selector: 'app-customer-action-modal',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
class CustomerFormComponent {
  public form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    userName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    street: ['', [Validators.required]],
    suite: [''],
    city: [''],
    zipcode: [''],
    website: [''],
    companyName: [''],
    companyCatchPhrase: [''],
    companyBs: ['']
  });


  constructor(private readonly fb: FormBuilder) {
  }

  getFormControl(name: string): AbstractControl {
    return this.form.get(name) as AbstractControl;
  }

  setFormData(customer: Customer): void {
    const {
      name,
      userName,
      companyName,
      companyBs,
      companyCatchPhrase,
      street,
      phone,
      email,
      city,
      zipcode,
      suite,
      website
    } = CustomerFormsValuesToCustomerSerializer.customerToFormValuesMapping(customer);

    this.form = this.fb.group({
      name: [name, [Validators.required]],
      userName: [userName, [Validators.required]],
      email: [email, [Validators.required]],
      phone: [phone, [Validators.required]],
      street: [street, [Validators.required]],
      suite: [suite],
      city: [city],
      zipcode: [zipcode],
      website: [website],
      companyName: [companyName],
      companyCatchPhrase: [companyCatchPhrase],
      companyBs: [companyBs]
    });
  }
}

export {CustomerFormValues, CustomerFormComponent};
