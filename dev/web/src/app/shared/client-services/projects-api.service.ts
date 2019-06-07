import { ProjectDto } from '../dto/project.dto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ApiServiceBase } from './api-service-base';

@Injectable({
    providedIn: 'root'
})
export class ProjectsApiService extends ApiServiceBase {

    constructor(private _httpService: HttpClient) {
        super();
    }

    getProjects(): Observable<ProjectDto[]> {
        return this._httpService.get<ProjectDto[]>(`${this.baseApiUrl}/Projects`);
    }

    getProject(id: number): Observable<ProjectDto> {
        return this._httpService.get<ProjectDto>(this.baseApiUrl + `/Projects/${id}`);
    }

    update(project: ProjectDto): Observable<ProjectDto> {
        const request = project;
        return this._httpService.put<ProjectDto>(`${this.baseApiUrl}/Projects/${project.projectId}`, request);
    }

    add(project: ProjectDto): Observable<ProjectDto> {
        const request = project;
        return this._httpService.post<ProjectDto>(`${this.baseApiUrl}/Projects`, request);
    }
}
