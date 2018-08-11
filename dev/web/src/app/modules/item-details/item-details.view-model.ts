export class ItemDetailsViewModel {
  isVisible: boolean;
  isDialogPinned = false;
  item: ItemDataViewModel;
}

export class ItemDataViewModel {
  id: string;
  title: string;
  project: ProjectViewModel;
  tags: TagViewModel[];
  date: Date;
  comments: CommentViewModel[];
}

export class ProjectViewModel {
  id: number;
  name: string;
  owner: string;

  constructor(param: { id?: number, name?: string, owner?: string } = {}) {
    this.id = param.id;
    this.name = param.name;
    this.owner = param.owner;
  }
}

export class CommentViewModel {
  id: number;
  comment: string;
  author: string;
  date: Date;

  constructor(param: {id?: number, comment?: string, author?: string, date?: Date } = {}) {
    this.id = param.id;
    this.comment = param.comment;
    this.author = param.author;
    this.date = param.date;
  }
}

export class TagViewModel {
  id: number;
  name: string;
  owner: string;

  constructor(param: { id?: number, name?: string, owner?: string }) {
    this.id = param.id;
    this.name = param.name;
    this.owner = param.owner;
  }
}
