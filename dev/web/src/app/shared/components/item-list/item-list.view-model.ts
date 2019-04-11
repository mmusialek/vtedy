import {IGenericListComponentConfig} from '../generic-list/generic-list.component';

export class ItemListViewModel {
  areDetailsVisible = false;
  isAddNewItemVisible = false;
  newItem: string;

  genericListConfig: IGenericListComponentConfig;
}

export class ItemListItemViewModel {
  id: string;
  name: string;
  isCurrent: boolean;
  projectId: number;

  constructor(param: { id?: string, name?: string, isCurrent?: boolean, projectId?: number } = {}) {
    this.id = param.id;
    this.name = param.name;
    this.isCurrent = param.isCurrent;
    this.projectId = param.projectId;
  }
}


export class PagesRoues {
  static readonly PriorityBox = 'priority-box';
  static readonly Inbox = 'inbox';
  static readonly Projects = 'projects';
  static readonly Calendar = 'calendar';
}
