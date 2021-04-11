import { AxiosResponse } from 'axios';

export class BaseRequests {
  protected success<T>(response: AxiosResponse<T>): T {
    return response.data;
  }
}
