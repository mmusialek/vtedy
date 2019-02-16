import {GenericListViewModel} from '../../shared/components/generic-list/generic-list.view-model';

export class ProjectListViewModel {
  projectsToList: GenericListViewModel[] = [];
  projects: ProjectListItemViewModel[] = [];
}

export class ProjectListItemViewModel {
  id: string;
  name: string;
  description: string;

  static new(params?: Partial<ProjectListItemViewModel>) {
    return Object.create(params);
  }
}
