export class ItemListViewModel {
  items: ItemListItemViewModel[] = [];
  isAddNewItemVisible = false;
  newItem: string;
}

export class ItemListItemViewModel {
  name: string;

  constructor(param: { name?: string } = {}) {
    this.name = param.name;
  }
}
