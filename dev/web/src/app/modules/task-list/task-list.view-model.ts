export class TaskListViewModel {

  items: TaskListItemViewModel[] = [];

}

export class TaskListItemViewModel {
  id: string;
  name: string;

  constructor(param?: Partial<TaskListViewModel>) {
    Object.assign(this, param);
  }
}
