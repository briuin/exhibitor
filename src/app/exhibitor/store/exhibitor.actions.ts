import { createAction, props } from '@ngrx/store';
import { ExhibitorCompany } from '../exhibitor.model';

export const loadCompanies = createAction('[Exhibitor/API] Load Companies');
export const loadCompaniesSuccess = createAction(
  '[Exhibitor/API] Load Companies Success',
  props<{ companies: ExhibitorCompany[] }>()
);
export const loadCompaniesFailure = createAction(
  '[Exhibitor/API] Load Companies Failure',
  props<{ error: any }>()
);
