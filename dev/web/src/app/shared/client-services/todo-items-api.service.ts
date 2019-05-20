import { Injectable } from '@angular/core';
import { ApiServiceBase } from './api-service-base';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TodoItemDto } from '../dto/todo-item.dto';
import { Observable } from 'rxjs';
import { ItemListFilter } from '../models/item-list-filter';
import { CommentCreateRequestDto, CommentDto } from '../dto/comment.dto';

@Injectable({
    providedIn: 'root'
})
export class TodoItemsApiService extends ApiServiceBase {
    constructor(private _httpService: HttpClient) {
        super();
    }

    get(filter: ItemListFilter): Observable<TodoItemDto[]> {
        let params = new HttpParams();

        if (filter) {
            if (filter.isCurrentItem !== undefined) {
                params = params.set(
                    'isCurrentItem',
                    filter.isCurrentItem.toString()
                );
            }
        }

        return this._httpService.get<TodoItemDto[]>(
            `${this.baseApiUrl}/TodoItems`,
            {
                params: params
            }
        );
    }

    getById(id: string): Observable<TodoItemDto> {
        return this._httpService.get<TodoItemDto>(
            this.baseApiUrl + `/TodoItems/${id}`
        );
    }

    update(item: TodoItemDto): Observable<TodoItemDto> {
        const request = item;
        return this._httpService.put<TodoItemDto>(
            `${this.baseApiUrl}/TodoItems/${item.id}`,
            request
        );
    }

    add(item: TodoItemDto): Observable<TodoItemDto> {
        const request = item;
        return this._httpService.post<TodoItemDto>(
            `${this.baseApiUrl}/TodoItems`,
            request
        );
    }

    addComment(params: { todoItemId: string, item: CommentCreateRequestDto }) {

        const request = params.item;
        return this._httpService.post<CommentDto>(
            `${this.baseApiUrl}/TodoItems/${params.todoItemId}/comments`,
            request
        );
    }

    getComments(todoItemId: string) {

        return this._httpService.get<CommentDto[]>(
            `${this.baseApiUrl}/TodoItems/${todoItemId}/comments`
        );

    }
}
