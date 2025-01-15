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
  updateProgress,
} from './exhibitor.actions';
import { ExhibitorCompany, Province } from '../exhibitor.model';

export interface ExhibitorState {
  companies: ExhibitorCompany[];
  loadingCompanies: boolean;
  errorCompanies: any;

  addingExhibitor: boolean;
  addExhibitorError: any;
  AddMultipleExhibitorsErrors: any[];
  lastAddMultipleExhibitorResponse: any[];
  lastAddExhibitorResponse: any;
  progress: number;
  isAddingExhibitor: boolean;

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
  AddMultipleExhibitorsErrors: [],
  lastAddExhibitorResponse: null,
  lastAddMultipleExhibitorResponse: [],
  progress: 0,
  isAddingExhibitor: false,

  provinces: [],
  loading: false,
  error: null,
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
    lastAddMultipleExhibitorResponse: responses,
  })),
  on(addMultipleExhibitorsFailure, (state, { error }) => ({
    ...state,
    AddMultipleExhibitorsErrors: error,
  })),

  on(loadProvinces, (state) => ({
    ...state,
    loading: true,
    AddMultipleExhibitorsError: null,
  })),
  on(loadProvincesSuccess, (state, { provinces }) => ({
    ...state,
    loading: false,
    provinces: provinces,
  })),
  on(loadProvincesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(updateProgress, (state, { completed, total }) => ({
    ...state,
    progress: Math.round((completed / total) * 100),
    isAddingExhibitor: completed < total,
  }))
);
