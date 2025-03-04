import { Route } from '@angular/router';

export const appRoutes: Array<Route> = [
  { path: '', pathMatch: 'full', redirectTo: 'ngxs' },
  {
    path: 'signal-store-and-query',
    loadChildren: () =>
      import('./demos/signal-store/signal-store-and-query/routes').then(
        (m) => m.signalStoreAndQueryRoutes,
      ),
  },
  {
    path: 'ngxs',
    loadChildren: () =>
      import('./demos/ngxs/ngxs/routes').then((m) => m.ngxsRoutes),
  },
];
