CREATE TABLE [dbo].[ProjectComments]
(
    [ProjectCommentId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(), 
    [Content] NVARCHAR(1000) NOT NULL, 
    [UserAccountId] INT NOT NULL,
    [ProjectId] INT NOT NULL,
    [CreatedDateUtc] DateTime2 NOT NULL DEFAULT GETUTCDATE(),
    [ModifiedDateUtc] DateTime2 NULL,
    CONSTRAINT FK_ProjectComments_UserAccount_UserAccountId FOREIGN KEY (UserAccountId) REFERENCES UserAccounts(UserAccountId)
)