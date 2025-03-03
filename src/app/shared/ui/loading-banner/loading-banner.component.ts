import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'ui-loading-banner',
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="flex flex-col items-center justify-center gap-4 p-8">
      <mat-spinner
        class="opacity-60"
        [strokeWidth]="4"
        diameter="48"
      ></mat-spinner>
      <span class="text-sm text-gray-500">Loading...</span>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      ::ng-deep .mat-mdc-progress-spinner {
        --mdc-circular-progress-active-indicator-color: theme(
          'colors.indigo.600'
        );
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingBannerComponent {}
