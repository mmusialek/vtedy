CREATE PROCEDURE [dbo].[TodoItems_Tag_delete]
    @todoItemId uniqueidentifier,
    @todoItemTagId int
AS
    DELETE tit FROM dbo.TodoItemTags AS tit WHERE tit.TodoItemId=@todoItemId AND tit.TodoItemTagId=@todoItemTagId


SELECT @@ROWCOUNT
