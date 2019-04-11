import { Project } from './../../../shared/models/project';
import {IGenericListComponentConfig} from '../../../shared/components/generic-list/generic-list.component';
import {GenericListViewModel} from '../../../shared/components/generic-list/generic-list.view-model';

export class ProjectListViewModel {
  projectsToList: GenericListViewModel[] = [];
  projects: Project[] = [];

  genericListConfig: IGenericListComponentConfig;
}

