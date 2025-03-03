import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RowClickedEvent } from 'ag-grid-community';
import { User, usersColumnDefs } from '../../../shared/data/users/users.models';
import { DataViewerStore } from '../../../shared/state';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ErrorBannerComponent } from '../../../shared/ui/error-banner/error-banner.component';
import { GridComponent } from '../../../shared/ui/grid/grid.component';
import { LoadingBannerComponent } from '../../../shared/ui/loading-banner/loading-banner.component';
import { SearchInputComponent } from '../../../shared/ui/search-input/search-input.component';
import { usersQuery } from './data/users.queries';
import { ManageUserModalComponent } from './manage-user-modal.component';

@Component({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    SearchInputComponent,
    GridComponent,
    ButtonComponent,
    LoadingBannerComponent,
    ErrorBannerComponent,
  ],
  providers: [DataViewerStore],
  template: `
    <div class="flex h-full flex-col gap-4 p-8">
      <div class="mb-6 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <h1 class="text-2xl font-medium">Users</h1>
          <span class="text-gray-500">{{ totalItems() }} total</span>
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
        (searchChange)="onSearch($event)"
      />

      <div>
        @if (usersQuery.isPending()) {
          <ui-loading-banner />
        }
        @if (usersQuery.isError()) {
          <ui-error-banner />
        }
        @if (usersQuery.isSuccess()) {
          <app-grid
            [data]="users()"
            [columnDefs]="columnDefs"
            [page]="page()"
            [isPlaceholderData]="isPlaceholderData()"
            [totalItems]="totalItems()"
            (rowClicked)="onUserRowClicked($event)"
            (pageChange)="onPageChange($event)"
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
export class NgxsPageComponent {
  #store = inject(DataViewerStore);
  #dialog = inject(MatDialog);

  usersQuery = usersQuery.page(this.#store.requestOptions);
  users = computed(() => this.usersQuery.data()?.items || []);
  totalItems = computed(() => this.usersQuery.data()?.total || 0);
  isPlaceholderData = this.usersQuery.isPlaceholderData;
  prefetchNextPage = usersQuery.prefetchNextPage(this.#store.requestOptions);

  page = this.#store.page;
  columnDefs = usersColumnDefs;

  searchQuery = signal('');

  constructor() {
    effect(() => {
      if (
        !this.usersQuery.isPlaceholderData() &&
        this.usersQuery.data()?.hasMore
      ) {
        this.prefetchNextPage.prefetch();
      }
    });
  }

  public onAddUser() {
    this.#dialog.open(ManageUserModalComponent, {
      width: '600px',
      disableClose: true,
    });
  }

  public onEditUser(user: User) {
    this.#dialog.open(ManageUserModalComponent, {
      width: '600px',
      disableClose: true,
      data: user,
    });
  }

  public onUserRowClicked(event: RowClickedEvent<User, any>) {
    if (event.data === undefined) return;
    this.onEditUser(event.data);
  }

  onPageChange(event: any) {
    this.#store.setPage(event.pageIndex + 1);
  }

  onSearch(value: string) {
    this.searchQuery.set(value);
    this.#store.setSearchQuery(value);
  }
}
