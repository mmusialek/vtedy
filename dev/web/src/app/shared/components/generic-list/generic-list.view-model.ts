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

  static new(param: { id?: string, name?: string }) {
    return Object.create(param);
  }
}
