CREATE PROCEDURE [dbo].[TodoItems_Tag_get]
    @todoItemId uniqueidentifier,
    @name nvarchar(100)
AS

    SELECT tit.TagId, tit.TodoItemId, tit.TodoItemTagId, t.TagId, t.Name
    FROM dbo.TodoItemTags tit INNER JOIN dbo.Tags t 
        ON tit.TagId=t.TagId
    WHERE tit.TodoItemId=@todoItemId and t.Name LIKE @name +'%'
