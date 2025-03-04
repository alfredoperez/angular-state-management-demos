import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { provideStore } from '@ngxs/store';
import { UserCollectionState } from './demos/ngxs/ngxs/state/users/user-collection.state';

declare const ngDevMode: boolean;

export function provideNgxs() {
  return provideStore(
    [],
    withNgxsReduxDevtoolsPlugin(),
    withNgxsFormPlugin(),
    withNgxsLoggerPlugin(),
    withNgxsRouterPlugin(),
  );
}
