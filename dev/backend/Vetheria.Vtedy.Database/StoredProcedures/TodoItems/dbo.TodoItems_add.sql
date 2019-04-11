CREATE PROCEDURE [dbo].[TodoItems_add]
    @userAccountId int,
    @isCurrent bit,
    @statusId INT,
    @name nvarchar(100),
    @projectId INT NULL
AS

INSERT INTO dbo.TodoItems(Name, IsCurrent, StatusId, ProjectId)
OUTPUT INSERTED.[TodoItemId] as Id, INSERTED.[Name], INSERTED.[IsCurrent], INSERTED.[StatusId], INSERTED.[ProjectId]
VALUES(@name, @isCurrent, @statusId, @projectId)
