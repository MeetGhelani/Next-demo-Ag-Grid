export interface ApiResponse<T = unknown> {
  isValidUser?: boolean;
  messageType?: number;
  message?: string;
  dataList?: T[];
  data?: T;
  success?: boolean;
  errors?: string[];
  statusCode?: number;
}
