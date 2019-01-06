import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {TodoItemDto} from '../dto/todo-item.dto';
import {Observable} from 'rxjs/index';
import {ItemListFilter} from '../models/item-list-filter';


@Injectable()
export class VtedyClientService {

  private readonly _baseApiUrl = 'http://localhost:5001/api';

  constructor(private _httpService: HttpClient) {

  }

  addItem(item: TodoItemDto) {
    return this._httpService.post(this._baseApiUrl + '/TodoItems', item);
  }

  getItems(filter?: ItemListFilter): Observable<TodoItemDto[]> {

    let params = new HttpParams();

    if (filter) {
      if (filter.isCurrentItem) {
        params = params.set('isCurrentItem', filter.isCurrentItem.toString());
      }
      if (filter.isNewItem) {
        params = params.set('isNewItem', filter.isNewItem.toString());
      }
    }

    return this._httpService.get<TodoItemDto[]>(this._baseApiUrl + '/TodoItems',
      {
        params: params
      });
  }

  getItem(id: string): Observable<TodoItemDto> {
    return this._httpService.get<TodoItemDto>(this._baseApiUrl + `/TodoItems/${id}`);
  }

}
