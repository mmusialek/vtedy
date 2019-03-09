CREATE PROCEDURE [dbo].[TodoItems_update]
    @id UNIQUEIDENTIFIER,
    @name NVARCHAR(100),
    @isCurrent BIT,
    @statusId INT,
    @projectId INT
AS    
    
    UPDATE dbo.TodoItems
    SET Name=@name, IsCurrent=@isCurrent, StatusId=@statusId, ProjectId=@projectId
    WHERE dbo.TodoItems.TodoItemId=@id

    SELECT ti.TodoItemId AS Id, ti.Name, ti.IsCurrent, ti.StatusId, ti.ProjectId
    FROM dbo.TodoItems ti
    WHERE ti.TodoItemId=@id

