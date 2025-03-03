import { Component, model } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule, MatFormFieldModule, MatIconModule, MatInputModule],
  template: `
    <mat-form-field appearance="outline" class="search-field w-full">
      <mat-icon class="text-gray-400" matPrefix>search</mat-icon>
      <input
        type="text"
        [ngModel]="search()"
        [disabled]="isDisabled"
        (ngModelChange)="onSearchChange($event)"
        matInput
        placeholder="Search contacts"
      />
    </mat-form-field>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .mat-mdc-form-field.search-field {
        --mdc-shape-small: 9999px;
      }

      ::ng-deep .search-field {
        .mat-mdc-text-field-wrapper {
          background-color: white;
          padding: 0 4px;
        }

        .mat-mdc-form-field-flex {
          height: 48px;
          align-items: center;
        }

        .mdc-notched-outline__leading {
          border-radius: 9999px 0 0 9999px !important;
          border-color: #e5e7eb !important;
        }

        .mdc-notched-outline__trailing {
          border-radius: 0 9999px 9999px 0 !important;
          border-color: #e5e7eb !important;
        }

        .mdc-notched-outline__notch {
          border-color: #e5e7eb !important;
        }

        .mat-mdc-form-field-infix {
          padding: 8px 0;
        }
      }
    `,
  ],
})
export class SearchInputComponent {
  search = model.required<string>();

  isDisabled = false;

  #searchSubject = new Subject<string>();

  constructor() {
    this.#searchSubject
      .pipe(
        debounceTime(300),
        filter((value) => value.length > 0),
        distinctUntilChanged(),
        takeUntilDestroyed(),
      )
      .subscribe((value) => this.search.set(value));
  }

  onSearchChange(value: string) {
    this.#searchSubject.next(value);
  }
}
