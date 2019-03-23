CREATE TABLE [dbo].[TodoItemComments]
(
    [TodoItemCommentId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [Comment] NVARCHAR(1000) NOT NULL, 
    [UserAccountId] INT NOT NULL,
    [TodoItemId] UNIQUEIDENTIFIER NOT NULL,
    [CreatedDateUtc] DateTime2 NOT NULL DEFAULT GETUTCDATE(),
    [ModifiedDateUtc] DateTime2 NOT NULL DEFAULT GETUTCDATE(),
    CONSTRAINT FK_TodoItemComments_UserAccount_UserAccountId FOREIGN KEY (UserAccountId) REFERENCES UserAccounts(UserAccountId)
)
