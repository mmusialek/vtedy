CREATE TABLE [dbo].[TodoItems]
(
    [TodoItemId] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(), 
    [Name] NVARCHAR(100) NOT NULL,
    [ProjectId] INT NOT NULL,
    [IsCurrent] BIT NOT NULL,
    [StatusId] INT NOT NULL

);

GO;

ALTER TABLE [dbo].[TodoItems]
    ADD CONSTRAINT [TodoItems_ProjectIdConstraint]
    FOREIGN KEY (ProjectId)
    REFERENCES Projects([ProjectId]);

GO;