import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, tap, switchMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

import { ExhibitorService } from '../exhibitor.service';
import {
  loadCompanies,
  loadCompaniesSuccess,
  loadCompaniesFailure,
  addExhibitorSuccess,
  addExhibitor,
  addExhibitorFailure,
  loadProvinces,
  loadProvincesSuccess,
  loadProvincesFailure,
  addMultipleExhibitors,
  addMultipleExhibitorsFailure,
  addMultipleExhibitorsSuccess,
  updateProgress,
} from './exhibitor.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class ExhibitorEffects {
  private actions$ = inject(Actions);
  private exhibitorService = inject(ExhibitorService);
  private store = inject(Store);

  loadCompanies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCompanies),
      mergeMap(() =>
        this.exhibitorService.getExhibitorCompanyList().pipe(
          map((companies) => loadCompaniesSuccess({ companies })),
          catchError((error) => of(loadCompaniesFailure({ error })))
        )
      )
    )
  );

  addExhibitor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addExhibitor),
      mergeMap((action) =>
        this.exhibitorService.addExhibitor(action.exhibitor).pipe(
          map((response) => addExhibitorSuccess({ response })),
          catchError((error) => of(addExhibitorFailure({ error })))
        )
      )
    )
  );

  addMultipleExhibitors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addMultipleExhibitors),
      mergeMap((action) => {
        const total = action.exhibitors.length;
        let completed = 0;

        const apiCalls = action.exhibitors.map((exhibitor, index) =>
          this.exhibitorService.addExhibitor(exhibitor).pipe(
            map((response) => ({ response, exhibitor, index })),
            tap(() => {
              completed++;
              this.store.dispatch(updateProgress({ completed, total }));
            }),
            catchError((error) => {
              completed++;
              this.store.dispatch(updateProgress({ completed, total }));
              return of({ error, exhibitor, index });
            })
          )
        );

        return forkJoin(apiCalls).pipe(
          switchMap((results) => {
            const successes = results.filter((res: any) => !res.error);
            const failures = results.filter((res: any) => res.error);

            return [
              addMultipleExhibitorsFailure({
                error: failures.map((failure) => ({
                  error: (failure as any).error?.error,
                  exhibitor: failure.exhibitor,
                  index: failure.index,
                })),
              }),
              addMultipleExhibitorsSuccess({
                responses: successes.map((success) => ({
                  response: (success as any).response,
                  exhibitor: success.exhibitor,
                  index: success.index,
                })),
              }),
            ];
          }),
          catchError((error) =>
            of(
              addMultipleExhibitorsFailure({
                error: `Unexpected error: ${error.message}`,
              })
            )
          )
        );
      })
    )
  );

  loadProvinces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProvinces),
      mergeMap(() =>
        this.exhibitorService.loadProvinces().pipe(
          map((data) => loadProvincesSuccess({ provinces: data })),
          catchError((err) => of(loadProvincesFailure({ error: err })))
        )
      )
    )
  );
}
