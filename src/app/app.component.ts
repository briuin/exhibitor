import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addExhibitor,
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
import { map } from 'rxjs';
import { UiCardComponent } from './ui/ui-card/ui-card.component';
import { UiRadioComponent } from './ui/ui-radio/ui-radio.component';
import { UiSelectComponent } from './ui/ui-select/ui-select.component';
import { UiDividersComponent } from './ui/ui-dividers/ui-dividers.component';
import { UiInputComponent } from './ui/ui-input/ui-input.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    UiButtonComponent,
    UiCardComponent,
    UiRadioComponent,
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
  companies$;
  provinces$;
  form!: FormGroup;

  constructor(private readonly store: Store, private fb: FormBuilder) {
    this.store.dispatch(loadCompanies());
    this.store.dispatch(loadProvinces());
    this.companies$ = this.store.select(selectCompanies);
    this.provinces$ = this.store
      .select(selectProvinces)
      .pipe(map((x) => x.slice(0, 5)));

    this.form = this.fb.group({
      email: ['', Validators.required],
      badgeName: ['', Validators.required],
      company: ['', Validators.required],
      badgeCompany: ['', Validators.required],
      jobTitle: ['', Validators.required],
    });
  }

  register(company: string) {
    console.log(this.form);
    return;
    const body: AddExhibitorHttpRequest = {
      S_added_via: 'Web Form',
      S_company: company,
      S_email_address: 'test',
      S_group_reg_id: this.generateRandomString(),
      S_name_on_badge: 'test',
      S_job_title: 'test',
      S_country: 'test',
      S_company_on_badge: 'test',
      SB_event_fha: true,
      SB_event_prowine: false,
    };

    this.store.dispatch(addExhibitor({ exhibitor: body }));
  }

  generateRandomString(): string {
    return Array.from({ length: 5 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
  }
}
