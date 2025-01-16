import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  AddExhibitorHttpRequest,
  AddExhibitorHttpResponse,
  ExhibitorCompany,
  ExhibitorHttpResponse,
  Province,
} from './exhibitor.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExhibitorService {
  private baseUrl = environment.apiUrl;

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

  loadProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>('/provinces.json');
  }
}
