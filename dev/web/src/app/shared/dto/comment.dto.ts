import { UserAccountDto } from './user-account.dto';

export class CommentCreateRequestDto {
    content: string;
}


export class CommentDto {
    todoitemId: string;
    id: string;
    userAccountId: number;
    content: string;
    createdDate: Date;
    modifiedDate?: any;

    createdBy: UserAccountDto;
}
