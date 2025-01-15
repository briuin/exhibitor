import { createAction, props } from '@ngrx/store';
import {
  AddExhibitorHttpRequest,
  ExhibitorCompany,
  Province,
} from '../exhibitor.model';

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

export const addMultipleExhibitors = createAction(
  '[Exhibitor/API] Add Multiple Exhibitors',
  props<{ exhibitors: AddExhibitorHttpRequest[] }>()
);

export const addMultipleExhibitorsSuccess = createAction(
  '[Exhibitor/API] Add Multiple Exhibitors Success',
  props<{ responses: any[] }>()
);

export const addMultipleExhibitorsFailure = createAction(
  '[Exhibitor/API] Add Multiple Exhibitors Failure',
  props<{ error: any }>()
);

export const loadProvinces = createAction('[Provinces/API] Load Provinces');
export const loadProvincesSuccess = createAction(
  '[Provinces/API] Load Provinces Success',
  props<{ provinces: Province[] }>()
);
export const loadProvincesFailure = createAction(
  '[Provinces/API] Load Provinces Failure',
  props<{ error: any }>()
);
