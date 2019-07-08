import { CommentCreateRequestDto, CommentDto } from './../../shared/dto/comment.dto';
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
    private _newDataStream: Subject<ItemDataViewModel> = new Subject<ItemDataViewModel>();
    private _isDialogPinned = false;

    constructor(private _todoApiService: TodoItemsApiService) { }
    get newDataStream() {
        return this._newDataStream;
    }

    get isDialogPinned() {
        return this._isDialogPinned;
    }

    togglePinDialog() {
        this._isDialogPinned = !this._isDialogPinned;
    }

    updateTodoItem(item: ItemDataViewModel) {

        const dto = new TodoItemDto();

        dto.id = item.id;
        dto.isCurrent = item.isCurrent;
        dto.name = item.name;
        dto.projectId = item.project.id;

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

    deleteTodoItem(todoItemId: string) {
        return this._todoApiService.delete(todoItemId);
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
            .pipe(map(item => item.map(comment => CommentViewModel.new({
                id: comment.id,
                comment: comment.content,
                author: comment.createdBy.userName,
                authorEmail: comment.createdBy.email,
                date: comment.createdDate
            }))));
    }


    updateComment(todoItemId: string, comment: CommentViewModel) {
        const dto = new CommentDto();
        dto.content = comment.comment;
        dto.id = comment.id;
        dto.todoitemId = todoItemId;
        return this._todoApiService.updateComment(dto);
    }

    deleteComment(todoItemId: string, todoItemCommentId: string) {
        return this._todoApiService.deleteComment(todoItemId, todoItemCommentId);
    }

}
