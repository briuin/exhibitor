import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addMultipleExhibitors,
  loadCompanies,
  loadProvinces,
} from './exhibitor/store/exhibitor.actions';
import {
  selectAddExhibitorAPIResult,
  selectAddExhibitorIsLoading,
  selectAddExhibitorProgress,
  selectAddMultipleExhibitorErrors,
  selectCompanies,
  selectProvinces,
} from './exhibitor/store/exhibitor.selectors';
import { CommonModule } from '@angular/common';
import { UiButtonComponent } from './ui/ui-button/ui-button.component';
import { AddExhibitorHttpRequest } from './exhibitor/exhibitor.model';
import { map, Observable, tap } from 'rxjs';
import { UiCardComponent } from './ui/ui-card/ui-card.component';
import { UiRadioComponent } from './ui/ui-radio/ui-radio.component';
import { UiSelectComponent } from './ui/ui-select/ui-select.component';
import { UiDividersComponent } from './ui/ui-dividers/ui-dividers.component';
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
import { ExhibitorFormComponent } from './components/exhibitor-form/exhibitor-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessModalComponent } from './components/success-modal/success-modal.component';
import { AddIconComponent } from "./ui/icons/add-icon/add-icon.component";
import { UiButtonLinkComponent } from "./ui/ui-button-link/ui-button-link.component";

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
    ExhibitorFormComponent,
    ReactiveFormsModule,
    ExhibitorFormComponent,
    AddIconComponent,
    UiButtonLinkComponent
],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  companiesOptions$!: Observable<SelectOption[]>;
  provincesOptions$!: Observable<SelectOption[]>;
  form!: FormGroup;

  isAdding$!: Observable<boolean>;
  progress$!: Observable<number>;

  addExhibitorAPIResult$!: Observable<any[]>;
  addExhibitorErrors$!: Observable<any[]>;

  get formGroups(): FormArray {
    return this.form.get('groups') as FormArray;
  }

  get exhibitorFormGroups(): FormGroup[] {
    return this.formGroups.controls.map((control) => control as FormGroup);
  }

  constructor(
    private readonly store: Store,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {}

  eventTypeOptions = [
    { label: 'FHA-Food & Beverage', value: EventType.FHA },
    { label: 'Prowine Singapore', value: EventType.Prowine },
  ];

  uniqueId = this.generateRandomString();

  ngOnInit(): void {
    this.store.dispatch(loadCompanies());
    this.store.dispatch(loadProvinces());

    this.loadCompanies();
    this.loadProvinces();
    this.form = this.fb.group({
      groups: this.fb.array([], [Validators.minLength(1)]),
      eventType: ['', Validators.required],
      company: ['', Validators.required],
    });

    this.form.get('eventType')?.valueChanges.subscribe((value) => {
      this.loadCompanies();
      this.form.get('company')?.setValue('');
    });

    this.addGroup();

    this.store.select(selectAddExhibitorAPIResult).subscribe((responses) => {
      if (
        responses &&
        responses.length > 0 &&
        !responses.find((x) => x.error)
      ) {
        this.onExhibitorsAddedSuccess();
      }
    });

    this.isAdding$ = this.store.select(selectAddExhibitorIsLoading);
    this.progress$ = this.store.select(selectAddExhibitorProgress);
    this.addExhibitorAPIResult$ = this.store
      .select(selectAddExhibitorAPIResult)
      .pipe(
        tap((result) => {
          result.forEach((x) => {
            if (!x.error) {
              this.formGroups.controls[x.index].get('done')?.setValue(true);
            }
          });
        })
      );

    this.addExhibitorErrors$ = this.store.select(
      selectAddMultipleExhibitorErrors
    );
  }

  getErrorMessage(index: number) {
    return this.addExhibitorAPIResult$.pipe(
      map(
        (result) =>
          result.find((x) => x.index === index && x.error)?.error?.message
      )
    );
  }

  onExhibitorsAddedSuccess(): void {
    this.modalService.open(SuccessModalComponent, {
      centered: true,
      backdrop: 'static',
    });
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
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const requests = this.formGroups.controls
      .filter((group) => !group.get('done')?.value)
      .map((group, i) => {
        const body: AddExhibitorHttpRequest = {
          S_added_via: 'Web Form',
          S_company: this.form.get('company')?.value,
          S_email_address: group.get('email')?.value,
          S_group_reg_id: this.uniqueId,
          S_name_on_badge: group.get('badgeName')?.value,
          S_job_title: group.get('jobTitle')?.value,
          S_country: group.get('country')?.value,
          S_company_on_badge: group.get('badgeCompany')?.value,
          SB_event_fha: this.form.get('eventType')?.value === EventType.FHA,
          SB_event_prowine:
            this.form.get('eventType')?.value === EventType.Prowine,
        };
        return body;
      });

    this.store.dispatch(addMultipleExhibitors({ exhibitors: requests }));
  }

  createExhibitorFormGroup(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      badgeName: ['', Validators.required],
      country: ['', Validators.required],
      badgeCompany: ['', Validators.required],
      jobTitle: ['', Validators.required],
      done: [false],
    });
  }

  generateRandomString(): string {
    return Array.from({ length: 5 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26))
    ).join('');
  }
}
