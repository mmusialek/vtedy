import {Injectable} from '@angular/core';
import {ItemListItemViewModel} from './item-list.view-model';
import {Observable} from 'rxjs';
import {VtedyClientService} from '../../shared/client-services/vtedy.client-service';
import {TodoItemDto} from '../../shared/dto/todo-item.dto';


@Injectable()
export class ItemListService {

  constructor(private _vtedyService: VtedyClientService) {

  }

  addItem(item: ItemListItemViewModel): Observable<ItemListItemViewModel> {

    return new Observable(obs => {

      // TODO move to converter
      const todoItem: TodoItemDto = new TodoItemDto();
      todoItem.id = item.id;
      todoItem.name = item.name;

      const subscriber = this._vtedyService.addItem(todoItem).subscribe((p: TodoItemDto) => {
        item.id = p.id;
        obs.next(item);
        obs.complete();

        if (subscriber) {
          subscriber.unsubscribe();
        }

      }, err => {
        console.error(err);
      });
    });
  }

  getCurrentItems(filter?: ItemListFilter): Observable<ItemListItemViewModel[]> {

    // TODO add filters

    return new Observable(obs => {
      const res: ItemListItemViewModel[] = [];
      const subscriber = this._vtedyService.getItems().subscribe((p: any) => {
        for (const item of p) {
          res.push(new ItemListItemViewModel({id: item.id, name: item.name}));
        }

        obs.next(res);
        obs.complete();

        if (subscriber) {
          subscriber.unsubscribe();
        }
      }, err => {
        console.error(err);
      });
    });
  }

  getInboxItems(filter?: ItemListFilter) {

    // TODO integrate with API

    const res: ItemListItemViewModel[] = [];
    res.push(
      new ItemListItemViewModel({id: '1', name: 'inbox 1'}),
      new ItemListItemViewModel({id: '2', name: 'inbox 2'}),
      new ItemListItemViewModel({id: '3', name: 'inbox 3'})
    );
    return res;
  }

  getProjectsItems(filter?: ItemListFilter) {

    // TODO integrate with API

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
