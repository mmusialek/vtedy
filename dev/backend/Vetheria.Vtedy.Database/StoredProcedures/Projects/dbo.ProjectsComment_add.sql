CREATE PROCEDURE [dbo].[ProjectsComment_add]
    @userAccountId INT,
    @content NVARCHAR(1000),
    @projectId INT
AS

    DECLARE @LastGuid TABLE (id UNIQUEIDENTIFIER NOT NULL)

    INSERT INTO [dbo].[ProjectComments] (Content, CreatedDateUtc, ModifiedDateUtc, ProjectId, UserAccountId)
    OUTPUT INSERTED.[ProjectCommentId] INTO @LastGuid
    VALUES(@content, GETUTCDATE(), NULL, @projectId, @userAccountId);

    SELECT TOP 1 pc.ProjectCommentId AS Id, pc.Content, pc.CreatedDateUtc, pc.ModifiedDateUtc, pc.ProjectId, pc.UserAccountId
    FROM dbo.ProjectComments pc
    WHERE pc.ProjectCommentId IN (SELECT TOP(1) id FROM @LastGuid);
