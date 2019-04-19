import { ItemDataViewModel } from './../../../modules/item-details/item-details.view-model';
import { Project } from './../../models/project';
import { IGenericListComponentConfig } from '../generic-list/generic-list.component';

export class ItemListViewModel {
    areDetailsVisible = false;
    isAddNewItemVisible = false;
    newItem: string;

    itemDetails: ItemDataViewModel;

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

export class TodoItemViewModel {
    id: string;
    name: string;
    description: string;
    isCurrent: boolean;
    project: Project;
    comments: string[];

    static new(param: any) {
        const res = Object.assign(new TodoItemViewModel(), param);

        return res;
    }
}

export class PagesRoues {
    static readonly PriorityBox = 'priority-box';
    static readonly Inbox = 'inbox';
    static readonly Projects = 'projects';
    static readonly Calendar = 'calendar';
}
