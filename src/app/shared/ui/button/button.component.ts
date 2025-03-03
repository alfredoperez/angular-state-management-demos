import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ui-button',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <button
      class="rounded-full"
      [color]="color()"
      [disabled]="disabled()"
      (click)="clicked.emit($event)"
      mat-flat-button
    >
      <span class="flex items-center gap-1">
        @if (icon()) {
          <mat-icon>{{ icon() }}</mat-icon>
        }
        {{ label() }}
      </span>
    </button>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }

      button {
        height: 40px;
        padding: 0 24px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  color = input<'primary' | 'accent' | 'warn'>('primary');
  icon = input<string>();
  label = input.required<string>();
  disabled = input<boolean>(false);

  clicked = output<MouseEvent>();
}
