import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProjectViewModel} from '../item-details/item-details.view-model';
import {ProjectManagementViewModel} from './project-management.view-model';

@Component({
  selector: 'vth-project-management',
  templateUrl: './project-management.component.html'
})
export class ProjectManagementComponent implements OnInit {

  viewModel: ProjectManagementViewModel;

  constructor(private _router: Router) {
  }

  ngOnInit() {
    this.viewModel = new ProjectManagementViewModel();

    this.viewModel.project = new ProjectViewModel();
  }

  onFormSave() {
    this._router.navigate(['./item-list/projects']);
  }

  onCancelClick() {
    this._router.navigate(['./item-list/projects']);
  }

}
