import { Injectable } from '@angular/core';
import { ProjectsApiService } from '../client-services/projects-api.service';
import { Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/project';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {

    private _projects: Project[] = [];

    constructor(private _projectApiService: ProjectsApiService) { }

    get projects(): Project[] {
        return this._projects;
    }

    loadData() {
        return merge(this.getProjects());
    }

    private getProjects(): Observable<Project[]> {
        return this._projectApiService.getProjects().pipe(
            map(item => {
                this._projects = item.map(p => {
                    return Project.new(p);
                });

                return this._projects;
            })
        );
    }
}
