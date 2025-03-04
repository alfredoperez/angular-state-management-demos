import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';
import { catchError, from, of, tap } from 'rxjs';
import { Project, Team } from '@my/data';
import { ProjectsApiService } from '../../../../../shared/data/projects/projects-api.service';
import { RequestStatus } from '../../../../../shared/state/request-state.models';
import { TeamCollectionState } from '../teams/team-collection.state';
import { ProjectCollectionActions } from './project-collection.actions';
import { ProjectStateModel } from './project-collection.model';

const defaults: ProjectStateModel = {
  projects: {},
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

@State<ProjectStateModel>({
  name: 'projects',
  defaults,
})
@Injectable()
export class ProjectCollectionState {
  constructor(private projectsApiService: ProjectsApiService) {}

  @Selector()
  static getEntities(state: ProjectStateModel): Project[] {
    return Object.values(state.projects);
  }

  @Selector()
  static getProject(state: ProjectStateModel) {
    return (id: string): Project | undefined => state.projects[id];
  }

  static getProjectsByTeam = createSelector(
    [ProjectCollectionState.getEntities, TeamCollectionState.getEntities],
    (projects: Array<Project>, teams: Array<Team>) =>
      teams.reduce(
        (acc, team) => ({
          ...acc,
          [team.id]: projects
            .filter((project) => project.teamId === team.id)
            .map((project) => project.name)
            .join(', '),
        }),
        {} as Record<string, string>,
      ),
  );

  @Selector()
  static getStatus(state: ProjectStateModel): RequestStatus {
    return state.status;
  }

  @Selector()
  static getTotalItems(state: ProjectStateModel): number {
    return state.totalItems;
  }

  @Selector()
  static isLoaded(state: ProjectStateModel): boolean {
    return state.status === 'Loaded';
  }

  @Selector()
  static isLoading(state: ProjectStateModel): boolean {
    return state.status === 'Loading';
  }

  @Selector()
  static isInit(state: ProjectStateModel): boolean {
    return state.status === 'Init';
  }

  @Selector()
  static isError(state: ProjectStateModel): boolean {
    const isError =
      typeof state.status === 'object' && state.status?.message !== undefined;
    console.log('isError', isError);
    return isError;
  }

  @Action(ProjectCollectionActions.FetchAll)
  fetchProjects(ctx: StateContext<ProjectStateModel>) {
    ctx.patchState({
      status: 'Loading',
    });

    return from(this.projectsApiService.fetchPage()).pipe(
      tap((response) => {
        ctx.patchState({
          projects: response.items.reduce(
            (acc, project) => ({
              ...acc,
              [project.id]: project,
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
