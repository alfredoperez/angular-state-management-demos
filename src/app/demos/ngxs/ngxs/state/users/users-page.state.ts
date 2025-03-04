import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  State,
  StateContext,
  createSelector,
} from '@ngxs/store';
import { catchError, forkJoin, of } from 'rxjs';
import { UserViewModel } from '../../../../../shared/data/users/users.models';
import { ProjectCollectionActions } from '../projects/project-collection.actions';
import { ProjectCollectionState } from '../projects/project-collection.state';
import { TeamCollectionActions } from '../teams/team-collection.actions';
import { TeamCollectionState } from '../teams/team-collection.state';
import { UserCollectionActions } from './user-collection.actions';
import { UserStateModel } from './user-collection.model';
import { UserCollectionState } from './user-collection.state';
import { UsersPageActions } from './users-page.actions';

@State({
  name: 'usersPage',
})
@Injectable()
export class UsersPageState {
  @Selector([
    UserCollectionState.isLoading,
    TeamCollectionState.isLoading,
    ProjectCollectionState.isLoading,
  ])
  static isLoading(
    isLoadingUsers: boolean,
    isLoadingTeams: boolean,
    isLoadingProjects: boolean,
  ) {
    return isLoadingUsers || isLoadingTeams || isLoadingProjects;
  }

  @Selector([
    UserCollectionState.isLoaded,
    TeamCollectionState.isLoaded,
    ProjectCollectionState.isLoaded,
  ])
  static isLoaded(
    isLoadedUsers: boolean,
    isLoadedTeams: boolean,
    isLoadedProjects: boolean,
  ) {
    return isLoadedUsers && isLoadedTeams && isLoadedProjects;
  }

  @Selector([
    UserCollectionState.isLoading,
    TeamCollectionState.isLoading,
    ProjectCollectionState.isLoading,
  ])
  static isLoadingAllData(
    isLoadingUsers: boolean,
    isLoadingTeams: boolean,
    isLoadingProjects: boolean,
  ) {
    return isLoadingUsers || isLoadingTeams || isLoadingProjects;
  }

  @Selector([
    UserCollectionState.isInit,
    TeamCollectionState.isInit,
    ProjectCollectionState.isInit,
  ])
  static isInit(
    isInitUsers: boolean,
    isInitTeams: boolean,
    isInitProjects: boolean,
  ) {
    return isInitUsers && isInitTeams && isInitProjects;
  }

  @Selector([
    UserCollectionState.isLoaded,
    TeamCollectionState.isLoaded,
    ProjectCollectionState.isLoaded,
  ])
  static isError(
    isErrorUsers: boolean,
    isErrorTeams: boolean,
    isErrorProjects: boolean,
  ) {
    return isErrorUsers || isErrorTeams || isErrorProjects;
  }

  @Selector([
    UserCollectionState.isError,
    TeamCollectionState.isError,
    ProjectCollectionState.isError,
  ])
  static error(
    isErrorUsers: boolean,
    isErrorTeams: boolean,
    isErrorProjects: boolean,
  ) {
    console.log({ isErrorUsers, isErrorTeams, isErrorProjects });
    return isErrorUsers || isErrorTeams || isErrorProjects;
  }

  static usersViewModel = createSelector(
    [
      UserCollectionState.getEntities,
      TeamCollectionState.entities,
      ProjectCollectionState.getProjectsByTeam,
    ],
    (users, teams, projectsByTeam) => {
      return users.map((user) => {
        return {
          ...user,
          team: teams[user.teamId]?.name,
          projects: projectsByTeam[user.teamId],
        } as UserViewModel;
      });
    },
  );

  @Selector([UserCollectionState.totalItems])
  static totalItems(totalItems: number) {
    return totalItems;
  }

  @Selector([UserCollectionState.page])
  static page(page: number) {
    return page > 0 ? page - 1 : 0;
  }

  @Selector([UserCollectionState.pageSize])
  static pageSize(pageSize: number) {
    return pageSize;
  }

  @Selector([UserCollectionState.search])
  static search(search: string) {
    return search;
  }

  @Action(UsersPageActions.FetchAllData)
  fetchAllData(ctx: StateContext<UserStateModel>) {
    return forkJoin([
      ctx.dispatch(new UserCollectionActions.FetchPage()),
      ctx.dispatch(new TeamCollectionActions.FetchAll()),
      ctx.dispatch(new ProjectCollectionActions.FetchAll())
    ]).pipe(
      catchError(error => {
        // Handle errors globally
        return of(error);
      })
    );
  }

  @Action(UsersPageActions.SetPage)
  setPage(ctx: StateContext<UserStateModel>, action: UsersPageActions.SetPage) {
    ctx.dispatch(new UserCollectionActions.SetPage(action.page));
  }

  @Action(UsersPageActions.SetPageSize)
  setPageSize(
    ctx: StateContext<UserStateModel>,
    action: UsersPageActions.SetPageSize,
  ) {
    ctx.dispatch(new UserCollectionActions.SetPageSize(action.pageSize));
  }

  @Action(UsersPageActions.SetSearch)
  setSearch(
    ctx: StateContext<UserStateModel>,
    action: UsersPageActions.SetSearch,
  ) {
    ctx.dispatch(new UserCollectionActions.SetSearch(action.search));
  }
}
