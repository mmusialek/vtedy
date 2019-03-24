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
  description: string;
  owner: string;
  releaseAt: Date;

  static newInstance(param: any) {
    return Object.assign(new ProjectViewModel(), param);
  }
}

export class CommentViewModel {
  id: number;
  comment: string;
  author: string;
  date: Date;

  constructor(param: Partial<CommentViewModel>) {
    Object.assign(this, param);
  }
}

export class TagViewModel {
  id: number;
  name: string;
  owner: string;

  constructor(param: Partial<TagViewModel>) {
    Object.assign(this, param);
  }
}
