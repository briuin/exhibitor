export interface ExhibitorHttpResponse<T> {
  status: boolean;
  message: T;
}

export interface ExhibitorCompany {
  S_company: string;
  S_event: string;
}

export interface AddExhibitorHttpRequest {
  S_added_via: string;
  S_company: string;
  S_email_address: string;
  S_group_reg_id: string;
  S_name_on_badge: string;
  S_job_title: string;
  S_country: string;
  S_company_on_badge: string;
  SB_event_fha: boolean;
  SB_event_prowine: boolean;
}

export interface AddExhibitorHttpResponse<T>
  extends ExhibitorHttpResponse<T> {
  user_id: string;
}
