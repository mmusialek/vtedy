CREATE PROCEDURE [dbo].[TodoItems_delete]
    @userAccountId INT,
    @todoitemId uniqueidentifier
AS

DELETE ti FROM [dbo].[TodoItems] ti INNER JOIN [dbo].[Projects] ua 
          ON ti.ProjectId=ua.ProjectId
          WHERE ti.TodoItemId=@todoitemId AND ua.UserAccountId=@userAccountId


SELECT @@ROWCOUNT