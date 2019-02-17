export class ItemListViewModel {
  isAddNewItemVisible = false;
  newItem: string;
}

export class ItemListItemViewModel {
  id: string;
  name: string;

  constructor(param: {id?: string,  name?: string } = {}) {
    this.id = param.id;
    this.name = param.name;
  }
}


export class PagesRoues {
  static readonly PriorityBox = 'priority-box';
  static readonly Inbox = 'inbox';
  static readonly Projects = 'projects';
  static readonly Calendar = 'calendar';
}
