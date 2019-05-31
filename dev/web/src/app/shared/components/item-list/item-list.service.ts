import { CommentDto } from './../../dto/comment.dto';
import { ItemDataViewModel, ProjectViewModel, TagViewModel, CommentViewModel, ItemDetailsViewModel } from './../../../modules/item-details/item-details.view-model';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { takeWhile, map, switchMap, mergeMap, catchError } from 'rxjs/operators';

import { TodoItemDto } from '../../dto/todo-item.dto';
import { ItemListFilter } from '../../models/item-list-filter';
import { ItemListItemViewModel, TodoItemViewModel } from './item-list.view-model';
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
            todoItem.project.projectId = item.projectId;

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


    getItemDetails(itemId: string) {
        return this._todoItemsApiServie.getComments(itemId).pipe(
            switchMap(data =>
                this._todoItemsApiServie.getById(itemId)
                    .pipe(map(todoItemDto => {
                        const todo = this.toItemDataViewModel(todoItemDto);
                        const comments = data.map(commentDto => this.toCommentViewModel(commentDto));
                        todo.comments = comments;
                        return todo;
                    }))
            ));

        // map(item => {
        //     const res = this.toItemDataViewModel(item);
        //     isAlive = false;
        //     return res;
        // }),
        // switchMap(data => this._todoItemsApiServie.getComments(itemId)
        //     .pipe(map(commentItems => data.comments = commentItems.map(comment => this.toCommentViewModel(comment))))),
        // catchError(error => of({} as ItemDataViewModel))
        // );

        // this._todoItemsApiServie.getById(itemId).pipe(
        //     takeWhile(_ => isAlive),
        //     map(item => {
        //         const res = this.toItemDataViewModel(item);
        //         isAlive = false;
        //         return res;
        //     }),
        //     switchMap(data => this._todoItemsApiServie.getComments(itemId)
        //         .pipe(map(commentItems => data.comments = commentItems.map(comment => this.toCommentViewModel(comment))),)),
        //     catchError(error => of({} as ItemDataViewModel))
        // );

        // .pipe(
        //     takeWhile(_ => isAlive),
        //     switchMap(data => this._todoItemsApiServie.getComments(itemId))
        // );
    }

    private toCommentViewModel(dto: CommentDto) {
        return CommentViewModel.new({
            id: dto.createdBy.id,
            author: dto.createdBy.userName,
            authorEmail: dto.createdBy.email,
            comment: dto.content,
            date: dto.createdDate
        });
    }

    private toItemDataViewModel(dto: TodoItemDto) {
        const res = new ItemDataViewModel();

        if (dto) {
            res.id = dto.id;
            res.name = dto.name;
            res.isCurrent = dto.isCurrent;
            res.project = new ProjectViewModel();
            res.project.id = dto.project.projectId;
            res.project.name = dto.project.name;
            res.project.description = dto.project.description;
            res.project.releaseAt = dto.project.releaseAt;
            res.project.owner = 'NA';
            res.tags = dto.tags.map(item => new TagViewModel(item));

            // res.comments = dto.
        }

        return res;
    }
}
