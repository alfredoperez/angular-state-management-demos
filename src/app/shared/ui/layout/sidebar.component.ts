import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ui-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <aside class="flex h-full w-60 flex-col bg-[#0F1525] text-gray-300">
      <div class="flex h-16 items-center px-6">
        <span class="text-xl font-bold text-white">Demos</span>
      </div>

      <!-- Signal Store Section -->
      <div class="px-3 py-4">
        <div class="mb-2 px-3 text-xs font-bold text-indigo-400 uppercase">
          Signal Store
        </div>
        <nav class="space-y-1">
          <a
            class="flex items-center rounded-lg px-3 py-2 text-sm hover:bg-[#1A2233] hover:text-white"
            routerLink="/signal-store"
            routerLinkActive="bg-[#1A2233] text-white"
          >
            Signal Store
          </a>
          <a
            class="flex items-center rounded-lg px-3 py-2 text-sm hover:bg-[#1A2233] hover:text-white"
            routerLink="/signal-store-entities"
            routerLinkActive="bg-[#1A2233] text-white"
          >
            Signal Store and Entities
          </a>
          <a
            class="flex items-center rounded-lg px-3 py-2 text-sm hover:bg-[#1A2233] hover:text-white"
            routerLink="/signal-store-and-query"
            routerLinkActive="bg-[#1A2233] text-white"
          >
            Signal Store and Query
          </a>
        </nav>
      </div>

      <!-- NGXS Section -->
      <div class="px-3 py-4">
        <div class="mb-2 px-3 text-xs font-bold text-indigo-400 uppercase">
          NGXS
        </div>
        <nav class="space-y-1">
          <a
            class="flex items-center rounded-lg px-3 py-2 text-sm hover:bg-[#1A2233] hover:text-white"
            routerLink="/ngxs"
            routerLinkActive="bg-[#1A2233] text-white"
          >
            NGXS
          </a>
          <a
            class="flex items-center rounded-lg px-3 py-2 text-sm hover:bg-[#1A2233] hover:text-white"
            routerLink="/ngxs-entities"
            routerLinkActive="bg-[#1A2233] text-white"
          >
            NGXS and Entities
          </a>
          <a
            class="flex items-center rounded-lg px-3 py-2 text-sm hover:bg-[#1A2233] hover:text-white"
            routerLink="/ngxs-query"
            routerLinkActive="bg-[#1A2233] text-white"
          >
            NGXS and Query
          </a>
        </nav>
      </div>
    </aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
