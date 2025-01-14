import { createReducer, on } from '@ngrx/store';
import {
  loadCompanies,
  loadCompaniesSuccess,
  loadCompaniesFailure,
} from './exhibitor.actions';
import { ExhibitorCompany } from '../exhibitor.model';

export interface ExhibitorState {
  companies: ExhibitorCompany[];
  loadingCompanies: boolean;
  errorCompanies: any;
}

export const initialExhibitorState: ExhibitorState = {
  companies: [],
  loadingCompanies: false,
  errorCompanies: null,
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
  }))
);
