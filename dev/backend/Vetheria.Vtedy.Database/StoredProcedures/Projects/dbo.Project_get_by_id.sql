CREATE PROCEDURE [dbo].[Project_get_by_id]
    @userId INT = 0,
    @projectId INT
AS
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

    SELECT p.ProjectId, p.Name, p.Description, p.UserAccountId
    FROM dbo.Projects p
    WHERE p.UserAccountId=@userId and p.ProjectId=@projectId

