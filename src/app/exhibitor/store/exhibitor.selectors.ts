import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ExhibitorState } from './exhibitor.reducer';

export const selectExhibitorState =
  createFeatureSelector<ExhibitorState>('exhibitor');

export const selectCompanies = createSelector(
  selectExhibitorState,
  (state) => state.companies
);
export const selectLoadingCompanies = createSelector(
  selectExhibitorState,
  (state) => state.loadingCompanies
);
export const selectCompaniesError = createSelector(
  selectExhibitorState,
  (state) => state.errorCompanies
);

export const selectAddingExhibitor = createSelector(
  selectExhibitorState,
  (state) => state.addingExhibitor
);
export const selectAddExhibitorError = createSelector(
  selectExhibitorState,
  (state) => state.addExhibitorError
);
export const selectLastAddExhibitorResponse = createSelector(
  selectExhibitorState,
  (state) => state.lastAddExhibitorResponse
);
