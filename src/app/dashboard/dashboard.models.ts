import {CustomerFormValues} from "./customer-action-modal/customer-form.component";

interface Customer {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: number;
      lng: number;
    }
  },
  phone: string;
  website: string;
  company?: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

class CustomerFormsValuesToCustomerSerializer {
  public static formValuesToCustomerMapping(input: CustomerFormValues): Customer {
    const {
      name,
      userName,
      email,
      phone,
      street,
      suite,
      city,
      zipcode,
      website,
      companyName,
      companyBs,
      companyCatchPhrase
    } = input;

    return {
      name,
      username: userName,
      email,
      phone,
      website,
      address: {street, suite, city, zipcode, geo: {}},
      company: {
        name: companyName,
        catchPhrase: companyCatchPhrase,
        bs: companyBs
      }
    } as Customer;
  }

  public static customerToFormValuesMapping(input: Customer): CustomerFormValues {
    const {name, username, website, company, email, address, id, phone} = input;
    return {
      name,
      email,
      phone,
      userName: username,
      website,
      street: address!.street,
      suite: address!.suite,
      companyName: company!.name,
      companyBs: company!.bs,
      companyCatchPhrase: company!.catchPhrase,
      city: address!.city,
      zipcode: address!.zipcode
    };
  }
}

export {
  Customer,
  CustomerFormsValuesToCustomerSerializer
};
