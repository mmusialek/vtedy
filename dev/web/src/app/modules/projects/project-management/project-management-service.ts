import { ProjectsApiService } from '../../../shared/client-services/projects-api.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ProjectViewModel } from '../../item-details/item-details.view-model';
import { Observable } from 'rxjs';
import { ProjectDto } from '../../../shared/dto/project.dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementService {
  constructor(private _projectApiService: ProjectsApiService) {}

  getProjets(): Observable<ProjectViewModel[]> {
    return this._projectApiService
      .getProjects()
      .pipe(map(item => ProjectViewModel.newInstance(item)));
  }

  update(project: ProjectViewModel): Observable<ProjectViewModel> {
    const projectDto = new ProjectDto();

    return this._projectApiService
      .update(projectDto)
      .pipe(map(item => ProjectViewModel.newInstance(item)));
  }

  add(project: ProjectViewModel): Observable<ProjectViewModel> {
    const projectDto = new ProjectDto();

    return this._projectApiService
      .add(projectDto)
      .pipe(map(item => ProjectViewModel.newInstance(item)));
  }
}
