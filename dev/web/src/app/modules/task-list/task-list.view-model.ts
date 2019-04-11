export class TaskListViewModel {

    pageType: string;
    items: TaskListItemViewModel[] = [];
}

export class TaskListItemViewModel {
    id: string;
    name: string;

    constructor(param?: Partial<TaskListViewModel>) {
        Object.assign(this, param);
    }
}
