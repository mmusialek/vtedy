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

  getProjects(): Observable<ProjectViewModel[]> {
    return this._projectApiService
      .getProjects()
      .pipe(map(item => item.map(p => ProjectViewModel.newInstance(p))));
  }

  update(project: ProjectViewModel): Observable<ProjectViewModel> {
    const projectDto = ProjectDto.new(project);

    return this._projectApiService
      .update(projectDto)
      .pipe(map(item => ProjectViewModel.newInstance(item)));
  }

  add(project: ProjectViewModel): Observable<ProjectViewModel> {
    const projectDto = ProjectDto.new(project);

    return this._projectApiService
      .add(projectDto)
      .pipe(map(item => ProjectViewModel.newInstance(item)));
  }
}
