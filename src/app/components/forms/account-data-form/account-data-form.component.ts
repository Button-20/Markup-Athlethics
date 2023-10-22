import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CountryISO,
  PhoneNumberFormat,
  SearchCountryField,
} from 'ngx-intl-telephone-input';
import { User } from 'src/app/services/core/IApp';
import { GlobalsService } from 'src/app/services/core/globals';

@Component({
  selector: 'account-data-form',
  templateUrl: './account-data-form.component.html',
  styleUrls: ['./account-data-form.component.scss'],
})
export class AccountDataFormComponent {
  @Input() user: User | null = null;

  @Input() editable: boolean = false;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter<any>();

  accountForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    educational_level: new FormControl('', [Validators.required]),
    institution_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    country: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    status: new FormControl('1'),
    institution_id: new FormControl(''),
  });

  CountryISO = CountryISO;
  SearchCountryField = SearchCountryField;
  PhoneNumberFormat = PhoneNumberFormat;
  separateDialCode = false;

  educational_levels = [
    'Primary Education',
    'Middle School or Junior High School',
    'Secondary Education',
    'Tertiary Education',
    'Vocational and Technical Education',
  ];

  files: any[] = [];

  constructor(public globals: GlobalsService) {}

  ngOnInit() {
    if (this.user) {
      this.accountForm.patchValue({
        name: this.user.name,
        institution_name: this.user.institution_name,
        email: this.user.email,
        country: this.user.country,
        phone: this.user.phone,
        status: this.user.status,
      });
      setTimeout(() => {
        this.setPhoneInput(this.user?.phone || '');
      }, 100);
    }
    if (this.user?.user_type == '2') {
      this.accountForm.controls['educational_level'].setValidators(null);
    }
  }

  setPhoneInput(phone: string) {
    let phoneInput = document.querySelector('#phone') as HTMLInputElement;
    if (phoneInput && phone) {
      phoneInput.value = phone.substring(phone.indexOf(' ') + 1);
      phoneInput.disabled = true;
    }
  }

  submit() {
    if (this.accountForm.invalid) {
      return;
    }
    this.onSubmit.emit(this.accountForm.value);
  }

  onPhoneNumberChange(event: any) {
    this.accountForm.patchValue({
      phone: '+' + event.dialCode + ' ' + event.phoneNumber,
    });
  }

  toggleSelectMenu(event: any, closeOnSelect: boolean = true) {
    // close other dropdown options
    event.preventDefault();
    let mainElement = event.target;
    const element = document.querySelectorAll('.select-list');
    element.forEach((el) => {
      if (
        el.classList.contains('active') &&
        el !== mainElement.nextElementSibling &&
        closeOnSelect
      ) {
        el.classList.remove('active');
      }
    });

    if (mainElement.nodeName !== 'BUTTON') mainElement = mainElement.parentNode;

    // add show class to dropdown options
    for (let i = 0; i < mainElement.children.length; i++) {
      if (mainElement.children[i].classList.contains('select-list')) {
        mainElement.children[i].classList.toggle('active');
      }
    }

    if (closeOnSelect) {
      // close dropdown options when click outside
      document.addEventListener('mousedown', (e: any) => {
        if (!e.target?.classList.contains('select-item')) {
          element.forEach((el) => {
            if (el.classList.contains('active')) {
              el.classList.remove('active');
            }
          });
        }
      });
    }
  }

  selectItem(item: string, type: string) {
    const formControl = this.accountForm.get(type) as FormControl;
    formControl.setValue(item);
  }

  dropImage(event: any) {
    event.preventDefault();
    event.stopPropagation();
    this.files = [...(event.dataTransfer?.files || event.target.files)];

    this.accountForm.patchValue({
      institution_id: this.files,
    });
  }

  removeFile(e: any, index: number) {
    e.preventDefault();
    this.files.splice(index, 1);
    this.accountForm.patchValue({
      institution_id: this.files,
    });
  }

  onDragOver(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }

  get name() {
    return this.accountForm.get('name') as FormControl;
  }

  get institution_name() {
    return this.accountForm.get('institution_name') as FormControl;
  }

  get email() {
    return this.accountForm.get('email') as FormControl;
  }

  get country() {
    return this.accountForm.get('country') as FormControl;
  }

  get phone() {
    return this.accountForm.get('phone') as FormControl;
  }
}
