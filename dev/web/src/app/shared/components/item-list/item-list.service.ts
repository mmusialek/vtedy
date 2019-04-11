import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

import { TodoItemDto } from '../../dto/todo-item.dto';
import { ItemListFilter } from '../../models/item-list-filter';
import { ItemListItemViewModel } from './item-list.view-model';
import { TodoItemsApiService } from '../../client-services/todo-items-api.service';
import { ProjectDto } from '../../dto/project.dto';

@Injectable()
export class ItemListService {
    constructor(private _todoItemsApiServie: TodoItemsApiService) { }

    addItem(item: ItemListItemViewModel): Observable<ItemListItemViewModel> {
        return new Observable(obs => {
            // TODO move to converter
            const todoItem: TodoItemDto = new TodoItemDto();
            todoItem.id = item.id;
            todoItem.name = item.name;
            todoItem.isCurrent = item.isCurrent;
            todoItem.project = new ProjectDto();
            todoItem.project.id = item.projectId;

            let isAlive = true;

            this._todoItemsApiServie
                .add(todoItem)
                .pipe(takeWhile(() => isAlive))
                .subscribe(
                    (p: TodoItemDto) => {
                        item.id = p.id;
                        obs.next(item);
                        obs.complete();

                        isAlive = false;
                    },
                    err => {
                        console.error(err);
                        // TODO: handle error
                    }
                );
        });
    }

    getItems(filter?: ItemListFilter): Observable<ItemListItemViewModel[]> {
        // TODO add filters

        return new Observable(obs => {
            const res: ItemListItemViewModel[] = [];
            let isAlive = true;

            this._todoItemsApiServie
                .get(filter)
                .pipe(takeWhile(() => isAlive))
                .subscribe(
                    (p: TodoItemDto[]) => {

                        if (p) {
                            for (const item of p) {
                                res.push(
                                    new ItemListItemViewModel({ id: item.id, name: item.name })
                                );
                            }
                        }
                        obs.next(res);
                        obs.complete();

                        isAlive = false;
                    },
                    err => {
                        console.error(err);
                        // TODO: handle error
                    }
                );
        });
    }
}
