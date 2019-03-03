CREATE PROCEDURE [dbo].[TodoItems_get]
    @userAccountId INT
AS
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

    SELECT ti.TodoItemId as Id, ti.Name, ti.IsCompleted, ti.ProjectId
    FROM dbo.TodoItems ti
        INNER JOIN dbo.Projects p ON ti.ProjectId=p.ProjectId
        INNER JOIN dbo.UserAccounts ua ON p.UserAccountId=ua.UserAccountId
    WHERE ua.UserAccountId=@userAccountId

