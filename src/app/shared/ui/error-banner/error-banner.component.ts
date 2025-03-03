import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ui-error-banner',
  imports: [CommonModule, MatIconModule],
  template: `
    <div
      class="flex w-full items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4"
    >
      <div
        class="flex h-10 w-10 items-center justify-center rounded-full bg-red-100"
      >
        <mat-icon class="text-red-600">error_outline</mat-icon>
      </div>
      <div class="flex-1">
        <h3 class="font-medium text-red-800">Error</h3>
        <p class="text-red-600">An error occurred while loading data</p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorBannerComponent {}
