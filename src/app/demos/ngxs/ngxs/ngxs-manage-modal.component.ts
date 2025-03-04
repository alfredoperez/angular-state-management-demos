import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { Store } from '@ngxs/store';
import { Project } from '../../../shared/data/projects/projects.models';
import { Team } from '../../../shared/data/teams/teams.models';
import { User } from '../../../shared/data/users/users.models';
import { ButtonComponent } from '../../../shared/ui/button/button.component';
import { ProjectCollectionActions } from './state/projects/project-collection.actions';
import { ProjectCollectionState } from './state/projects/project-collection.state';
import { TeamCollectionActions } from './state/teams/team-collection.actions';
import { TeamCollectionState } from './state/teams/team-collection.state';

@Component({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSelectModule,
    MatChipsModule,
    MatCardModule,
    ButtonComponent,
  ],
  template: `
    <div class="flex h-full w-full flex-col">
      <mat-stepper #stepper class="flex-1" linear>
        <!-- Intro Step -->
        <mat-step [completed]="true">
          <ng-template matStepLabel>Start</ng-template>
          <div class="flex flex-col gap-6 p-6">
            <div class="flex flex-col gap-2">
              <p class="text-base text-gray-600">
                {{
                  user()
                    ? 'Update the user information in the system.'
                    : "Let's get started with adding a new user to the system."
                }}
              </p>
            </div>

            <div class="rounded-lg border border-gray-100 bg-gray-50/50 p-4">
              <h3 class="mb-3 font-medium">What you'll need:</h3>
              <ul class="flex flex-col gap-3">
                <li class="flex items-start gap-3">
                  <div
                    class="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  >
                    <span>👤</span>
                  </div>
                  <div>
                    <p class="font-medium">Basic Information</p>
                    <p class="text-sm text-gray-600">
                      User's full name, email, and job title
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div
                    class="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  >
                    <span>👥</span>
                  </div>
                  <div>
                    <p class="font-medium">Team Assignment</p>
                    <p class="text-sm text-gray-600">
                      Select which team the user will be part of
                    </p>
                  </div>
                </li>
                <li class="flex items-start gap-3">
                  <div
                    class="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                  >
                    <span>✅</span>
                  </div>
                  <div>
                    <p class="font-medium">Review Details</p>
                    <p class="text-sm text-gray-600">
                      Verify all information before finalizing
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="rounded-lg border border-blue-100 bg-blue-50/50 p-4">
              <div class="flex gap-3">
                <div
                  class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700"
                >
                  <span>ℹ️</span>
                </div>
                <div>
                  <p class="font-medium text-blue-900">Important Note</p>
                  <p class="text-sm text-blue-700">
                    {{
                      user()
                        ? 'Changes will be reflected immediately across all systems once saved.'
                        : 'The user will receive an email invitation to set up their account once created.'
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </mat-step>

        <!-- User Details Step -->
        <mat-step [stepControl]="usersFormGroup">
          <ng-template matStepLabel>User</ng-template>
          <form class="p-6" [formGroup]="usersFormGroup">
            <div class="mb-6">
              <mat-form-field class="w-full">
                <mat-label>Name</mat-label>
                <input
                  matInput
                  formControlName="name"
                  placeholder="Full Name"
                />
              </mat-form-field>
            </div>

            <div class="grid grid-cols-2 gap-6">
              <mat-form-field>
                <mat-label>Email</mat-label>
                <input
                  type="email"
                  matInput
                  formControlName="email"
                  placeholder="Email Address"
                />
              </mat-form-field>

              <mat-form-field>
                <mat-label>Title</mat-label>
                <input
                  matInput
                  formControlName="title"
                  placeholder="Job Title"
                />
              </mat-form-field>
            </div>
          </form>
        </mat-step>

        <!-- Team Selection Step -->
        <mat-step>
          <ng-template matStepLabel>Team</ng-template>
          <div class="flex h-[450px] flex-col gap-4 p-6">
            <mat-form-field>
              <mat-label>Select Team</mat-label>
              <mat-select
                [value]="selectedTeam()?.id"
                (selectionChange)="onSelectTeam($event.value)"
              >
                @for (team of teams(); track team.id) {
                  <mat-option [value]="team.id">
                    {{ team.name }}
                  </mat-option>
                }
              </mat-select>
            </mat-form-field>

            @if (selectedTeam()) {
              <div class="flex-1 overflow-hidden">
                <div class="h-full overflow-y-auto px-1">
                  <div class="grid grid-cols-1 gap-4">
                    @for (
                      project of getTeamProjects(selectedTeam()!.id);
                      track project.id
                    ) {
                      <mat-card class="border-0 shadow">
                        <mat-card-header
                          class="flex items-center justify-between pb-2"
                        >
                          <mat-card-title class="text-base">{{
                            project.name
                          }}</mat-card-title>
                          <span
                            class="rounded-full px-2 py-0.5 text-xs font-medium"
                            [class]="getStatusClass(project.status)"
                          >
                            {{ project.status }}
                          </span>
                        </mat-card-header>
                        <mat-card-content class="flex flex-col gap-2">
                          <p class="text-sm text-gray-600">
                            {{ project.description }}
                          </p>
                          <div class="flex flex-wrap gap-1">
                            @for (tech of project.techStack; track tech) {
                              <span
                                class="bg-primary/10 text-primary rounded px-2 py-0.5 text-xs font-medium"
                              >
                                {{ tech }}
                              </span>
                            }
                          </div>
                        </mat-card-content>
                      </mat-card>
                    }
                  </div>
                </div>
              </div>
            }
          </div>
        </mat-step>

        <!-- Review Step -->
        <mat-step>
          <ng-template matStepLabel>Review</ng-template>
          <div class="p-6">
            <div class="rounded-lg border p-4">
              <div class="grid gap-4">
                <div>
                  <p class="text-xs text-gray-500">Name</p>
                  <p class="font-medium">
                    {{ usersFormGroup.get('name')?.value }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Email</p>
                  <p class="font-medium">
                    {{ usersFormGroup.get('email')?.value }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Title</p>
                  <p class="font-medium">
                    {{ usersFormGroup.get('title')?.value }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-gray-500">Team</p>
                  <p class="font-medium">{{ selectedTeam()?.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </mat-step>
      </mat-stepper>

      <!-- Footer -->
      <div class="mb-1 border-t p-4">
        <div class="flex justify-between">
          <ui-button
            [disabled]="!stepper.selectedIndex"
            (clicked)="stepper.previous()"
            label="Back"
            color="accent"
          />
          @if (stepper.selectedIndex === 3) {
            <ui-button
              [disabled]="!isStepValid(stepper.selectedIndex)"
              (clicked)="onSaveUser()"
              label="Save User"
            />
          } @else {
            <ui-button
              [disabled]="!isStepValid(stepper.selectedIndex)"
              (clicked)="stepper.next()"
              label="Next"
            />
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }

      .mat-stepper-horizontal {
        background-color: transparent;
      }

      ::ng-deep .mat-horizontal-stepper-header-container {
        padding: 0 24px;
      }

      ::ng-deep .mat-horizontal-content-container {
        padding: 0 !important;
      }

      .status-active {
        background-color: #10b981;
        color: #fff;
      }

      .status-completed {
        background-color: #3b82f6;
        color: #fff;
      }

      .status-on-hold {
        background-color: #f59e0b;
        color: #fff;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class NgxsManageModalComponent {
  readonly user = input<User | undefined>();

  #dialogRef = inject(MatDialogRef);
  #fb = inject(FormBuilder);
  #store = inject(Store);

  teams = this.#store.selectSignal(TeamCollectionState.getEntities);
  projects = this.#store.selectSignal(ProjectCollectionState.getEntities);
  selectedTeam = signal<Team | undefined>(undefined);

  usersFormGroup = this.#fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    title: ['', [Validators.required]],
  });

  constructor() {
    // Load teams and projects
    this.#store.dispatch(new TeamCollectionActions.FetchAll());
    this.#store.dispatch(new ProjectCollectionActions.FetchAll());

    // If editing user, populate form
    if (this.user()) {
      this.usersFormGroup.patchValue({
        name: this.user()?.name,
        email: this.user()?.email,
        title: this.user()?.title,
      });

      // Set selected team
      const userTeam = this.teams().find(
        (team) => team.id === this.user()?.teamId,
      );
      if (userTeam) {
        this.selectedTeam.set(userTeam);
      }
    }
  }

  onSelectTeam(teamId: string) {
    const team = this.teams().find((t) => t.id === teamId);
    this.selectedTeam.set(team);
  }

  getTeamProjects(teamId: string): Project[] {
    return this.projects().filter((project) => project.teamId === teamId);
  }

  getStatusClass(status: 'active' | 'completed' | 'on-hold'): string {
    return `status-${status}`;
  }

  onSaveUser() {
    if (this.usersFormGroup.invalid || !this.selectedTeam()) {
      return;
    }

    const { name, email, title } = this.usersFormGroup.value;
    if (!name || !email || !title) return;

    const user = {
      id: this.user()?.id,
      name,
      email,
      title,
      teamId: this.selectedTeam()!.id,
      createdAt: this.user()?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as User;

    this.#dialogRef.close(user);
  }

  isStepValid(index: number): boolean {
    // Implement the logic to determine if a step is valid
    return true; // Placeholder, actual implementation needed
  }
}
