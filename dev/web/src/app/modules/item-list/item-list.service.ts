import { Injectable } from '@angular/core';
import { ItemListItemViewModel } from './item-list.view-model';


@Injectable()
export class ItemListService {

  getCurrentItems(filter?: ItemListFilter) {
    const res: ItemListItemViewModel[] = [];
    res.push(new ItemListItemViewModel({id: '1', name: 'priority box line 1'}),
      new ItemListItemViewModel({id: '2', name: 'priority box line 2'}),
      new ItemListItemViewModel({id: '3', name: 'priority box line 3'}));

    return res;
  }

  getInboxItems(filter?: ItemListFilter) {
    const res: ItemListItemViewModel[] = [];
    res.push(
      new ItemListItemViewModel({id: '1', name: 'inbox 1'}),
      new ItemListItemViewModel({id: '2', name: 'inbox 2'}),
      new ItemListItemViewModel({id: '3', name: 'inbox 3'})
    );
    return res;
  }

  getProjectsItems(filter?: ItemListFilter) {
    const res: ItemListItemViewModel[] = [];
    res.push(
      new ItemListItemViewModel({id: '1', name: 'project 1'}),
      new ItemListItemViewModel({id: '2', name: 'project 2'}),
      new ItemListItemViewModel({id: '3', name: 'project 3'})
    );
    return res;
  }

}

export class ItemListFilter {
  date?: Date;

}
