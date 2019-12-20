import { ProjectsService } from './../../../shared/services/projects.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericListItemViewModel } from '../../../shared/components/generic-list/generic-list.view-model';
import { ProjectListViewModel } from './project-list.view-model';

@Component({
    selector: 'vth-project-list',
    templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {
    viewModel: ProjectListViewModel;

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _projectsService: ProjectsService
    ) { }

    ngOnInit(): void {
        this.viewModel = new ProjectListViewModel();

        this.viewModel.genericListConfig = {
            addNewVisibilityHandler: this.addNewVisibilityHandler.bind(this),
            itemClickHandler: this.showProjectDetails.bind(this)
        };

        this.viewModel.projects = this.viewModel.projects.splice(0, this.viewModel.projects.length);
        this.viewModel.projectsToList = this.viewModel.projectsToList.splice(0, this.viewModel.projectsToList.length);

        this.viewModel.projects = this._projectsService.projects;

        this.viewModel.projectsToList = this.viewModel.projects.map(item => {
            {
                return GenericListItemViewModel.new(item);
            }
        });
    }

    addNewVisibilityHandler() {
        this._router.navigate(['../create'], { relativeTo: this._route });
    }

    showProjectDetails(event: MouseEvent, item: GenericListItemViewModel) {
        this._router.navigate(['../edit', item.id], { relativeTo: this._route });
    }

    onAddProjectClick() {
        this._router.navigate(['../project-management']);
    }
}
