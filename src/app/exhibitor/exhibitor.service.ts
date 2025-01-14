import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ExhibitorCompany, ExhibitorHttpResponse } from './exhibitor.model';

@Injectable({ providedIn: 'root' })
export class ExhibitorService {
  private baseUrl = 'https://staging-fha-2024.occamlab.com.sg/api';

  constructor(private http: HttpClient) {}

  getExhibitorCompanyList(): Observable<ExhibitorCompany[]> {
    return this.http
      .post<ExhibitorHttpResponse<ExhibitorCompany[]>>(
        `${this.baseUrl}/exhibitor-company-list`,
        {}
      )
      .pipe(map((x) => x.message));
  }
}
