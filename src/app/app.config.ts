import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { exhibitorReducer } from './exhibitor/store/exhibitor.reducer';
import { ExhibitorEffects } from './exhibitor/store/exhibitor.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(),
    provideState('exhibitor', exhibitorReducer),
    provideEffects([ExhibitorEffects]),
    provideHttpClient(),
  ],
};
