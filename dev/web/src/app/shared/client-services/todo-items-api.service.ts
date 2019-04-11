import { Injectable } from '@angular/core';
import { ApiServiceBase } from './api-service-base';
import { HttpClient, HttpParams } from '@angular/common/http';
import { TodoItemDto } from '../dto/todo-item.dto';
import { Observable } from 'rxjs';
import { ItemListFilter } from '../models/item-list-filter';

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

    getById(id: number): Observable<TodoItemDto> {
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
}
