import { Project, RequestOptions } from '@my/data';
import { RequestStatus } from '../../../../../shared/state/request-state.models';

export interface ProjectStateModel {
  projects: {
    [id: string]: Project;
  };
  totalItems: number;
  status: RequestStatus;
  requestOptions: Partial<RequestOptions>;
}
