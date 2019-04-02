import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectViewModel } from '../../item-details/item-details.view-model';
import { ProjectManagementViewModel } from './project-management.view-model';
import { ProjectDto } from '../../../shared/dto/project.dto';
import { ProjectManagementService } from './project-management-service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'vth-project-management',
  templateUrl: './project-management.component.html'
})
export class ProjectManagementComponent implements OnInit, OnDestroy {
  viewModel: ProjectManagementViewModel;
  private _isEditModel = false;
  private _isAlive = true;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _projectManagementServcice: ProjectManagementService
  ) {}

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

  ngOnDestroy(): void {
    this._isAlive = false;
  }

  onFormSave() {
    if (this._isEditModel) {
      this._projectManagementServcice
        .update(this.viewModel.project)
        .pipe(takeWhile(() => this._isAlive))
        .subscribe(item => {
            this._router.navigate(['./panel/projects']);
        });
    } else {
      this._projectManagementServcice.add(this.viewModel.project)
      .pipe(takeWhile(() => this._isAlive))
      .subscribe(item => {
          this._router.navigate(['./panel/projects']);
      });
    }
  }

  onCancelClick() {
    this._router.navigate(['./panel/projects']);
  }
}
