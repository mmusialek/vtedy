import { Injectable } from '@angular/core';
import { ApiServiceBase } from './api-service-base';
import { HttpClient } from '@angular/common/http';
import { TodoItemDto } from '../dto/todo-item.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsApiService extends ApiServiceBase {
  constructor(private _httpService: HttpClient) {
    super();
  }

  getProjects(): Observable<TodoItemDto[]> {
    return this._httpService.get<TodoItemDto[]>(`${this.baseApiUrl}/TodoItems`);
  }

  getProject(id: number): Observable<TodoItemDto> {
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
    return this._httpService.put<TodoItemDto>(
      `${this.baseApiUrl}/TodoItems`,
      request
    );
  }
}
