import { Component, input, output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, RowClickedEvent, themeQuartz } from 'ag-grid-community';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [AgGridAngular, MatPaginatorModule],
  template: `
    <div [style.opacity]="isPlaceholderData() ? 0.5 : 1">
      <ag-grid-angular
        class="border-round"
        [rowData]="data()"
        [theme]="theme"
        [columnDefs]="columnDefs()"
        (rowClicked)="onRowClicked($event)"
        style="width: 100%; height: 500px"
      />

      <mat-paginator
        aria-label="Select page"
        [length]="totalItems()"
        [pageSize]="10"
        [pageSizeOptions]="[10, 20, 30]"
        [pageIndex]="page()"
        (page)="onPageChange($event)"
      >
      </mat-paginator>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .border-round {
        border-radius: 4px;
        overflow: hidden;
      }
    `,
  ],
})
export class GridComponent {
  data = input.required<any[]>();
  columnDefs = input.required<ColDef[]>();
  isPlaceholderData = input<boolean>(false);
  page = input<number>(0);
  totalItems = input<number>(0);

  theme = themeQuartz;

  rowClicked = output<RowClickedEvent>();
  pageChange = output<PageEvent>();

  onRowClicked(event: RowClickedEvent) {
    this.rowClicked.emit(event);
  }

  onPageChange(event: PageEvent) {
    this.pageChange.emit(event);
  }
}
