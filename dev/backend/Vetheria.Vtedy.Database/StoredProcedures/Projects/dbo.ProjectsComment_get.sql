CREATE PROCEDURE [dbo].[ProjectsComment_get]
    @projectId INT
AS
    SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED
    SELECT pc.ProjectCommentId AS Id, pc.Content, pc.CreatedDateUtc, pc.ModifiedDateUtc, pc.ProjectId, pc.UserAccountId 
    FROM [dbo].[ProjectComments] pc
    WHERE pc.ProjectId=@projectId

