import { Routes } from '@angular/router';
import { provideStore } from '@ngxs/store';
import { NgxsPageComponent } from './ngxs-page.component';
import { ProjectCollectionState } from './state/projects/project-collection.state';
import { TeamCollectionState } from './state/teams/team-collection.state';
import { UserCollectionState } from './state/users/user-collection.state';
import { UsersPageState } from './state/users/users-page.state';

export const ngxsRoutes: Routes = [
  {
    path: '',
    providers: [
      provideStore([
        UserCollectionState,
        TeamCollectionState,
        ProjectCollectionState,
        UsersPageState,
      ]),
    ],
    children: [{ path: '', component: NgxsPageComponent }],
  },
];
