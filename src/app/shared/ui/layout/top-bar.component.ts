import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'ui-top-bar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  template: `
    <div class="border-b border-gray-200 bg-gray-50">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="text-xl font-semibold text-gray-900">{{ title() }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  title = input.required<string>();
}
