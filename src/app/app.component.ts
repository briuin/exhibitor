import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addMultipleExhibitors,
  loadCompanies,
  loadProvinces,
} from './exhibitor/store/exhibitor.actions';
import {
  selectCompanies,
  selectProvinces,
} from './exhibitor/store/exhibitor.selectors';
import { CommonModule } from '@angular/common';
import { UiButtonComponent } from './ui/ui-button/ui-button.component';
import { AddExhibitorHttpRequest } from './exhibitor/exhibitor.model';
import { map, Observable } from 'rxjs';
import { UiCardComponent } from './ui/ui-card/ui-card.component';
import { UiRadioComponent } from './ui/ui-radio/ui-radio.component';
import { UiSelectComponent } from './ui/ui-select/ui-select.component';
import { UiDividersComponent } from './ui/ui-dividers/ui-dividers.component';
import { UiInputComponent } from './ui/ui-input/ui-input.component';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EventType } from './models/event-type.model';
import { UiRadioGroupComponent } from './ui/ui-radio-group/ui-radio-group.component';
import { SelectOption } from './models/select-option.model';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    UiButtonComponent,
    UiCardComponent,
    UiRadioComponent,
    UiRadioGroupComponent,
    UiDividersComponent,
    UiSelectComponent,
    UiInputComponent,
    ReactiveFormsModule,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  companiesOptions$!: Observable<SelectOption[]>;
  provincesOptions$!: Observable<SelectOption[]>;
  form!: FormGroup;

  get formGroups(): FormArray {
    return this.form.get('groups') as FormArray;
  }

  constructor(private readonly store: Store, private fb: FormBuilder) {}

  eventTypeOptions = [
    { label: 'FHA-Food & Beverage', value: EventType.FHA },
    { label: 'Prowine Singapore', value: EventType.Prowine },
  ];

  ngOnInit(): void {
    this.store.dispatch(loadCompanies());
    this.store.dispatch(loadProvinces());

    this.loadCompanies();
    this.loadProvinces();
    this.form = this.fb.group({
      groups: this.fb.array([]),
      eventType: ['', Validators.required],
      company: ['', Validators.required],
    });

    this.form.get('eventType')?.valueChanges.subscribe((value) => {
      console.log('Radio value changed:', value);
      this.loadCompanies();
    });

    this.addGroup();
  }

  loadCompanies() {
    this.companiesOptions$ = this.store.select(selectCompanies).pipe(
      map((company) =>
        company
          .filter((x) => x.S_event === this.form.get('eventType')?.value)
          .map((x) => ({
            label: x.S_company,
            value: x.S_company,
          }))
      )
    );
  }

  loadProvinces() {
    this.provincesOptions$ = this.store.select(selectProvinces).pipe(
      map((data) => {
        const uniqueCountries = new Map();

        data.forEach((item) => {
          const { country, coutry_code } = item;
          if (!uniqueCountries.has(country)) {
            uniqueCountries.set(country, {
              label: country,
              value: coutry_code,
            });
          }
        });

        return Array.from(uniqueCountries.values());
      })
    );
  }

  addGroup(): void {
    this.formGroups.push(this.createExhibitorFormGroup());
  }

  removeGroup(index: number): void {
    this.formGroups.removeAt(index);
  }

  register() {
    console.log(this.form);
    if (!this.form.valid) {
      return;
    }

    const requests = this.formGroups.controls.map((group) => {
      const body: AddExhibitorHttpRequest = {
        S_added_via: 'Web Form',
        S_company: this.form.get('company')?.value,
        S_email_address: group.get('email')?.value,
        S_group_reg_id: this.generateRandomString(),
        S_name_on_badge: group.get('badgeName')?.value,
        S_job_title: group.get('jobTitle')?.value,
        S_country: group.get('country')?.value,
        S_company_on_badge: group.get('badgeCompany')?.value,
        SB_event_fha: group.get('eventType')?.value === EventType.FHA,
        SB_event_prowine:
          this.form.get('eventType')?.value === EventType.Prowine,
      };
      return body;
    });

    this.store.dispatch(addMultipleExhibitors({ exhibitors: requests }));
  }

  createExhibitorFormGroup(): FormGroup {
    return this.fb.group({
      email: ['', Validators.required],
      badgeName: ['', Validators.required],
      country: ['', Validators.required],
      badgeCompany: ['', Validators.required],
      jobTitle: ['', Validators.required],
    });
  }

  generateRandomString(): string {
    return Array.from({ length: 5 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
  }
}
