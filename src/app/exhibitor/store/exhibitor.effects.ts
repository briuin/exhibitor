import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ExhibitorService } from '../exhibitor.service';
import {
  loadCompanies,
  loadCompaniesSuccess,
  loadCompaniesFailure,
} from './exhibitor.actions';

@Injectable()
export class ExhibitorEffects {
  private actions$ = inject(Actions);
  private exhibitorService = inject(ExhibitorService);

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
}
