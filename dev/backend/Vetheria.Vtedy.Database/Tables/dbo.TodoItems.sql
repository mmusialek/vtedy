CREATE TABLE [dbo].[TodoItems]
(
    [TodoItemId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(), 
    [Name] NVARCHAR(100) NOT NULL, 
    [IsCompleted] BIT NOT NULL DEFAULT 0,
    [ProjectId] INT NULL

);

GO;

ALTER TABLE [dbo].[TodoItems]
    ADD CONSTRAINT [TodoItems_ProjectIdConstraint]
    FOREIGN KEY (ProjectId)
    REFERENCES Projects([ProjectId]);

GO;