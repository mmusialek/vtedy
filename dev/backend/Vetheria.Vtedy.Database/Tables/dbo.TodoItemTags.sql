CREATE TABLE [dbo].[TodoItemTags]
(
    [TodoItemTagId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [TodoItemId] UNIQUEIDENTIFIER NOT NULL, 
    [TagId] INT NOT NULL
);

GO;

ALTER TABLE [dbo].[TodoItemTags]
    ADD CONSTRAINT [TodoItemTags_TodoItemIdConstraint]
    FOREIGN KEY (TodoItemId)
    REFERENCES TodoItems(TodoItemId);

GO;

ALTER TABLE [dbo].[TodoItemTags]
    ADD CONSTRAINT [TodoItemTags_TagIdConstraint]
    FOREIGN KEY (TagId)
    REFERENCES Tags(TagId);

GO;


