import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectViewModel } from '../../item-details/item-details.view-model';
import { ProjectManagementViewModel } from './project-management.view-model';
import { ProjectDto } from '../../../shared/dto/project.dto';

@Component({
  selector: 'vth-project-management',
  templateUrl: './project-management.component.html'
})
export class ProjectManagementComponent implements OnInit {
  viewModel: ProjectManagementViewModel;
  private _isEditModel = false;

  constructor(private _router: Router, private _route: ActivatedRoute) {}

  ngOnInit() {
    this.viewModel = new ProjectManagementViewModel();

    const id = this._route.snapshot.params['id'] as number;

    if (id) {
      this._isEditModel = true;
      const projectDto = this._route.snapshot.data['project'] as ProjectDto;

      const projectModel = ProjectViewModel.newInstance(projectDto);
      this.viewModel.project = projectModel;
    } else {
      this.viewModel.project = new ProjectViewModel();
    }
  }

  onFormSave() {
    if (this._isEditModel) {
    } else {
    }

    this._router.navigate(['./panel/projects']);
  }

  onCancelClick() {
    this._router.navigate(['./panel/projects']);
  }
}
