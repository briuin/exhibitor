export interface ExhibitorHttpResponse<T> {
  status: boolean;
  message: T;
}

export interface ExhibitorCompany {
  S_company: string;
  S_event: string;
}
