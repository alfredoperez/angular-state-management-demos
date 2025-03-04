import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, from, of, tap } from 'rxjs';
import { RequestOptions, UsersApiService } from '@my/data';
import { Error } from '../../../../../shared/state/request-state.models';
import { UserCollectionActions } from './user-collection.actions';
import { UserStateModel } from './user-collection.model';

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: {},
    status: 'Init',
    totalItems: 0,
    requestOptions: {
      pagination: { page: 1, pageSize: 10 },
      search: '',
    },
    previousRequestOptions: {},
  },
})
@Injectable()
export class UserCollectionState {
  #usersService = inject(UsersApiService);

  @Selector()
  static getEntities(state: UserStateModel) {
    return Object.values(state.users);
  }

  @Selector()
  static totalItems(state: UserStateModel) {
    return state.totalItems;
  }

  @Selector()
  static status(state: UserStateModel) {
    return state.status;
  }
  @Selector()
  static isInit(state: UserStateModel) {
    return state.status === 'Init';
  }

  @Selector()
  static isLoading(state: UserStateModel) {
    return state.status === 'Loading';
  }

  @Selector()
  static isLoaded(state: UserStateModel) {
    return state.status === 'Loaded';
  }

  @Selector()
  static isError(state: UserStateModel): boolean {
    return (
      typeof state.status === 'object' && state.status?.message !== undefined
    );
  }

  @Selector()
  static error(state: UserStateModel) {
    return this.isError(state) ? (state.status as Error).message : null;
  }

  @Selector()
  static page(state: UserStateModel) {
    return state.requestOptions.pagination?.page ?? 0;
  }

  @Selector()
  static pageSize(state: UserStateModel) {
    return state.requestOptions.pagination?.pageSize ?? 0;
  }

  @Selector()
  static search(state: UserStateModel) {
    return state.requestOptions.search ?? '';
  }

  static requestOptions(state: UserStateModel) {
    return {
      page: state.requestOptions.pagination?.page,
      pageSize: state.requestOptions.pagination?.pageSize,
      search: state.requestOptions.search,
    } as Partial<RequestOptions>;
  }

  @Action(UserCollectionActions.FetchPage)
  fetchUsers(ctx: StateContext<UserStateModel>) {
    const { requestOptions, previousRequestOptions } = ctx.getState();

    // To avoid unnecessary requests
    if (previousRequestOptions === requestOptions) {
      return of(null);
    }

    ctx.patchState({
      previousRequestOptions: requestOptions,
      status: 'Loading',
    });
    return from(this.#usersService.fetchPage(requestOptions)).pipe(
      tap((response) => {
        ctx.patchState({
          users: response.items.reduce(
            (acc, user) => ({ ...acc, [user.id]: user }),
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

  @Action(UserCollectionActions.SetPage)
  setPage(
    ctx: StateContext<UserStateModel>,
    action: UserCollectionActions.SetPage,
  ) {
    const { requestOptions } = ctx.getState();
    ctx.patchState({
      requestOptions: {
        ...requestOptions,
        pagination: { ...requestOptions.pagination, page: action.page },
      },
    });
    ctx.dispatch(new UserCollectionActions.FetchPage());
  }

  @Action(UserCollectionActions.SetPageSize)
  setPageSize(
    ctx: StateContext<UserStateModel>,
    action: UserCollectionActions.SetPageSize,
  ) {
    const { requestOptions } = ctx.getState();
    ctx.patchState({
      requestOptions: {
        ...requestOptions,
        pagination: { ...requestOptions.pagination, pageSize: action.pageSize },
      },
    });
    ctx.dispatch(new UserCollectionActions.FetchPage());
  }

  @Action(UserCollectionActions.SetSearch)
  setSearch(
    ctx: StateContext<UserStateModel>,
    action: UserCollectionActions.SetSearch,
  ) {
    const { requestOptions } = ctx.getState();
    ctx.patchState({
      requestOptions: {
        ...requestOptions,
        search: action.search,
        pagination: { ...requestOptions.pagination, page: action.page },
      },
    });
    ctx.dispatch(new UserCollectionActions.FetchPage());
  }
}
