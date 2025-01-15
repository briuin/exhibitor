import { createReducer, on } from '@ngrx/store';
import {
  loadCompanies,
  loadCompaniesSuccess,
  loadCompaniesFailure,
  addExhibitor,
  addExhibitorSuccess,
  addExhibitorFailure,
  loadProvinces,
  loadProvincesSuccess,
  loadProvincesFailure,
  addMultipleExhibitorsSuccess,
  addMultipleExhibitorsFailure,
} from './exhibitor.actions';
import { ExhibitorCompany, Province } from '../exhibitor.model';

export interface ExhibitorState {
  companies: ExhibitorCompany[];
  loadingCompanies: boolean;
  errorCompanies: any;

  addingExhibitor: boolean;
  addExhibitorError: any;
  AddMultipleExhibitorsError: string | null;
  lastAddExhibitorResponse: any;

  provinces: Province[];
  loading: boolean;
  error: any;

}

export const initialExhibitorState: ExhibitorState = {
  companies: [],
  loadingCompanies: false,
  errorCompanies: null,

  addingExhibitor: false,
  addExhibitorError: null,
  AddMultipleExhibitorsError: '',
  lastAddExhibitorResponse: null,

  provinces: [],
  loading: false,
  error: null
};

export const exhibitorReducer = createReducer(
  initialExhibitorState,

  on(loadCompanies, (state) => ({
    ...state,
    loadingCompanies: true,
    errorCompanies: null,
  })),
  on(loadCompaniesSuccess, (state, { companies }) => ({
    ...state,
    companies,
    loadingCompanies: false,
  })),
  on(loadCompaniesFailure, (state, { error }) => ({
    ...state,
    loadingCompanies: false,
    errorCompanies: error,
  })),

  on(addExhibitor, (state) => ({
    ...state,
    addingExhibitor: true,
    addExhibitorError: null,
    lastAddExhibitorResponse: null,
  })),
  on(addExhibitorSuccess, (state, { response }) => ({
    ...state,
    addingExhibitor: false,
    lastAddExhibitorResponse: response,
  })),
  on(addExhibitorFailure, (state, { error }) => ({
    ...state,
    addingExhibitor: false,
    addExhibitorError: error,
  })),
  on(addMultipleExhibitorsSuccess, (state, { responses }) => ({
    ...state,
    error: null,
  })),
  on(addMultipleExhibitorsFailure, (state, { error }) => ({
    ...state,
    AddMultipleExhibitorsError: 'One or more API calls failed',
  })),

  on(loadProvinces, (state) => ({
    ...state,
    loading: true,
    AddMultipleExhibitorsError: null
  })),
  on(loadProvincesSuccess, (state, { provinces }) => ({
    ...state,
    loading: false,
    provinces: provinces
  })),
  on(loadProvincesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
