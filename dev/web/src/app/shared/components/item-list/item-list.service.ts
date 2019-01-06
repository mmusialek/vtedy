import {Injectable} from '@angular/core';
import {ItemListItemViewModel} from './item-list.view-model';
import {Observable} from 'rxjs';
import {VtedyClientService} from '../../client-services/vtedy.client-service';
import {TodoItemDto} from '../../dto/todo-item.dto';
import {ItemListFilter} from '../../models/item-list-filter';


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

  getItems(filter?: ItemListFilter): Observable<ItemListItemViewModel[]> {

    // TODO add filters

    return new Observable(obs => {
      const res: ItemListItemViewModel[] = [];

      const subscriber = this._vtedyService.getItems(filter).subscribe((p: any) => {
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

}

