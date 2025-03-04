import { RequestOptions, Team } from '@my/data';
import { RequestStatus } from '../../../../../shared/state/request-state.models';

export interface TeamStateModel {
  entities: {
    [id: string]: Team;
  };
  totalItems: number;
  status: RequestStatus;
  requestOptions: Partial<RequestOptions>;
}
