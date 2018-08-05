import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TodoItemDto} from '../dto/todo-item.dto';
import {Observable} from 'rxjs/index';


@Injectable()
export class VtedyClientService {

  private readonly _baseApiUrl = 'http://localhost:5001/api';

  constructor(private _httpService: HttpClient) {

  }

  addItem(item: TodoItemDto) {
    return this._httpService.post(this._baseApiUrl + '/TodoItems', item);
  }

  getItems(): Observable<TodoItemDto[]> {
    return this._httpService.get<TodoItemDto[]>(this._baseApiUrl + '/TodoItems');
  }

  getItem(id: string): Observable<TodoItemDto> {
    return this._httpService.get<TodoItemDto>(this._baseApiUrl + `/TodoItems/${id}`);
  }

}
