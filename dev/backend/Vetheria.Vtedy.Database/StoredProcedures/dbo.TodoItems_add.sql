CREATE PROCEDURE [dbo].[TodoItems_add]
    @userAccountId int,
    @isCompleted bit,
    @name nvarchar(100),
    @projectId INT

AS
    
INSERT INTO dbo.TodoItems(Name, IsCompleted, ProjectId)
OUTPUT INSERTED.[TodoItemId] as Id, INSERTED.[Name], INSERTED.[IsCompleted], INSERTED.[ProjectId]
VALUES(@name, @isCompleted, @projectId)
