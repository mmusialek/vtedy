import { ProjectDto } from '../dto/project.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsApiService {
  private readonly _baseApiUrl = 'http://localhost:5001/api';

  constructor(private _httpService: HttpClient) {}

  getProjects(): Observable<ProjectDto[]> {
    return this._httpService.get<ProjectDto[]>(this._baseApiUrl + '/Projects');
  }

  getProject(id: number): Observable<ProjectDto> {
    return this._httpService.get<ProjectDto>(
      this._baseApiUrl + `/Projects/${id}`
    );
  }

  update(project: ProjectDto): Observable<ProjectDto> {
    return of({} as ProjectDto);
  }

  add(project: ProjectDto): Observable<ProjectDto> {
    return of({} as ProjectDto);
  }
}
