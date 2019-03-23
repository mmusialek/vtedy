CREATE PROCEDURE [dbo].[Projects_get]
    @userId int
AS
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

    SELECT p.ProjectId AS Id, p.Name, p.Description, p.UserAccountId
    FROM dbo.Projects p
    WHERE p.UserAccountId=@userId
