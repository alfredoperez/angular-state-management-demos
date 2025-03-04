import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';
import { catchError, from, of, tap } from 'rxjs';
import { Team } from '@my/data';
import { TeamsApiService } from '../../../../../shared/data/teams/teams-api.service';
import { RequestStatus } from '../../../../../shared/state/request-state.models';
import { TeamCollectionActions } from './team-collection.actions';
import { TeamStateModel } from './team-collection.model';

const defaults: TeamStateModel = {
  entities: {},
  totalItems: 0,
  status: 'Init',
  requestOptions: {
    pagination: {
      page: 1,
      pageSize: 100,
    },
    search: '',
  },
};

@State<TeamStateModel>({
  name: 'teams',
  defaults,
})
@Injectable()
export class TeamCollectionState {
  constructor(private teamsApiService: TeamsApiService) {}

  @Selector()
  static entities(state: TeamStateModel) {
    return state.entities;
  }

  @Selector()
  static getEntities(state: TeamStateModel): Team[] {
    return Object.values(state.entities);
  }



  @Selector()
  static getTeam(state: TeamStateModel) {
    return (id: string): Team | undefined => state.entities[id];
  }

  @Selector()
  static getStatus(state: TeamStateModel): RequestStatus {
    return state.status;
  }

  @Selector()
  static getTotalItems(state: TeamStateModel): number {
    return state.totalItems;
  }

  @Selector()
  static isLoaded(state: TeamStateModel): boolean {
    return state.status === 'Loaded';
  }

  @Selector()
  static isLoading(state: TeamStateModel): boolean {
    return state.status === 'Loading';
  }

  @Selector()
  static isInit(state: TeamStateModel): boolean {
    return state.status === 'Init';
  }

  @Selector()
  static isError(state: TeamStateModel): boolean {
    return (
      typeof state.status === 'object' && state.status?.message !== undefined
    );
  }

  @Action(TeamCollectionActions.FetchAll)
  fetchTeams(ctx: StateContext<TeamStateModel>) {
    const state = ctx.getState();
    ctx.patchState({
      status: 'Loading',
    });

    return from(this.teamsApiService.fetchPage(state.requestOptions)).pipe(
      tap((response) => {
        ctx.patchState({
          entities: response.items.reduce(
            (acc, team) => ({
              ...acc,
              [team.id]: team,
            }),
            {},
          ),
          totalItems: response.total,
          status: 'Loaded',
        });
      }),
      catchError((error) => {
        ctx.patchState({
          status: {
            message: error.message,
            code: '500',
          },
        });
        return of(null);
      }),
    );
  }
}
