export class GenericListViewModel {
  areDetailsVisible = false;
}

export class GenericListItemViewModel {
  id: string;
  name: string;

  constructor(param: { id?: string, name?: string } = {}) {
    this.id = param.id;
    this.name = param.name;
  }

  static new(param: any) {
    const res =  Object.assign(new GenericListItemViewModel(), param);
    res.id = param.projectId;

    return res;
  }
}
