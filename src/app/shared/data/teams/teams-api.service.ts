import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Team } from './teams.models';

@Injectable({ providedIn: 'root' })
export class TeamsApiService extends ApiService<Team> {
  constructor() {
    super('teams');
  }
}
