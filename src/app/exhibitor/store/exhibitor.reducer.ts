import { createReducer, on } from '@ngrx/store';
import {
  loadCompanies,
  loadCompaniesSuccess,
  loadCompaniesFailure,
  addExhibitor,
  addExhibitorSuccess,
  addExhibitorFailure,
} from './exhibitor.actions';
import { ExhibitorCompany } from '../exhibitor.model';

export interface ExhibitorState {
  companies: ExhibitorCompany[];
  loadingCompanies: boolean;
  errorCompanies: any;

  addingExhibitor: boolean;
  addExhibitorError: any;
  lastAddExhibitorResponse: any;
}

export const initialExhibitorState: ExhibitorState = {
  companies: [],
  loadingCompanies: false,
  errorCompanies: null,

  addingExhibitor: false,
  addExhibitorError: null,
  lastAddExhibitorResponse: null,
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
  }))
);
