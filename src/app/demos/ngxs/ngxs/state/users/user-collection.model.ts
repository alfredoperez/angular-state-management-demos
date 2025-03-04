import { RequestOptions, User } from '@my/data';
import { RequestStatus } from '../../../../../shared/state/request-state.models';

export interface UserStateModel {
  users: {
    [id: string]: User;
  };
  totalItems: number;
  status: RequestStatus;
  requestOptions: Partial<RequestOptions>;
  previousRequestOptions: Partial<RequestOptions>;
}
