CREATE TABLE [dbo].[TodoItemComments]
(
    [TodoItemCommentId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(), 
    [Content] NVARCHAR(1000) NOT NULL, 
    [UserAccountId] INT NOT NULL,
    [TodoItemId] UNIQUEIDENTIFIER NOT NULL,
    [CreatedDateUtc] DateTime2 NOT NULL DEFAULT GETUTCDATE(),
    [ModifiedDateUtc] DateTime2 NULL,
    CONSTRAINT FK_TodoItemComments_UserAccount_UserAccountId FOREIGN KEY (UserAccountId) REFERENCES UserAccounts(UserAccountId)
)
