import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../../shared/data/users/users.models';
import { ButtonComponent } from '../../../shared/ui/button/button.component';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ButtonComponent,
  ],
  template: `
    <div class="bg-base-100 flex flex-col p-8" [formGroup]="usersFormGroup">
      <h1 class="mb-2 text-2xl font-semibold">Add a new user</h1>
      <p class="mb-6 text-sm text-gray-500">
        Here you can add a new user to the system
      </p>

      <div class="grid grid-cols-2 gap-6">
        <div class="col-span-2">
          <mat-form-field class="w-full">
            <mat-label>Name</mat-label>
            <input matInput formControlName="name" placeholder="Full Name" />
          </mat-form-field>
        </div>

        <div>
          <mat-form-field class="w-full">
            <mat-label>Age</mat-label>
            <input
              type="number"
              matInput
              formControlName="age"
              placeholder="Age"
            />
          </mat-form-field>
        </div>

        <div>
          <mat-form-field class="w-full">
            <mat-label>Email</mat-label>
            <input
              type="email"
              matInput
              formControlName="email"
              placeholder="Email Address"
            />
          </mat-form-field>
        </div>

        <div class="col-span-2">
          <mat-form-field class="w-full">
            <mat-label>Company</mat-label>
            <input
              matInput
              formControlName="company"
              placeholder="Company Name"
            />
          </mat-form-field>
        </div>

        <div>
          <mat-form-field class="w-full">
            <mat-label>Title</mat-label>
            <input matInput formControlName="title" placeholder="Job Title" />
          </mat-form-field>
        </div>

        <div>
          <mat-form-field class="w-full">
            <mat-label>Department</mat-label>
            <input
              matInput
              formControlName="department"
              placeholder="Department"
            />
          </mat-form-field>
        </div>
      </div>

      <div class="mt-8 flex justify-end gap-2">
        <ui-button (clicked)="onCancel()" label="Cancel" color="accent" />
        <ui-button
          [disabled]="!usersFormGroup.valid"
          (clicked)="onSaveUser()"
          label="Save"
        />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxsManageModalComponent {
  #dialogRef = inject(MatDialogRef);
  #fb = inject(FormBuilder);

  usersFormGroup = this.#fb.group({
    name: ['', [Validators.required]],
    age: ['', [Validators.required, Validators.min(18), Validators.max(120)]],
    email: ['', [Validators.required, Validators.email]],
    company: ['', [Validators.required]],
    title: ['', [Validators.required]],
    department: ['', [Validators.required]],
  });

  public onSaveUser() {
    if (this.usersFormGroup === undefined || this.usersFormGroup.invalid) {
      return;
    }

    const { name, age, email, company, title, department } =
      this.usersFormGroup.value;
    if (!name || !age || !email || !company || !title || !department) return;

    const user = {
      name,
      age,
      email,
      company,
      title,
      department,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as unknown as User;

    this.#dialogRef.close();
  }

  onCancel() {
    this.#dialogRef.close();
  }
}
