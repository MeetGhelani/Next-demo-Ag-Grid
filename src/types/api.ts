export interface ApiResponse<T = any> {
  isValidUser?: boolean;
  messageType?: number;
  message?: string;
  dataList?: T[];
  data?: T;
  success?: boolean;
  errors?: string[];
  statusCode?: number;
}

