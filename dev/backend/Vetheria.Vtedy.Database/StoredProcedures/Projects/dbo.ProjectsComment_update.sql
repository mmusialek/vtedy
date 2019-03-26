CREATE PROCEDURE [dbo].[ProjectsComment_update]
    @projectCommentId UNIQUEIDENTIFIER,
    @content NVARCHAR(1000)
AS
    
    UPDATE dbo.ProjectComments
    SET Content=@content, ModifiedDateUtc=GETUTCDATE()
    WHERE dbo.ProjectComments.ProjectCommentId=@projectCommentId
    
    SELECT TOP 1 pc.ProjectCommentId AS Id, pc.Content, pc.CreatedDateUtc, pc.ModifiedDateUtc, pc.ProjectId, pc.UserAccountId
    FROM dbo.ProjectComments pc
    WHERE pc.ProjectCommentId=@projectCommentId

