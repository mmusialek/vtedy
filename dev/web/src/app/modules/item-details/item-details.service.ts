import { CommentCreateRequestDto } from './../../shared/dto/comment.dto';
import { ProjectDto } from './../../shared/dto/project.dto';
import { TodoItemDto } from './../../shared/dto/todo-item.dto';
import { TagDto } from './../../shared/dto/tag.dto';
import { TodoItemsApiService } from './../../shared/client-services/todo-items-api.service';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ItemDataViewModel, CommentViewModel } from './item-details.view-model';
import { takeWhile, map } from 'rxjs/operators';


@Injectable()
export class ItemDetailsService {
    private _isDialogVisible: Subject<boolean> = new Subject<boolean>();
    private _newDataStream: Subject<ItemDataViewModel> = new Subject<ItemDataViewModel>();
    private _isDialogPinned = false;

    constructor(private _todoApiService: TodoItemsApiService) { }

    get isDialogVisible() {
        return this._isDialogVisible;
    }

    get newDataStream() {
        return this._newDataStream;
    }

    get isDialogPinned() {
        return this._isDialogPinned;
    }

    togglePinDialog() {
        this._isDialogPinned = !this._isDialogPinned;
    }

    showItemDetails() {
        if (!this._isDialogPinned) {
            this._isDialogVisible.next(true);
        }
    }

    hideItemDetails() {
        if (!this._isDialogPinned) {
            this._isDialogVisible.next(false);
        }
    }

    updateTodoItem(item: ItemDataViewModel) {

        const dto = new TodoItemDto();

        dto.id = item.id;
        dto.isCurrent = item.isCurrent;
        dto.name = item.name;

        dto.project = new ProjectDto();
        dto.project.projectId = item.project.id;
        dto.project.name = item.project.name;
        dto.project.description = item.project.description;
        dto.project.releaseAt = item.project.releaseAt;

        dto.tags = item.tags.map(tagModel => {
            const tagDto = new TagDto();
            tagDto.id = tagModel.id;
            tagDto.name = tagModel.name;

            return tagDto;
        });

        return this._todoApiService.update(dto);
    }

    createComment(params: { todoItemId: string, comment: string }) {

        const dto = new CommentCreateRequestDto();
        dto.content = params.comment;

        // CommentCreateRequestDto
        return this._todoApiService.addComment({
            item: dto,
            todoItemId: params.todoItemId
        })
            .pipe(map(item => CommentViewModel.new({ id: item.id, comment: item.content, date: item.createdDate })));
    }

    getComments(todoItemId: string): Observable<CommentViewModel[]> {
        return this._todoApiService.getComments(todoItemId)
            .pipe(map(item => item.map(comment => CommentViewModel.new({ id: comment.id, comment: comment.content, date: comment.createdDate }))));
    }

    // getItemDetails(id: string) {
    //     let result: ItemDataViewModel;
    //     return of(result);
    // }
}
