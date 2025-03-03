import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar.component';

@Component({
  selector: 'ui-page-container',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  template: `
    <div class="flex min-h-screen w-full">
      <ui-sidebar />
      <div class="flex flex-1 flex-col">
        <main class="flex flex-1 justify-center bg-gray-50">
          <div class="w-full max-w-7xl px-4 py-6">
            <div class="rounded-lg bg-white p-6 shadow-sm">
              <router-outlet></router-outlet>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageContainerComponent {
  title = input<string>('State Management Demos');
}
