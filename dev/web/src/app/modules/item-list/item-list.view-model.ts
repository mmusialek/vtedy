export class ItemListViewModel {
  items: ItemListItemViewModel[] = [];
  isAddNewItemVisible = false;
  areDetailsVisible = false;
  newItem: string;
}

export class ItemListItemViewModel {
  id: string;
  name: string;

  constructor(param: {id?: string,  name?: string } = {}) {
    this.id = param.id;
    this.name = param.name;
  }
}
