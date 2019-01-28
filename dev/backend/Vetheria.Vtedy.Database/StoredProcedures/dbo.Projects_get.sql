CREATE PROCEDURE [dbo].[Projects_get]
AS
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

    SELECT p.ProjectId, p.Name, p.Description, p.UserAccountId
    FROM dbo.Projects p
