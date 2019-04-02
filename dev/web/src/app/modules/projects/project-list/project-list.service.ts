import { ProjectsApiService } from '../../../shared/client-services/projects-api.service';
import { Injectable } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectListItemViewModel } from './project-list.view-model';

@Injectable({
  providedIn: 'root'
})
export class ProjectListService {
  constructor(private _projectApiService: ProjectsApiService) {}

  getProjects(): Observable<ProjectListItemViewModel[]> {
    return this._projectApiService.getProjects().pipe(
      map(item => {
        const res: ProjectListItemViewModel[] = item.map(p => {
          return ProjectListItemViewModel.new(p);
        });

        return res;
      })
    );
  }
}
