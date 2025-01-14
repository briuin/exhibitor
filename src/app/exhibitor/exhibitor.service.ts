import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  AddExhibitorHttpRequest,
  AddExhibitorHttpResponse,
  ExhibitorCompany,
  ExhibitorHttpResponse,
} from './exhibitor.model';

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

  addExhibitor(payload: AddExhibitorHttpRequest): Observable<string> {
    return this.http
      .post<AddExhibitorHttpResponse<string>>(
        `${this.baseUrl}/add-exhibitor`,
        payload
      )
      .pipe(map((x) => x.user_id));
  }
}
