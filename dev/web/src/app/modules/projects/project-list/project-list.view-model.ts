import {IGenericListComponentConfig} from '../../../shared/components/generic-list/generic-list.component';
import {GenericListViewModel} from '../../../shared/components/generic-list/generic-list.view-model';

export class ProjectListViewModel {
  projectsToList: GenericListViewModel[] = [];
  projects: ProjectListItemViewModel[] = [];

  genericListConfig: IGenericListComponentConfig;
}

export class ProjectListItemViewModel {
  id: number;
  name: string;
  description: string;

  static new(params?: Partial<ProjectListItemViewModel>) {
    return Object.create(params);
  }
}
