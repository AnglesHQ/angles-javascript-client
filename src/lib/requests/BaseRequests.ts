import { AxiosResponse } from 'axios';
import { DefaultResponse } from '../models/response/DefaultResponse';

export class BaseRequests {
  protected success<T>(response: AxiosResponse<T>): T {
    return response.data;
  }
}
