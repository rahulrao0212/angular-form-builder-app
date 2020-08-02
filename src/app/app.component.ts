import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-form-builder-app';
  contactForm;

  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      isMarried: ['', [Validators.required]],
      country: ['', [Validators.required]],
      address: this.formBuilder.group({
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        pincode: ['', [Validators.required]],
      })
    });
  }

  ngOnInit() {
    this.setDefault();

    //Status change (emitEvent and onlySelf)
    this.contactForm.get("firstname").statusChanges.subscribe(newStatus=> {
      console.log('firstname status changed')
      console.log(newStatus)
      console.log(this.contactForm.get("firstname").status)
      console.log(this.contactForm.status)
      
      setTimeout(() => {
        console.log(this.contactForm.status)
      })
      
    })
 
    this.contactForm.get("address").statusChanges.subscribe(newStatus=> {
      console.log('address status changed')
      console.log(newStatus)
    })
 
    this.contactForm.statusChanges.subscribe(newStatus=> {
      console.log('form status changed')
      console.log(newStatus)
    })

    //Value change (emitEvent and onlySelf)
    this.contactForm.get("firstname").valueChanges.subscribe(selectedValue => {
      console.log('firstname value changed')
      console.log(selectedValue)
      console.log(this.contactForm.get("firstname").value)
      console.log(this.contactForm.value)
      
      setTimeout(() => {
        console.log(this.contactForm.value)
      })
      
    })
 
    this.contactForm.get("address").valueChanges.subscribe(selectedValue => {
      console.log('address changed')
      console.log(selectedValue)
    })
 
    this.contactForm.valueChanges.subscribe(selectedValue => {
      console.log('form value changed')
      console.log(selectedValue)
    })
  }

  setDefault() {

    let contact = {
      firstname: "Sachin",
      lastname: "Tendulkar",
      email: "sachin@gmail.com",
      gender: "male",
      isMarried: true,
      country: "2",
      address: {
        city: "Mumbai",
        street: "Perry Cross Rd",
        pincode: "400050"
      }
    };

    this.contactForm.setValue(contact);
  }

  countryList: country[] = [
    new country("1", "India"),
    new country('2', 'USA'),
    new country('3', 'England')
  ];

  changeAddress() {

    let address = {
      city: "Bangalore",
      street: "M.G Road",
      pincode: "600070",
    };

    this.contactForm.get("address").setValue(address);

  };

  patchAddress() {
    let address = {
      city: "Mangalore",
      pincode: "575022",
    };

    this.contactForm.get("address").patchValue(address);
  }

  onSubmit() {
    console.log(this.contactForm.value);
  }

  get firstname() {
    return this.contactForm.get('firstname');
  }

  get lastname() {
    return this.contactForm.get('lastname');
  }

  get email() {
    return this.contactForm.get('email');
  }

  get gender() {
    return this.contactForm.get('gender');
  }

  get isMarried() {
    return this.contactForm.get('isMarried');
  }

  get country() {
    return this.contactForm.get('country');
  }

  get city() {
    return this.contactForm.get("address").get('city');
  }

  get street() {
    return this.contactForm.get("address").get('street');
  }

  get pincode() {
    return this.contactForm.get("address").get('pincode');
  }
}

export class country {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
