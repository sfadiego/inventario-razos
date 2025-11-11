export interface IErrorReporting {
  id: number;
  endpoint: string;
  method: string;
  status_code: number;
  error_message: string;
  request_payload: string;
  response_body: string;
  created_at: string;
}
