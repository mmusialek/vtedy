export class ItemListViewModel {
  items: ItemListItemViewModel[] = [];
}

export class ItemListItemViewModel {
  name: string;

  constructor(param: { name?: string } = {}) {
    this.name = param.name;
  }
}
