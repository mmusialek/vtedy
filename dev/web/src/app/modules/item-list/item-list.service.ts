import { Injectable } from '@angular/core';
import { ItemListItemViewModel } from './item-list.view-model';



@Injectable()
export class ItemListService {

  getCurrentItems(filter?: ItemListFilter) {
    const res: ItemListItemViewModel[] = [];
    res.push(new ItemListItemViewModel({ name: 'priority box line 1' }),
      new ItemListItemViewModel({ name: 'priority box line 2' }),
      new ItemListItemViewModel({ name: 'priority box line 3' }));

    return res;
  }

  getInboxItems(filter?: ItemListFilter) {
    const res: ItemListItemViewModel[] = [];
    res.push(
      new ItemListItemViewModel({ name: 'inbox 1' }),
      new ItemListItemViewModel({ name: 'inbox 2' }),
      new ItemListItemViewModel({ name: 'inbox 3' })
    );
    return res;
  }

  getProjectsItems(filter?: ItemListFilter) {
    const res: ItemListItemViewModel[] = [];
    res.push(
      new ItemListItemViewModel({ name: 'project 1' }),
      new ItemListItemViewModel({ name: 'project 2' }),
      new ItemListItemViewModel({ name: 'project 3' })
    );
    return res;
  }

}

export class ItemListFilter {
  date?: Date;

}
