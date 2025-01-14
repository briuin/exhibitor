import { createAction, props } from '@ngrx/store';
import { AddExhibitorHttpRequest, ExhibitorCompany } from '../exhibitor.model';

export const loadCompanies = createAction('[Exhibitor/API] Load Companies');
export const loadCompaniesSuccess = createAction(
  '[Exhibitor/API] Load Companies Success',
  props<{ companies: ExhibitorCompany[] }>()
);
export const loadCompaniesFailure = createAction(
  '[Exhibitor/API] Load Companies Failure',
  props<{ error: any }>()
);

export const addExhibitor = createAction(
  '[Exhibitor/API] Add Exhibitor',
  props<{ exhibitor: AddExhibitorHttpRequest }>()
);
export const addExhibitorSuccess = createAction(
  '[Exhibitor/API] Add Exhibitor Success',
  props<{ response: any }>()
);
export const addExhibitorFailure = createAction(
  '[Exhibitor/API] Add Exhibitor Failure',
  props<{ error: any }>()
);
