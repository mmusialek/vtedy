import { ProjectsService } from './../services/projects.service';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, merge, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataResolver implements Resolve<boolean> {

    constructor(private _projectService: ProjectsService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        const res = merge(this._projectService.loadData()).pipe(mergeMap(item => of(true)));
        return res;
    }

}
