import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { takeWhile, catchError } from 'rxjs/operators';
import { ProjectDto } from '../../../shared/dto/project.dto';
import { ProjectListItemViewModel } from './project-list.view-model';

@Injectable({
  providedIn: 'root'
})
export class ProjectListService {
  private readonly _baseApiUrl = 'http://localhost:5001/api';

  constructor(private _http: HttpClient) {}

  getProjects() {
    let isAlive = true;
    return new Observable<ProjectListItemViewModel[]>(obs => {
      this._http
        .get<ProjectDto[]>(this._baseApiUrl + '/projects')
        .pipe(
          catchError(err => {
            const res: ProjectListItemViewModel[] = [];
            return of(res);
          }),
          takeWhile(() => isAlive)
        )
        .subscribe(data => {
          const res: ProjectListItemViewModel[] = data.map(elem => {
            return ProjectListItemViewModel.new({
              id: elem.id,
              name: elem.name,
              description: elem.description
            });
          });

          obs.next(res);
          obs.complete();
          isAlive = false;
        });
    });
  }
}
