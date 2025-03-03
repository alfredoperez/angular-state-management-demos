import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Project } from './projects.models';

@Injectable({ providedIn: 'root' })
export class ProjectsApiService extends ApiService<Project> {
  constructor() {
    super('projects');
  }
}
