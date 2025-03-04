import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { RowClickedEvent } from 'ag-grid-community';
import { User, usersColumnDefs } from '../../../shared/data/users/users.models';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ErrorBannerComponent } from '../../../shared/ui/error-banner/error-banner.component';
import { GridComponent } from '../../../shared/ui/grid/grid.component';
import { LoadingBannerComponent } from '../../../shared/ui/loading-banner/loading-banner.component';
import { SearchInputComponent } from '../../../shared/ui/search-input/search-input.component';
import { NgxsManageModalComponent } from './ngxs-manage-modal.component';
import { UsersPageActions } from './state/users/users-page.actions';
import { UsersPageState } from './state/users/users-page.state';

@Component({
  imports: [
    CommonModule,
    MatDialogModule,
    SearchInputComponent,
    GridComponent,
    ButtonComponent,
    LoadingBannerComponent,
    ErrorBannerComponent,
  ],
  template: `
    <div class="flex h-full flex-col gap-4 p-8">
      <div class="mb-6 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <h1 class="text-2xl font-medium">Users</h1>
          <span class="text-gray-500"> - {{ totalItems() }} users</span>
        </div>
        <ui-button
          (clicked)="onAddUser()"
          label="Add User"
          color="primary"
          icon="add"
        />
      </div>

      <app-search-input
        class="w-full"
        [search]="searchQuery()"
        (searchChange)="onDebouncedSearch($event)"
      />

      <div>
        @if (isInit()) {
          Initializing...
        }
        @if (isLoading()) {
          <ui-loading-banner />
        }
        <!-- @if (isError()) {
          <ui-error-banner />
        } -->
        @if (isLoaded()) {
          <app-grid
            [data]="users()"
            [columnDefs]="columnDefs"
            [page]="page()"
            [pageSize]="pageSize()"
            [isPlaceholderData]="false"
            [totalItems]="totalItems()"
            (rowClicked)="onUserRowClicked($event)"
            (pageChange)="onPageChange($event.pageIndex + 1)"
          />
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      ::ng-deep .mat-mdc-unelevated-button {
        height: 40px;
      }
    `,
  ],
})
export class NgxsPageComponent implements OnInit {
  #store = inject(Store);
  #dialog = inject(MatDialog);

  columnDefs = usersColumnDefs;

  users = this.#store.selectSignal(UsersPageState.usersViewModel);
  totalItems = this.#store.selectSignal(UsersPageState.totalItems);

  page = this.#store.selectSignal(UsersPageState.page);
  pageSize = this.#store.selectSignal(UsersPageState.pageSize);
  searchQuery = this.#store.selectSignal(UsersPageState.search);

  isInit = this.#store.selectSignal(UsersPageState.isInit);
  isLoading = this.#store.selectSignal(UsersPageState.isLoading);
  isLoaded = this.#store.selectSignal(UsersPageState.isLoaded);
  isError = this.#store.selectSignal(UsersPageState.isError);

  ngOnInit(): void {
    console.log('ngOnInit');
    this.#store.dispatch(new UsersPageActions.FetchAllData());
  }

  onAddUser(): void {
    this.#dialog.open(NgxsManageModalComponent, {
      width: '600px',
      disableClose: true,
    });
  }

  onEditUser(user: User): void {
    this.#dialog.open(NgxsManageModalComponent, {
      width: '600px',
      disableClose: true,
      data: user,
    });
  }

  onUserRowClicked(event: RowClickedEvent<User, any>): void {
    if (event.data === undefined) return;
    this.onEditUser(event.data);
  }

  onPageChange(page: number): void {
    this.#store.dispatch(new UsersPageActions.SetPage(page));
  }

  onDebouncedSearch(value: string): void {
    this.#store.dispatch(new UsersPageActions.SetSearch(value));
  }
}
