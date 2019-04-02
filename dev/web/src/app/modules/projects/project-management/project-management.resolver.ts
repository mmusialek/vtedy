import { ProjectDto } from '../../../shared/dto/project.dto';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProjectsApiService } from '../../../shared/client-services/projects-api.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagementResolver implements Resolve<ProjectDto> {
  constructor(
    private _projectApiService: ProjectsApiService
  ) {}

  resolve(
    route: import('@angular/router').ActivatedRouteSnapshot,
    state: import('@angular/router').RouterStateSnapshot
  ): ProjectDto | Observable<ProjectDto> | Promise<ProjectDto> {
    const id = route.params['id'] as number;

    return this._projectApiService.getProject(id).pipe(
      catchError(err => {
        // TODO: log error
        return of(undefined);
      })
    );
  }
}
