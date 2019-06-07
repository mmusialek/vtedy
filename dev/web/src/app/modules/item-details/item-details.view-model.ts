export class ItemDetailsViewModel {
    isVisible: boolean;
    isDialogPinned = false;
    isEditItemOpened = false;
    item: ItemDataViewModel;
}

export class ItemDataViewModel {
    id: string;
    name: string;
    description: string;
    isCurrent: boolean;
    project: ProjectViewModel;
    tags: TagViewModel[] = [];
    date: Date;
    comments: CommentViewModel[] = [];
    newComment: string;
}

export class ProjectViewModel {
    id: number;
    name: string;
    description: string;
    owner: string;
    releaseAt: Date;

    static newInstance(param: any) {
        return Object.assign(new ProjectViewModel(), param);
    }
}

export class CommentViewModel {
    id: string;
    comment: string;
    author: string;
    authorEmail: string;
    date: Date;

    static new(params: any) {
        return Object.assign(new CommentViewModel(), params);
    }
}

export class TagViewModel {
    id: number;
    name: string;
    owner: string;

    constructor(param: any) {
        Object.assign(this, param);
    }
}
