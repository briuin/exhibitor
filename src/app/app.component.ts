import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCompanies } from './exhibitor/store/exhibitor.actions';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'exhibitor';

  constructor(private store: Store) {
    this.store.dispatch(loadCompanies());
  }
}
