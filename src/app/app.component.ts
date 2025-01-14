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

@Component({
  selector: 'app-root',
  imports: [CommonModule, UiButtonComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'exhibitor';
  companies$;
  provinces$;

  constructor(private readonly store: Store) {
    this.store.dispatch(loadCompanies());
    this.store.dispatch(loadProvinces());
    this.companies$ = this.store.select(selectCompanies);
    this.provinces$ = this.store
      .select(selectProvinces)
      .pipe(map((x) => x.slice(0, 5)));
  }

  register(company: string) {
    const body: AddExhibitorHttpRequest = {
      S_added_via: 'Web Form',
      S_company: company,
      S_email_address: 'test',
      S_group_reg_id: 'test',
      S_name_on_badge: 'test',
      S_job_title: 'test',
      S_country: 'test',
      S_company_on_badge: 'test',
      SB_event_fha: true,
      SB_event_prowine: false,
    };

    this.store.dispatch(addExhibitor({ exhibitor: body }));
  }
}
