export interface ApiResultGen<T> {
  succeeded: boolean;
  message: string;
  result: T;
  errors: string[];
}

export interface ApiResult {
  succeeded: boolean;
  message: string;
  errors: string[];
}
