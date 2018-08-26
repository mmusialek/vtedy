CREATE TABLE [dbo].[TodoItemTags]
(
    [Id] INT NOT NULL PRIMARY KEY, 
    [TodoItemId] INT NOT NULL, 
    [TagId] INT NOT NULL
);

GO;

ALTER TABLE [dbo].[TodoItemTags]
    ADD CONSTRAINT [TodoItemTags_TodoItemIdConstraint]
    FOREIGN KEY (TodoItemId)
    REFERENCES TodoItems(Id);

GO;

ALTER TABLE [dbo].[TodoItemTags]
    ADD CONSTRAINT [TodoItemTags_TagIdConstraint]
    FOREIGN KEY (TagId)
    REFERENCES Tags(Id);

GO;


