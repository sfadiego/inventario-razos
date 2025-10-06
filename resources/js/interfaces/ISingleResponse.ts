export interface ISingleResponse<T> {
  status: string;
  message: string | null;
  data: T[];
}
