import { Route } from '@angular/router';

export const appRoutes: Array<Route> = [
  { path: '', pathMatch: 'full', redirectTo: 'signal-store-and-query' },
  {
    path: 'signal-store-and-query',
    loadChildren: () =>
      import('./demos/signal-store/signal-store-and-query/routes').then(
        (m) => m.signalStoreAndQueryRoutes,
      ),
  },
];
