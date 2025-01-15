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

export const selectAddMultipleExhibitorError = createSelector(
  selectExhibitorState,
  (state) => state.AddMultipleExhibitorsError
);
export const selectLastAddExhibitorResponse = createSelector(
  selectExhibitorState,
  (state) => state.lastAddExhibitorResponse
);
export const selectLastAddMultipleExhibitorResponse = createSelector(
  selectExhibitorState,
  (state) => state.lastAddMultipleExhibitorResponse
);
export const selectProvinces = createSelector(
  selectExhibitorState,
  (state) => state.provinces
);

export const selectAddExhibitorProgress = createSelector(
  selectExhibitorState,
  (state) => state.progress
);

export const selectAddExhibitorIsLoading = createSelector(
  selectExhibitorState,
  (state) => state.isAddingExhibitor
);
