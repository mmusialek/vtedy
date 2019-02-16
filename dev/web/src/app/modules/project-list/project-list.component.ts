import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {takeWhile} from 'rxjs/operators';
import {GenericListItemViewModel} from '../../shared/components/generic-list/generic-list.view-model';
import {ProjectListService} from './project-list.service';
import {ProjectListViewModel} from './project-list.view-model';

@Component({
  selector: 'vth-project-list',
  templateUrl: './project-list.component.html'
})
export class ProjectListComponent implements OnInit {
  viewModel: ProjectListViewModel;
  private _isAlive: boolean;

  constructor(private _router: Router,
              private _projectListService: ProjectListService) {
  }


  ngOnInit(): void {
    this.viewModel = new ProjectListViewModel();
    this._isAlive = true;
    this._projectListService.getProjects().pipe(takeWhile(() => this._isAlive)).subscribe(data => {
      this.viewModel.projects = this.viewModel.projects.splice(0, this.viewModel.projects.length);
      this.viewModel.projectsToList = this.viewModel.projectsToList.splice(0, this.viewModel.projectsToList.length);

      this.viewModel.projects = data;

      this.viewModel.projectsToList = this.viewModel.projects.map(item => {
        {
          return GenericListItemViewModel.new({id: item.id.toString(10), name: item.name});
        }
      });

    }, () => {
    }, () => {
      this._isAlive = true;
    });
  }


  addNewVisibilityHandler() {
    alert('add project dialog');
  }

  onAddProjectClick() {
    this._router.navigate(['../project-management']);
  }

}
